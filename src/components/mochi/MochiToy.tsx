import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type Props = { children: ReactNode; className?: string; onPoke?: () => void };

/*
 * Makes Mochi feel like a rice cake: press to squash it, drag to stretch it,
 * let go and it wobbles home. A hand-rolled spring, running only while
 * something is moving.
 */
export function MochiToy({ children, className = '', onPoke }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const poke = useRef(onPoke);
  poke.current = onPoke;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0;
    let squash = 0, vSquash = 0;
    let held = false, startX = 0, startY = 0, travelled = 0;
    let frame = 0, last = 0;

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
      last = now;
      const stiffness = held ? 380 : 150;
      const damping = held ? 26 : 8;
      vx += (-stiffness * (x - tx) - damping * vx) * dt;
      vy += (-stiffness * (y - ty) - damping * vy) * dt;
      x += vx * dt;
      y += vy * dt;
      vSquash += (-300 * squash - 9 * vSquash) * dt;
      squash += vSquash * dt;

      const speed = Math.hypot(vx, vy);
      const stretch = Math.min(0.24, speed / 3600);
      const angle = Math.atan2(vy, vx);
      const press = Math.max(-0.3, Math.min(0.3, squash));
      el.style.transform =
        `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) rotate(${(vx * 0.012).toFixed(2)}deg) ` +
        `rotate(${angle.toFixed(3)}rad) scale(${(1 + stretch).toFixed(3)},${(1 - stretch * 0.7).toFixed(3)}) rotate(${(-angle).toFixed(3)}rad) ` +
        `scale(${(1 + press).toFixed(3)},${(1 - press).toFixed(3)})`;

      const resting = !held && speed < 2 && Math.abs(x) < 0.2 && Math.abs(y) < 0.2 && Math.abs(squash) < 0.003 && Math.abs(vSquash) < 0.02;
      if (resting) { el.style.transform = ''; x = y = vx = vy = squash = vSquash = 0; frame = 0; return; }
      frame = requestAnimationFrame(step);
    };
    const wake = () => { if (!frame) { last = performance.now(); frame = requestAnimationFrame(step); } };

    const down = (event: PointerEvent) => {
      held = true; travelled = 0;
      startX = event.clientX - x; startY = event.clientY - y;
      vSquash += 5;
      el.classList.add('is-held');
      try { el.setPointerCapture(event.pointerId); } catch { /* not capturable */ }
      wake();
    };
    const move = (event: PointerEvent) => {
      if (!held) return;
      const dx = event.clientX - startX, dy = event.clientY - startY;
      const distance = Math.hypot(dx, dy) || 1;
      // The further it is pulled, the harder it resists.
      const reach = 260 * (1 - Math.exp(-distance / 260));
      tx = (dx / distance) * reach; ty = (dy / distance) * reach;
      travelled = Math.max(travelled, distance);
      wake();
    };
    const up = () => {
      if (!held) return;
      held = false; tx = 0; ty = 0;
      vSquash -= 4;
      el.classList.remove('is-held');
      if (travelled < 8) poke.current?.();
      wake();
    };
    const hover = () => { if (!held && !frame) { vSquash += 1.6; wake(); } };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerenter', hover);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('pointerenter', hover);
      el.style.transform = '';
    };
  }, []);

  return <span ref={ref} className={`toy ${className}`}>{children}</span>;
}
