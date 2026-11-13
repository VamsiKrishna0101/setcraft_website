import { useEffect, useRef, useState } from 'react';
import { Mochi } from '../mochi/Mochi';
import { MochiToy } from '../mochi/MochiToy';
import { Phone } from '../ui/Phone';
import { languages } from '../../data/content';

export function Hero() {
  const [index, setIndex] = useState(0);
  const [poked, setPoked] = useState(false);
  const timer = useRef(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex(i => (i + 1) % languages.length), 3200);
    return () => { window.clearInterval(id); window.clearTimeout(timer.current); };
  }, []);
  const poke = () => {
    setPoked(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPoked(false), 1700);
  };
  const language = languages[index];
  return <section className="hero" data-mood="hide" aria-labelledby="hero-title">
    <div className="wrap hero__inner">
      <p className="hero__top" data-hero>
        <span>Training, nutrition, progress</span>
        <span>Coached by Mochi</span>
      </p>
      <h1 id="hero-title" className="display hero__title">
        <span className="ln"><span className="ln__i">Every set.</span></span>
        <span className="hero__l2">
          <span className="ln"><span className="ln__i">A step</span></span>{' '}
          <span className="ln"><span className="ln__i"><em>forward.</em></span></span>
        </span>
      </h1>
      <div className="hero__base">
        <div className="hero__copy">
          <p className="lede" data-hero>Setcraft plans your training, shows which muscles you actually worked, and keeps an eye on what you eat. Mochi, the small coral one, keeps you company while you do it.</p>
          <div className="hero__actions" data-hero>
            <a className="btn btn--solid" href="#download" data-magnetic><span className="btn__dot" />Get Setcraft</a>
            <a className="textlink" href="#mochi">Meet Mochi</a>
          </div>
        </div>
        <div className="hero__device"><Phone screen="today" className="hero__phone" priority /></div>
        <div className="hero__perch">
          <p className="say" aria-live="polite">
            <span className="say__lang">{poked ? 'Mochi' : language.name}</span>
            <span key={poked ? 'poke' : language.code} className="say__text">{poked ? 'Hey! That tickles' : language.line}</span>
          </p>
          <div className="hero__mochi">
            <MochiToy onPoke={poke}><Mochi size={190} mood={poked ? 'cheer' : 'listening'} talking={!poked} followPointer label="Mochi, the Setcraft AI coach" /></MochiToy>
          </div>
          <span className="hero__hint display" aria-hidden="true"><em>pick me up</em></span>
        </div>
      </div>
    </div>
  </section>;
}
