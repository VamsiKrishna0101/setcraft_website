import { Mochi } from '../mochi/Mochi';

const text = 'Most fitness apps do one thing. Your training is in one place, your food in another, and your progress lives in a notes app. Setcraft puts it all back together.';
export function Statement() {
  return <section className="statement" aria-label="Why Setcraft">
    <div className="wrap">
      <p className="statement__text display">{text.split(' ').map((word, i) => <span key={i} className="w">{word} </span>)}</p>
    </div>
    <div className="statement__peek" aria-hidden="true"><Mochi size={170} mood="listening" followPointer /></div>
  </section>;
}
