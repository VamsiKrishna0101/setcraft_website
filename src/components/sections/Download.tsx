import { Mochi } from '../mochi/Mochi';
import { MochiToy } from '../mochi/MochiToy';
import { Lines } from '../ui/Lines';
import { StoreBadges } from '../ui/StoreBadges';

export function Download({ onUnavailable }: { onUnavailable: (title: string) => void }) {
  return <section id="download" className="download panel t-coral" data-mood="hide" aria-labelledby="download-title">
    <div className="wrap download__inner">
      <MochiToy><Mochi size={210} mood="cheer" followPointer label="Mochi cheering" /></MochiToy>
      <h2 id="download-title" className="display" data-lines><Lines lines={['Go on.', <em>Do one set.</em>]} /></h2>
      <p className="lede" data-reveal>Download Setcraft, answer a few questions, and Mochi will have your first week ready before your coffee is.</p>
      <div className="download__stores" data-reveal><StoreBadges onUnavailable={onUnavailable} /></div>
      <p className="download__note">iPhone, Apple Watch and Android. Launching soon.</p>
    </div>
  </section>;
}
