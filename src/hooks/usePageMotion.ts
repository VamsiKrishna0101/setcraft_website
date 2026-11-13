import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Progressive enhancement: the page is complete without any of this, and
 * reduced motion switches it off entirely. Scrolling stays native, and
 * everything here animates transform or opacity only.
 */
export function usePageMotion(root: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: (() => void)[] = [];

    const context = gsap.context(() => {
      const intro = document.querySelector('.preloader') ? 1.45 : 0.1;

      // Opening: the headline rises line by line, the phone follows, Mochi drops in last.
      const opening = gsap.timeline({ delay: intro, defaults: { ease: 'expo.out' } });
      opening
        .from('.hero .ln__i', { yPercent: 118, duration: 1.3, stagger: 0.11, clearProps: 'all' })
        .from('[data-hero]', { y: 26, opacity: 0, duration: 1.1, stagger: 0.08, clearProps: 'all' }, 0.35)
        .from('.hero__device', { yPercent: 30, opacity: 0, duration: 1.6, clearProps: 'all' }, 0.35)
        .from('.hero__mochi', { y: -620, opacity: 0, duration: 0.75, ease: 'power2.in', clearProps: 'all' }, 0.9)
        .fromTo('.hero__mochi', { scaleX: 1.3, scaleY: 0.66, transformOrigin: '50% 92%' }, { scaleX: 1, scaleY: 1, duration: 1.1, ease: 'elastic.out(1.1, 0.35)', immediateRender: false, clearProps: 'all' }, 1.65)
        .from('.hero__perch .say', { scale: 0.4, opacity: 0, duration: 0.9, ease: 'back.out(2.2)', clearProps: 'all' }, 1.95)
        .from('.hero__hint', { opacity: 0, x: -16, duration: 0.9, clearProps: 'all' }, 2.3);

      // Section headlines and blocks play once as they arrive.
      gsap.utils.toArray<HTMLElement>('[data-lines]').forEach(heading => {
        gsap.from(heading.querySelectorAll('.ln__i'), { yPercent: 118, duration: 1.2, stagger: 0.1, ease: 'expo.out', clearProps: 'all', scrollTrigger: { trigger: heading, start: 'top 88%', once: true } });
      });
      gsap.set('[data-reveal]', { y: 24, opacity: 0 });
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 94%',
        once: true,
        onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: 1, stagger: 0.06, ease: 'expo.out', clearProps: 'all' }),
      });
      gsap.from('.plate', { scale: 0.6, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)', clearProps: 'all', scrollTrigger: { trigger: '.plate', start: 'top 85%', once: true } });
      gsap.from('.member__inc li', { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.04, ease: 'back.out(2)', clearProps: 'all', scrollTrigger: { trigger: '.member__inc', start: 'top 92%', once: true } });
      gsap.from('.download .toy', { y: -220, opacity: 0, duration: 1.2, ease: 'bounce.out', clearProps: 'all', scrollTrigger: { trigger: '.download', start: 'top 60%', once: true } });
      gsap.from('.footer__word span', { yPercent: 105, duration: 1.2, stagger: 0.05, ease: 'expo.out', clearProps: 'all', scrollTrigger: { trigger: '.footer__word', start: 'top 92%', once: true } });

      // Only three things are tied to the scroll position itself.
      gsap.fromTo('.statement .w', { opacity: 0.14 }, { opacity: 1, stagger: 0.06, ease: 'none', scrollTrigger: { trigger: '.statement__text', start: 'top 78%', end: 'bottom 55%', scrub: true } });
      gsap.from('.statement__peek', { yPercent: 110, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'center bottom', end: 'bottom bottom', scrub: true } });
      const vertical = window.matchMedia('(max-width: 900px)').matches;
      gsap.from('.member__rule', { [vertical ? 'scaleY' : 'scaleX']: 0, ease: 'none', scrollTrigger: { trigger: '.member__track', start: 'top 85%', end: 'top 35%', scrub: true } });

      // Buttons lean toward the cursor.
      if (finePointer) {
        gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach(button => {
          const x = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'power3.out' });
          const y = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'power3.out' });
          let box: DOMRect | undefined;
          const enter = () => { box = button.getBoundingClientRect(); };
          const move = (event: PointerEvent) => {
            if (!box) return;
            x((event.clientX - box.left - box.width / 2) * 0.28);
            y((event.clientY - box.top - box.height / 2) * 0.4);
          };
          const leave = () => { box = undefined; x(0); y(0); };
          button.addEventListener('pointerenter', enter);
          button.addEventListener('pointermove', move);
          button.addEventListener('pointerleave', leave);
          cleanups.push(() => { button.removeEventListener('pointerenter', enter); button.removeEventListener('pointermove', move); button.removeEventListener('pointerleave', leave); });
        });
      }
    }, root);

    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => { /* fonts are optional */ });

    return () => { cleanups.forEach(fn => fn()); context.revert(); };
  }, [root]);
}
