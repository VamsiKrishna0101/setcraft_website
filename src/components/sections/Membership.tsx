import { Label, Lines } from '../ui/Lines';

const days = [
  { day: 'Before', text: 'Answer the questions and see the plan Mochi builds for you. No payment needed for that.' },
  { day: 'Day 1', text: 'Start your free trial. Every feature is unlocked from the first minute.' },
  { day: 'Day 14', text: 'The trial ends. Stay monthly or yearly, or cancel in the App Store or Google Play before then.' },
];
const included = ['Weekly training plans', 'Mochi', 'Muscle maps', 'Exercise library', 'Nutrition and water', 'Progress and records', 'Progress photos', 'Health sync', 'Apple Watch app'];

export function Membership() {
  return <section id="membership" className="member panel" data-mood="cheer" aria-labelledby="member-title">
    <div className="wrap">
      <Label index="05">Membership</Label>
      <div className="head">
        <h2 id="member-title" className="display" data-lines><Lines lines={['Two weeks', <em>on the house.</em>]} /></h2>
        <p className="lede" data-reveal>One membership, everything included. You see your plan before you decide anything, and prices are shown in the App Store and Google Play.</p>
      </div>
      <div className="member__track">
        <span className="member__rule" aria-hidden="true" />
        <ol className="member__days">{days.map(item => <li key={item.day} data-reveal><span className="display">{item.day}</span><p>{item.text}</p></li>)}</ol>
      </div>
      <div className="member__foot">
        <ul className="member__inc" aria-label="Included">{included.map(item => <li key={item}>{item}</li>)}</ul>
        <a className="btn btn--solid" href="#download" data-magnetic><span className="btn__dot" />Start the free trial</a>
      </div>
    </div>
  </section>;
}
