import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ScreenViewerProvider } from './components/ui/ScreenViewer';
import './styles/site.css';
import './styles/sections.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><ScreenViewerProvider><App /></ScreenViewerProvider></StrictMode>,
);
