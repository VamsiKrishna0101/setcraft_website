import { useEffect, useState } from 'react';
import { Mochi } from '../mochi/Mochi';
import { MochiToy } from '../mochi/MochiToy';
import { Label, Lines } from '../ui/Lines';
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
  return <section id="languages" className="langs panel t-ink" data-mood="hide" aria-labelledby="langs-title">
    <div className="wrap" ref={ref}>
      <Label index="03">Languages</Label>
      <div className="head">
        <h2 id="langs-title" className="display" data-lines><Lines lines={['Ten languages.', <>One <em>Mochi.</em></>]} /></h2>
        <p className="lede" data-reveal>Pick your language when you start and the whole app follows, Mochi included, right down to the button that starts your first week. Tap one below to hear it.</p>
      </div>
      <div className="langs__stage">
        <div className="langs__line">
          <span className="langs__name">{String(active + 1).padStart(2, '0')} · {language.name}</span>
          <p key={language.code} className="display"><em>“{language.line}”</em></p>
          <span key={`b${language.code}`} className="langs__btn">{language.cta}</span>
        </div>
        <MochiToy><Mochi size={170} mood="listening" talking followPointer /></MochiToy>
      </div>
      <div className="langs__list" role="group" aria-label="Choose a language">
        {languages.map((l, i) => <button key={l.code} className={i === active ? 'is-on' : ''} aria-pressed={i === active} onClick={() => { setTouched(true); setActive(i); }}><i>{l.code}</i>{l.name}</button>)}
      </div>
    </div>
  </section>;
}
