import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export function AvailabilityDialog({ title, onClose }: { title: string | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (title && !dialog?.open) dialog?.showModal();
    if (!title && dialog?.open) dialog?.close();
  }, [title]);
  const isDownload = title === 'Download Setcraft';
  return <dialog ref={ref} className="availability-dialog" aria-labelledby="availability-title" onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <button className="icon-btn dialog-close" aria-label="Close dialog" onClick={onClose}><X size={20} /></button>
    <img src="/assets/setcraft-mark.svg" width="58" height="58" alt="" />
    <span className="eyebrow">A little more to come</span>
    <h2 id="availability-title">{title}</h2>
    <p>{isDownload ? 'Your next chapter is getting closer. Official App Store and Google Play download details are coming soon.' : `${title ?? 'More information'} details will be available here before launch.`}</p>
    <button className="btn btn--light" onClick={() => { onClose(); document.getElementById('features')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>Explore the app <ArrowUpRight size={17} /></button>
  </dialog>;
}
