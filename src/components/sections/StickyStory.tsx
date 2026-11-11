import { useEffect, useRef, useState } from 'react';
import { Phone } from '../ui/Phone';
import { story } from '../../data/content';

export function StickyStory() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index)); });
    }, { rootMargin: '-48% 0px -48% 0px' });
    steps.current.forEach(step => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);
  return <section id="features" className="story" aria-labelledby="story-title">
    <div className="wrap">
      <h2 id="story-title" className="display story__title" data-reveal>One app for the<br />whole routine.</h2>
      <div className="story__grid">
        <div className="story__steps">
          {story.map((item, i) => <article key={item.id} className={`story__step${i === active ? ' is-active' : ''}`} data-index={i} ref={el => { steps.current[i] = el; }}>
            <span className="story__num">0{i + 1}</span>
            <h3 className="display">{item.kicker}</h3>
            <p className="story__lede">{item.title}</p>
            <p>{item.body}</p>
            <p className="story__points">{item.points.join(' / ')}</p>
            <Phone screen={item.screen} className="story__inline" />
          </article>)}
        </div>
        <div className="story__sticky" aria-hidden="true">
          <div className="story__device">
            {story.map((item, i) => <Phone key={item.id} screen={item.screen} inspectable={false} priority className={`story__phone${i === active ? ' is-active' : ''}`} />)}
          </div>
          <p className="story__label">{story[active].kicker}</p>
        </div>
      </div>
    </div>
  </section>;
}
