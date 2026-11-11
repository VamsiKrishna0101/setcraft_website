import { useEffect, useState } from 'react';
import { Mochi } from '../mochi/Mochi';
import { Phone } from '../ui/Phone';
import { languages } from '../../data/content';

export function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % languages.length), 3000);
    return () => window.clearInterval(timer);
  }, []);
  const language = languages[index];
  return <section className="hero" aria-labelledby="hero-title">
    <div className="wrap hero__grid">
      <div className="hero__copy">
        <h1 id="hero-title" className="display" data-hero>Every set.<br />A step <span className="hl">forward.</span></h1>
        <p className="hero__lead" data-hero>Setcraft plans your training, shows which muscles you actually worked, and keeps an eye on what you eat. Mochi, the small coral one, keeps you company while you do it.</p>
        <div className="hero__actions" data-hero>
          <a className="btn btn--coral" href="#download">Get Setcraft</a>
          <a className="textlink" href="#mochi">Meet Mochi</a>
        </div>
        <p className="hero__meta" data-hero>For iPhone, Apple Watch and Android. Launching soon.</p>
      </div>
      <div className="hero__stage">
        <div className="hero__perch">
          <p className="say" aria-live="polite"><span className="say__lang">{language.name}</span><span key={language.code} className="say__text">{language.line}</span></p>
          <Mochi size={150} mood="listening" talking followPointer label="Mochi, the Setcraft AI coach" />
        </div>
        <Phone screen="today" className="hero__phone" priority />
      </div>
    </div>
  </section>;
}
