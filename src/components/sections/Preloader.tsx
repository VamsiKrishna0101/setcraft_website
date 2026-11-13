import { useEffect, useState } from 'react';
import { Mochi } from '../mochi/Mochi';

/** Once per visit: Mochi drops in, the counter runs, the sheet lifts. Skipped with reduced motion. */
export function Preloader() {
  const [state, setState] = useState<'on' | 'leaving' | 'off'>(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('setcraft-intro')) return 'off';
    } catch { /* storage may be unavailable */ }
    return 'on';
  });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (state !== 'on') return;
    try { sessionStorage.setItem('setcraft-intro', '1'); } catch { /* ignore */ }
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / 1100);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    const leave = window.setTimeout(() => setState('leaving'), 1300);
    const done = window.setTimeout(() => setState('off'), 2250);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(leave); window.clearTimeout(done); };
  }, [state]);
  if (state === 'off') return null;
  return <div className={`preloader${state === 'leaving' ? ' preloader--leaving' : ''}`} aria-hidden="true">
    <div className="preloader__drop"><Mochi size={150} mood={count > 60 ? 'cheer' : 'listening'} /></div>
    <span className="preloader__count display">{count}</span>
    <span className="preloader__note">Warming up</span>
  </div>;
}
