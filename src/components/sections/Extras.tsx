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
  return <section className="extras" aria-labelledby="extras-title">
    <div className="wrap">
      <h2 id="extras-title" className="display" data-reveal>Also in there.</h2>
      <ul className="extras__list">
        {extras.map((item, i) => <li key={item.name} data-reveal>
          <span className="extras__n">{String(i + 1).padStart(2, '0')}</span>
          <h3>{item.name}</h3>
          <p>{item.text}</p>
          {item.img ? <img src={item.img} alt={item.alt} loading="lazy" /> : <span className="extras__blank" aria-hidden="true" />}
        </li>)}
      </ul>
    </div>
  </section>;
}
