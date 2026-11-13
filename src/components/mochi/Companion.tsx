import { useEffect, useRef, useState } from 'react';
import { Mochi, type MochiMood } from './Mochi';

const CIRCUMFERENCE = 2 * Math.PI * 36;

/*
 * A pocket-sized Mochi that follows the page. Its mood comes from the section
 * crossing the middle of the screen (data-mood), the ring shows how far you
 * have read, and tapping it takes you back to the top.
 */
export function Companion() {
  const [mood, setMood] = useState<MochiMood>('listening');
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Which section is under the middle of the viewport: no per-frame measuring.
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const next = (entry.target as HTMLElement).dataset.mood;
        setVisible(next !== 'hide');
        if (next && next !== 'hide') setMood(next as MochiMood);
      });
    }, { rootMargin: '-55% 0px -45% 0px' });
    document.querySelectorAll('[data-mood]').forEach(section => observer.observe(section));

    let total = 1;
    const measure = () => { total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
    measure();
    const sizes = new ResizeObserver(measure);
    sizes.observe(document.body);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (ring.current) ring.current.style.strokeDashoffset = (CIRCUMFERENCE * (1 - Math.min(1, window.scrollY / total))).toFixed(1);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); sizes.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, []);

  return <a href="#top" className={`companion${visible ? ' is-on' : ''}`} aria-label="Back to top" tabIndex={visible ? 0 : -1}>
    <svg className="companion__ring" viewBox="0 0 76 76" aria-hidden="true">
      <circle cx="38" cy="38" r="36" />
      <circle ref={ring} cx="38" cy="38" r="36" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE} />
    </svg>
    <Mochi size={52} mood={mood} />
  </a>;
}
