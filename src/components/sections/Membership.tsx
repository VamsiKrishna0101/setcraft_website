const days = [
  { day: 'Before', text: 'Answer the questions and see the plan Mochi builds for you. No payment needed for that.' },
  { day: 'Day 1', text: 'Start your free trial. Every feature is unlocked from the first minute.' },
  { day: 'Day 14', text: 'The trial ends. Stay monthly or yearly, or cancel in the App Store or Google Play before then.' },
];
const included = ['Weekly training plans', 'Mochi', 'Muscle maps', 'Exercise library', 'Nutrition and water', 'Progress and records', 'Progress photos', 'Health sync', 'Apple Watch app'];

export function Membership() {
  return <section id="membership" className="member" aria-labelledby="member-title">
    <div className="wrap">
      <div className="member__head">
        <h2 id="member-title" className="display" data-reveal>Two weeks<br />on the house.</h2>
        <p data-reveal>One membership, everything included. You see your plan before you decide anything, and prices are shown in the App Store and Google Play.</p>
      </div>
      <ol className="member__days">{days.map(item => <li key={item.day} data-reveal><span className="display">{item.day}</span><p>{item.text}</p></li>)}</ol>
      <div className="member__foot" data-reveal>
        <p className="member__inc"><b>Included:</b> {included.join(', ')}.</p>
        <a className="btn btn--ink" href="#download">Start the free trial</a>
      </div>
    </div>
  </section>;
}
