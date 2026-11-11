import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Brand } from '../ui/Brand';
import { navigation } from '../../config/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <header className={`header${scrolled || open ? ' header--solid' : ''}`}>
    <div className="wrap header__bar">
      <Brand />
      <nav className="header__nav" aria-label="Main navigation">{navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <a className="btn btn--coral btn--sm header__cta" href="#download">Get the app</a>
      <button className="header__menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Mobile navigation">
      {navigation.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a href="#download" onClick={() => setOpen(false)}>Get the app</a>
    </nav>
  </header>;
}
