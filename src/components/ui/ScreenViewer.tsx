import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { screens, type ScreenKey } from '../../data/content';

const ScreenViewerContext = createContext<(screen: ScreenKey) => void>(() => {});
export const useScreenViewer = () => useContext(ScreenViewerContext);

export function ScreenViewerProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<ScreenKey | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selection && dialog.current && !dialog.current.open) { dialog.current.showModal(); dialog.current.scrollTop = 0; }
  }, [selection]);
  const item = selection ? screens[selection] : null;
  return <ScreenViewerContext.Provider value={setSelection}>
    {children}
    <dialog ref={dialog} className="viewer" aria-labelledby="viewer-title" onClose={() => setSelection(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="viewer__head"><div><span className="eyebrow">Inside Setcraft</span><h2 id="viewer-title">{item?.title ?? 'App preview'}</h2></div><button className="icon-btn" aria-label="Close app preview" onClick={() => dialog.current?.close()}><X size={20} /></button></div>
      {item && <img className="viewer__img" src={item.src} alt={item.alt} />}
      <p className="viewer__note">Actual app screen · Demonstration data</p>
    </dialog>
  </ScreenViewerContext.Provider>;
}
