import { useEffect, useState } from 'react';
import { Mochi, type MochiMood } from '../mochi/Mochi';
import { MochiToy } from '../mochi/MochiToy';
import { Phone } from '../ui/Phone';
import { Label, Lines } from '../ui/Lines';
import { chatScript, mochiMoments } from '../../data/content';
import { useInView } from '../../hooks/useInView';

const moods: { mood: MochiMood; label: string }[] = [
  { mood: 'listening', label: 'Listening' },
  { mood: 'thinking', label: 'Thinking' },
  { mood: 'cheer', label: 'Proud of you' },
  { mood: 'sleepy', label: 'Rest day' },
];

export function MeetMochi() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [step, setStep] = useState(reduced ? chatScript.length : 0);
  const [typing, setTyping] = useState(false);
  const [picked, setPicked] = useState<MochiMood | null>(null);

  useEffect(() => {
    if (!inView || reduced || step >= chatScript.length) return;
    const next = chatScript[step];
    setTyping(next.from === 'mochi');
    const timer = window.setTimeout(() => { setTyping(false); setStep(s => s + 1); }, next.from === 'mochi' ? 1300 : 900);
    return () => window.clearTimeout(timer);
  }, [inView, step, reduced]);

  const shown = chatScript.slice(0, step);
  const last = shown[shown.length - 1];
  const done = step >= chatScript.length;
  const mood: MochiMood = picked ?? (typing && chatScript[step]?.mood === 'thinking' ? 'thinking' : last?.mood ?? 'listening');
  const cycle = () => setPicked(moods[(moods.findIndex(m => m.mood === mood) + 1) % moods.length].mood);

  return <section id="mochi" className="mochi-sec" data-mood="hide" aria-labelledby="mochi-title">
    <div className="wrap">
      <Label index="01">The coach</Label>
      <div className="head">
        <h2 id="mochi-title" className="display" data-lines><Lines lines={['This is', <em>Mochi.</em>]} /></h2>
        <p className="lede" data-reveal>Mochi is the AI coach inside Setcraft. It asks a handful of questions, builds your first week, and gets far too excited when you beat last week’s numbers.</p>
      </div>
      <div className="mochi-stage" ref={ref}>
        <div className="mochi-me">
          <div className="plate">
            <MochiToy onPoke={cycle}><Mochi size={230} mood={mood} talking={typing && !picked} followPointer label={`Mochi, ${mood}`} /></MochiToy>
          </div>
          <div className="moods" role="group" aria-label="Change Mochi’s mood">
            {moods.map(m => <button key={m.mood} className={mood === m.mood ? 'is-on' : ''} aria-pressed={picked === m.mood} onClick={() => setPicked(picked === m.mood ? null : m.mood)}>{m.label}</button>)}
          </div>
        </div>
        <div className="chat" aria-live="polite">
          <p className="chat__meta">Onboarding, replayed</p>
          {shown.map((line, i) => <p key={i} className={`chat__line chat__line--${line.from}`}>{line.text}</p>)}
          {typing && <p className="chat__line chat__line--mochi chat__typing" aria-label="Mochi is typing"><i /><i /><i /></p>}
          {done && !reduced && <button className="chat__replay textlink" onClick={() => { setStep(0); setPicked(null); }}>Play it again</button>}
        </div>
        <div className="mochi-phone">
          <div className={`swap${done ? ' swap--done' : ''}`}>
            <Phone screen="mochiGoal" className="swap__a" />
            <Phone screen="planWeek" className="swap__b" priority />
          </div>
        </div>
      </div>
      <div className="said">
        <Label>Things Mochi has been known to say</Label>
        <ul>{mochiMoments.map(moment => <li key={moment.text} data-reveal>
          <Mochi size={56} mood={moment.mood} />
          <q className="display">{moment.text}</q>
          <span>{moment.when}</span>
        </li>)}</ul>
      </div>
    </div>
  </section>;
}
