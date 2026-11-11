import { Mochi } from '../mochi/Mochi';

const words = ['Train', 'Eat', 'Sleep', 'Repeat', 'Get stronger', 'Rest day', 'New PR'];
export function Marquee() {
  const row = words.flatMap((word, i) => [<span key={`w${i}`}>{word}</span>, <Mochi key={`m${i}`} size={42} mood={i % 3 === 1 ? 'cheer' : 'listening'} />]);
  return <div className="marquee" aria-hidden="true">
    <div className="marquee__track"><div>{row}</div><div>{row}</div></div>
  </div>;
}
