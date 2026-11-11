import { faqs } from '../../data/content';
import { site } from '../../config/site';

export function Faq() {
  return <section id="faq" className="faq" aria-labelledby="faq-title">
    <div className="wrap faq__grid">
      <div className="faq__head">
        <h2 id="faq-title" className="display" data-reveal>Questions.</h2>
        <p data-reveal>Something missing? <a className="textlink" href={`mailto:${site.supportEmail}`}>Email us</a> and a person will answer.</p>
      </div>
      <div className="faq__list">{faqs.map(item => <details key={item.question} name="faq"><summary>{item.question}<span aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </div>
  </section>;
}
