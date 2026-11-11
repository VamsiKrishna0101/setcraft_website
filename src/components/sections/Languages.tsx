import { useEffect, useState } from 'react';
import { Mochi } from '../mochi/Mochi';
import { languages } from '../../data/content';
import { useInView } from '../../hooks/useInView';

export function Languages() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  useEffect(() => {
    if (touched || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % languages.length), 2600);
    return () => window.clearInterval(timer);
  }, [touched, inView]);
  const language = languages[active];
  return <section id="languages" className="langs" aria-labelledby="langs-title">
    <div className="wrap" ref={ref}>
      <div className="langs__head">
        <h2 id="langs-title" className="display" data-reveal>Ten languages.<br />One Mochi.</h2>
        <p data-reveal>Pick your language when you start and the whole app follows, Mochi included, right down to the button that starts your first week. Tap one below to hear it.</p>
      </div>
      <div className="langs__stage">
        <div className="langs__line">
          <span className="langs__name">{language.name}</span>
          <p key={language.code} className="display">“{language.line}”</p>
          <span key={`b${language.code}`} className="langs__btn">{language.cta}</span>
        </div>
        <Mochi size={150} mood="listening" talking />
      </div>
      <div className="langs__list" role="group" aria-label="Choose a language">
        {languages.map((l, i) => <button key={l.code} className={i === active ? 'is-on' : ''} aria-pressed={i === active} onClick={() => { setTouched(true); setActive(i); }}>{l.name}</button>)}
      </div>
    </div>
  </section>;
}
