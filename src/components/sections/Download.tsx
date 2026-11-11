import { Mochi } from '../mochi/Mochi';
import { StoreBadges } from '../ui/StoreBadges';

export function Download({ onUnavailable }: { onUnavailable: (title: string) => void }) {
  return <section id="download" className="download" aria-labelledby="download-title">
    <div className="wrap download__inner">
      <Mochi size={190} mood="cheer" followPointer label="Mochi cheering" />
      <h2 id="download-title" className="display" data-reveal>Go on.<br />Do one set.</h2>
      <p data-reveal>Download Setcraft, answer a few questions, and Mochi will have your first week ready before your coffee is.</p>
      <div className="download__stores" data-reveal><StoreBadges onUnavailable={onUnavailable} /></div>
      <p className="download__note">iPhone, Apple Watch and Android. Launching soon.</p>
    </div>
  </section>;
}
