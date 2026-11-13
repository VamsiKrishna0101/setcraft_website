import { Mochi } from '../mochi/Mochi';

const words = ['Train', 'Eat', 'Sleep', 'Repeat', 'Get stronger', 'Rest day', 'New PR'];
export function Marquee() {
  const row = words.flatMap((word, i) => [
    i % 2 ? <em key={`w${i}`}>{word}</em> : <span key={`w${i}`}>{word}</span>,
    <Mochi key={`m${i}`} still size={54} mood={i % 3 === 1 ? 'cheer' : i % 3 === 2 ? 'sleepy' : 'listening'} />,
  ]);
  return <div className="marquee display" aria-hidden="true">
    <div className="marquee__track"><div>{row}</div><div>{row}</div></div>
  </div>;
}
