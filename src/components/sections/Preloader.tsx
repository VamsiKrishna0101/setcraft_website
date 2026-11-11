import { useEffect, useState } from 'react';
import { Mochi } from '../mochi/Mochi';

/** Once per visit, about a second. Skipped with reduced motion. */
export function Preloader() {
  const [state, setState] = useState<'on' | 'leaving' | 'off'>(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('setcraft-intro')) return 'off';
    } catch { /* storage may be unavailable */ }
    return 'on';
  });
  useEffect(() => {
    if (state !== 'on') return;
    try { sessionStorage.setItem('setcraft-intro', '1'); } catch { /* ignore */ }
    const leave = window.setTimeout(() => setState('leaving'), 1100);
    const done = window.setTimeout(() => setState('off'), 1800);
    return () => { window.clearTimeout(leave); window.clearTimeout(done); };
  }, [state]);
  if (state === 'off') return null;
  return <div className={`preloader${state === 'leaving' ? ' preloader--leaving' : ''}`} aria-hidden="true">
    <Mochi size={130} mood="cheer" />
  </div>;
}
