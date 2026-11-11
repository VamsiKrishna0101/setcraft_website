import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Progressive enhancement: everything is visible without JS motion. */
export function usePageMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const intro = document.querySelector('.preloader') ? 1.2 : 0.05;
        gsap.from('[data-hero]', { y: 50, opacity: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out', delay: intro, clearProps: 'all' });
        gsap.from('.hero__phone', { y: 220, duration: 1.4, ease: 'expo.out', delay: intro + 0.15, clearProps: 'all' });
        gsap.from('.hero__perch', { y: 160, opacity: 0, duration: 1, ease: 'back.out(1.6)', delay: intro + 0.55, clearProps: 'all' });

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.from(element, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 90%', once: true }, clearProps: 'all' });
        });

        gsap.fromTo('.statement .w', { opacity: 0.12 }, { opacity: 1, stagger: 0.06, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 70%', end: 'bottom 70%', scrub: true } });
        gsap.from('.statement__peek', { yPercent: 100, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'center bottom', end: 'bottom bottom', scrub: true } });
        gsap.from('.footer__word', { yPercent: 35, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
      }, root);
      cleanup = () => context.revert();
    }).catch(() => { /* The page stays complete without animation. */ });
    return () => { disposed = true; cleanup?.(); };
  }, [root]);
}
