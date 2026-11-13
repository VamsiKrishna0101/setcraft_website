import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ScreenViewerProvider } from './components/ui/ScreenViewer';
import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/fraunces/full-italic.css';
import './styles/site.css';
import './styles/sections.css';

// The creator portal is its own page at /creator; loaded only when visited.
const CreatorPortal = lazy(() => import('./creator/CreatorPortal').then(m => ({ default: m.CreatorPortal })));
const isCreatorPortal = /^\/creator(\/|$)/.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isCreatorPortal
      ? <Suspense fallback={null}><CreatorPortal /></Suspense>
      : <ScreenViewerProvider><App /></ScreenViewerProvider>}
  </StrictMode>,
);
