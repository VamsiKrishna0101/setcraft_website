import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

// Uses a fresh headless browser against this local app only; never attaches to user tabs.
const { chromium } = await import(process.env.SETCRAFT_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.SETCRAFT_QA_URL || 'http://127.0.0.1:5173/';
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const output = new URL('../artifacts/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.SETCRAFT_QA_BROWSER });
const report = { checkedAt: new Date().toISOString(), viewports: [], errors: [] };
const errors = report.errors;

async function open(viewport, options = {}) {
  const context = await browser.newContext({ viewport, ...options });
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return ['127.0.0.1', 'localhost'].includes(url.hostname) ? route.continue() : route.abort();
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { context, page };
}

async function canvasStats(page) {
  return page.locator('.experience__canvas').evaluate(element => ({
    ...element.dataset,
    width: element.querySelector('canvas')?.width,
    height: element.querySelector('canvas')?.height,
  }));
}

async function layout(page, name) {
  const result = await page.evaluate(() => ({
    width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.src),
    phoneWidth: document.querySelector('.showcase-device .phone')?.getBoundingClientRect().width,
  }));
  assert.ok(result.documentWidth <= result.width, `${name}: horizontal overflow ${JSON.stringify(result)}`);
  assert.deepEqual(result.brokenImages, [], `${name}: missing image`);
  return result;
}

try {
  const { context, page } = await open({ width: 1440, height: 900 });
  await page.waitForSelector('.experience__canvas.is-ready canvas', { timeout: 20000 });
  await page.waitForFunction(() => document.querySelector('.experience__canvas')?.dataset.animating === 'false');
  const settled = await canvasStats(page);
  assert.ok(Number(settled.frames) > 0, '3D canvas must render frames');
  assert.ok(Number(settled.drawCalls) > 0, '3D scene must draw visible geometry');
  await page.screenshot({ path: new URL('desktop-preview.png', output).pathname.replace(/^\/(\w:)/, '$1') });
  await page.waitForTimeout(1100);
  const idle = await canvasStats(page);
  assert.ok(Number(idle.frames) - Number(settled.frames) <= 2, 'Scene must stop rendering while idle');
  await page.getByRole('button', { name: 'Say hello', exact: true }).click();
  await page.waitForFunction(() => Number(document.querySelector('.experience__canvas')?.dataset.frames) > 20);
  assert.ok((await page.locator('.experience__speech p').textContent()).includes('Glad'));
  await page.getByRole('button', { name: 'Go to Train with intention', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.experience__canvas')?.dataset.chapter === 'training');
  await page.waitForTimeout(1700);
  await page.screenshot({ path: new URL('desktop-training.png', output).pathname.replace(/^\/(\w:)/, '$1') });
  await page.locator('.showcase-stage').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  assert.equal((await canvasStats(page)).rendering, 'paused', 'Offscreen canvas must pause');
  await page.getByRole('tab', { name: 'Body', exact: true }).click();
  assert.match(await page.locator('.showcase-device img').getAttribute('src'), /body/);
  await page.screenshot({ path: new URL('desktop-app-gallery.png', output).pathname.replace(/^\/(\w:)/, '$1') });
  report.viewports.push({ name: 'desktop', ...(await layout(page, 'desktop')), scene: settled, idleFrames: Number(idle.frames) - Number(settled.frames) });
  await context.close();

  for (const width of [320, 390, 768, 1024]) {
    const mobile = width <= 760;
    const { context, page } = await open({ width, height: 844 }, { isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 3 : 1 });
    await page.waitForSelector('.experience__canvas.is-ready canvas', { timeout: 20000 });
    await page.waitForTimeout(1500);
    const scene = await canvasStats(page);
    if (mobile) {
      assert.equal(scene.quality, 'mobile');
      assert.equal(scene.frameCap, '30');
      assert.equal(scene.width, width, 'Mobile render resolution must stay at DPR 1');
    }
    report.viewports.push({ name: `${width}px`, ...(await layout(page, `${width}px`)), scene });
    if (width === 390) await page.screenshot({ path: new URL('mobile-preview.png', output).pathname.replace(/^\/(\w:)/, '$1') });
    await page.locator('.showcase-stage').scrollIntoViewIfNeeded();
    await page.getByRole('tab', { name: 'Body', exact: true }).click();
    await layout(page, `${width}px gallery`);
    if (width === 390) await page.screenshot({ path: new URL('mobile-app-gallery.png', output).pathname.replace(/^\/(\w:)/, '$1') });
    for (const section of ['training', 'body', 'nutrition', 'progress']) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await layout(page, `${width}px ${section}`);
    }
    await context.close();
  }

  const reduced = await open({ width: 390, height: 844 }, { reducedMotion: 'reduce' });
  await reduced.page.waitForTimeout(500);
  assert.equal(await reduced.page.locator('canvas').count(), 0, 'Reduced motion must default to static');
  assert.equal(await reduced.page.getByRole('heading', { level: 1 }).textContent(), 'Your newspotter.');
  assert.equal(await reduced.page.getByRole('button', { name: 'Show interactive 3D' }).count(), 1);
  report.reducedMotion = 'Static poster, HTML content and opt-in 3D verified';
  await reduced.context.close();
  assert.deepEqual(errors, [], 'No browser errors or missing assets');
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = String(error.stack || error);
  throw error;
} finally {
  await writeFile(new URL('experience-qa.json', output), JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}
