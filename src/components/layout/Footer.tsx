import { navigation, site } from '../../config/site';

export function Footer() {
  return <footer className="footer"><div className="wrap">
    <div className="footer__top">
      <p className="footer__about">Setcraft is a training, nutrition and progress app with a small coral coach called Mochi.</p>
      <nav className="footer__col" aria-label="Footer">{navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <div className="footer__col"><a href={site.privacyUrl}>Privacy</a><a href={site.termsUrl}>Terms</a><a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></div>
    </div>
    <div className="footer__word display" aria-hidden="true">setcraft</div>
    <div className="footer__bottom"><span>© {new Date().getFullYear()} Setcraft</span><span>App screens use demo data.</span><a href="#top">Back to top</a></div>
  </div></footer>;
}
