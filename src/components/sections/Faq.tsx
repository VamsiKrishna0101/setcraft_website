import { faqs } from '../../data/content';
import { site } from '../../config/site';
import { Label, Lines } from '../ui/Lines';

export function Faq() {
  return <section id="faq" className="faq" data-mood="thinking" aria-labelledby="faq-title">
    <div className="wrap">
      <Label index="06">Good to know</Label>
      <div className="faq__grid">
        <div className="faq__head">
          <h2 id="faq-title" className="display" data-lines><Lines lines={[<em>Questions.</em>]} /></h2>
          <p className="lede" data-reveal>Something missing? <a className="textlink" href={`mailto:${site.supportEmail}`}>Email us</a> and a person will answer.</p>
        </div>
        <div className="faq__list">{faqs.map((item, i) => <details key={item.question} name="faq">
          <summary><i>{String(i + 1).padStart(2, '0')}</i>{item.question}<span aria-hidden="true" /></summary>
          <p>{item.answer}</p>
        </details>)}</div>
      </div>
    </div>
  </section>;
}
