import { useEffect, useRef, useState } from 'react';
import { Label, Lines } from '../ui/Lines';

const extras = [
  { name: 'Daily check-in', text: 'Ten seconds on sleep, energy and soreness. You get a readiness estimate for the day, so you know whether to push or take it easy.', img: '/assets/app/check-in.webp', alt: 'Daily check-in asking about sleep, rest, energy and soreness' },
  { name: 'Apple Health and Health Connect', text: 'Steps, sleep, heart data and workouts come in on their own. Read-only, and you can switch it off whenever you like.' },
  { name: 'Apple Watch', text: 'There is a Setcraft app for Apple Watch as well, ready when your workout is.' },
  { name: 'Exercise library', text: 'Every exercise has a demonstration, the muscles it works, and step-by-step form cues.', img: '/assets/app/exercise-library.webp', alt: 'Incline dumbbell press with target muscles highlighted' },
  { name: 'Rest timer', text: 'Counts down between sets. Add thirty seconds if you need them. Nobody is judging.', img: '/assets/app/rest-timer.webp', alt: 'Rest timer counting down 2:15' },
  { name: 'Progress photos', text: 'An optional photo after a finished workout. Months later, you will be glad you took it.', img: '/assets/app/photo-prompt.webp', alt: 'Workout complete prompt offering to take a progress photo' },
  { name: 'Works with Claude', text: 'Give Claude read-only access to your plans, workouts and progress, then ask it anything about your training. No photos or health data go along. Revoke it anytime.', img: '/assets/app/claude.webp', alt: 'Setcraft settings for connecting Claude with read-only access' },
];

export function Extras() {
  const [active, setActive] = useState<number | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);

  // On a mouse, the screenshot for the hovered row trails the cursor.
  useEffect(() => {
    const host = list.current, card = float.current;
    if (!host || !card || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0, placed = false;
    const tick = () => {
      const dx = tx - x, dy = ty - y;
      x += dx * 0.14; y += dy * 0.14;
      const tilt = Math.max(-12, Math.min(12, dx * 0.08));
      card.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${tilt.toFixed(2)}deg)`;
      frame = Math.abs(dx) + Math.abs(dy) > 0.4 ? requestAnimationFrame(tick) : 0;
    };
    const move = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      tx = event.clientX - box.left; ty = event.clientY - box.top;
      if (!placed) { x = tx; y = ty; placed = true; }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    host.addEventListener('pointermove', move);
    return () => { host.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, []);

  return <section className="extras" data-mood="listening" aria-labelledby="extras-title">
    <div className="wrap">
      <Label index="04">The small things</Label>
      <h2 id="extras-title" className="display" data-lines><Lines lines={[<>Also <em>in there.</em></>]} /></h2>
      <div className="extras__host" ref={list} onPointerLeave={() => setActive(null)}>
        <ul className="extras__list">
          {extras.map((item, i) => <li key={item.name} data-reveal onPointerEnter={() => setActive(i)}>
            <span className="extras__n">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="display">{item.name}</h3>
            <p>{item.text}</p>
            {item.img && <img className="extras__thumb" src={item.img} alt={item.alt} loading="lazy" />}
          </li>)}
        </ul>
        <div className="extras__float" ref={float} aria-hidden="true">
          {extras.map((item, i) => item.img && <img key={item.name} src={item.img} alt="" loading="lazy" className={i === active ? 'is-on' : ''} />)}
        </div>
      </div>
    </div>
  </section>;
}
