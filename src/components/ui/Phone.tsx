import { Maximize2 } from 'lucide-react';
import { screens, type ScreenKey } from '../../data/content';
import { useScreenViewer } from './ScreenViewer';

type PhoneProps = { screen: ScreenKey; className?: string; priority?: boolean; inspectable?: boolean };

export function Phone({ screen, className = '', priority = false, inspectable = true }: PhoneProps) {
  const inspect = useScreenViewer();
  const item = screens[screen];
  return <div className={`phone ${className}`}>
    <span className="phone__btn phone__btn--l" aria-hidden="true" />
    <span className="phone__btn phone__btn--r" aria-hidden="true" />
    <div className="phone__screen">
      <div className="phone__status" aria-hidden="true"><span>9:41</span><span className="phone__island" /><span className="phone__bars"><i /><i /><i /><b /></span></div>
      <img src={item.src} alt={item.alt} width="640" height="1387" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority && screen === "today" ? "high" : "auto"} decoding="async" />
    </div>
    {inspectable && <button className="phone__inspect" onClick={() => inspect(screen)} aria-label={`Open full ${item.title} screen`}><Maximize2 size={12} />Inspect</button>}
  </div>;
}
