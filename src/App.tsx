import { useRef, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Preloader } from './components/sections/Preloader';
import { Hero } from './components/sections/Hero';
import { Marquee } from './components/sections/Marquee';
import { MeetMochi } from './components/sections/MeetMochi';
import { StickyStory } from './components/sections/StickyStory';
import { Statement } from './components/sections/Statement';
import { Languages } from './components/sections/Languages';
import { Extras } from './components/sections/Extras';
import { Membership } from './components/sections/Membership';
import { Faq } from './components/sections/Faq';
import { Download } from './components/sections/Download';
import { AvailabilityDialog } from './components/ui/AvailabilityDialog';
import { Companion } from './components/mochi/Companion';
import { usePageMotion } from './hooks/usePageMotion';

export function App() {
  const root = useRef<HTMLDivElement>(null);
  const [dialog, setDialog] = useState<string | null>(null);
  usePageMotion(root);
  return <div ref={root} id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <Preloader />
    <Header />
    <main id="main">
      <Hero />
      <Marquee />
      <MeetMochi />
      <StickyStory />
      <Statement />
      <Languages />
      <Extras />
      <Membership />
      <Faq />
      <Download onUnavailable={setDialog} />
    </main>
    <Footer />
    <Companion />
    <AvailabilityDialog title={dialog} onClose={() => setDialog(null)} />
  </div>;
}
