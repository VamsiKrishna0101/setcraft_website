import { Mochi } from '../mochi/Mochi';
import { MochiToy } from '../mochi/MochiToy';

const lead = 'Most fitness apps do one thing. Your training is in one place, your food in another, and your progress lives in a notes app.';
const punch = 'Setcraft puts it all back together.';
export function Statement() {
  return <section className="statement" data-mood="hide" aria-label="Why Setcraft">
    <div className="wrap">
      <p className="statement__text display">
        {lead.split(' ').map((word, i) => <span key={i} className="w">{word} </span>)}
        {punch.split(' ').map((word, i) => <em key={`p${i}`} className="w">{word} </em>)}
      </p>
    </div>
    <div className="statement__peek"><MochiToy><Mochi size={180} mood="listening" followPointer /></MochiToy></div>
  </section>;
}
