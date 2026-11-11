import { useEffect, useId, useRef } from 'react';

export type MochiMood = 'listening' | 'thinking' | 'cheer' | 'sleepy';

type MochiProps = {
  size?: number;
  mood?: MochiMood;
  talking?: boolean;
  /** Eyes follow the pointer, like Mochi glancing at you. */
  followPointer?: boolean;
  className?: string;
  label?: string;
};

/*
 * A faithful SVG port of the app's Mochi painter (mobile/lib/features/onboarding/
 * components/coach_mascot.dart): same proportions, gradient, face and moods.
 * Geometry uses the painter's units with s = 200 and r = .34 s.
 */
const R = 68;
const INK = '#2A1420';

const BLOB = (() => {
  const points: string[] = [];
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const ripple = 1 + 0.022 * Math.sin(a * 3);
    let x = Math.cos(a) * R * 1.04 * ripple;
    let y = Math.sin(a) * R * 0.94 * ripple;
    if (y > 0) { x *= 1 + 0.08 * (y / R); y *= 0.9; }
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join('') + 'Z';
})();

function Star({ x, y, r, color, delay }: { x: number; y: number; r: number; color: string; delay: number }) {
  const d = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4;
    const len = k % 2 === 0 ? r : r * 0.35;
    return `${k === 0 ? 'M' : 'L'}${(x + Math.cos(a) * len).toFixed(2)} ${(y + Math.sin(a) * len).toFixed(2)}`;
  }).join('') + 'Z';
  return <path className="mochi__sparkle" d={d} fill={color} style={{ animationDelay: `${delay}s` }} />;
}

export function Mochi({ size = 160, mood = 'listening', talking = false, followPointer = false, className = '', label }: MochiProps) {
  const id = useId().replace(/:/g, '');
  const ref = useRef<SVGSVGElement>(null);
  const cheering = mood === 'cheer';
  const thinking = mood === 'thinking';
  const sleepy = mood === 'sleepy';

  useEffect(() => {
    const svg = ref.current;
    if (!followPointer || !svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = svg.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const length = Math.hypot(dx, dy) || 1;
        const pull = Math.min(1, length / 500);
        svg.style.setProperty('--gx', `${((dx / length) * 5.5 * pull).toFixed(2)}px`);
        svg.style.setProperty('--gy', `${((dy / length) * 4.5 * pull).toFixed(2)}px`);
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, [followPointer]);

  const eye = (x: number) => {
    const cx = x + (thinking ? 4.76 : 0);
    const cy = -8.16 + (thinking ? -4.76 : 0);
    if (cheering) return <path key={x} d={`M${cx - 8.84} ${cy + 3.4}Q${cx} ${cy - 10.9} ${cx + 8.84} ${cy + 3.4}`} stroke={INK} strokeWidth="5.1" strokeLinecap="round" fill="none" />;
    if (sleepy) return <path key={x} d={`M${cx - 6.8} ${cy}Q${cx} ${cy + 4.76} ${cx + 6.8} ${cy}`} stroke={INK} strokeWidth="5.1" strokeLinecap="round" fill="none" />;
    return <g key={x} className="mochi__eye">
      <ellipse cx={cx} cy={cy} rx="10.2" ry="13.6" fill={INK} />
      <circle cx={cx - 3.74} cy={cy - 5.78} r="5.44" fill="#fff" />
      <circle cx={cx + 4.08} cy={cy + 5.44} r="2.38" fill="#fff" fillOpacity=".85" />
    </g>;
  };
  const mouthOpen = cheering || talking;

  return <svg ref={ref} className={`mochi mochi--${mood}${talking ? ' mochi--talking' : ''} ${className}`} width={size} height={size} viewBox="0 0 200 200" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} overflow="visible">
    <defs>
      <radialGradient id={`${id}-body`} gradientUnits="userSpaceOnUse" cx="-26.2" cy="-41.1" r="157">
        <stop offset="0" stopColor="#FFD3C4" /><stop offset=".5" stopColor="#FF9A84" /><stop offset="1" stopColor="#F06A5C" />
      </radialGradient>
      <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" /></filter>
      <filter id={`${id}-shadow`} x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="4" /></filter>
      <clipPath id={`${id}-mouth`}><path d="M-11.56 14.96Q0 38 11.56 14.96Z" /></clipPath>
    </defs>
    <ellipse className="mochi__shadow" cx="100" cy="190" rx="52" ry="7" fill="#000" fillOpacity=".45" filter={`url(#${id}-shadow)`} />
    <g transform="translate(100 120)">
      <g className="mochi__bounce">
        <g className="mochi__tilt">
          <g className="mochi__breathe">
            {[-1, 1].map(side => <ellipse key={`f${side}`} cx={side * 27.2} cy="58.5" rx="12.9" ry="6.8" fill="#EB5F55" />)}
            {[-1, 1].map(side => <g key={`a${side}`} transform={`translate(${side * 62.56} 12.24)`}>
              <g className={side > 0 ? 'mochi__arm mochi__arm--right' : 'mochi__arm'} style={{ transform: `rotate(${side * (cheering ? -70 : 20)}deg)` }}>
                <ellipse cx={side * 8.16} cy="0" rx="10.2" ry="6.12" fill="#F7826F" />
              </g>
            </g>)}
            <path d={BLOB} fill={`url(#${id}-body)`} />
            <ellipse cx="-28.56" cy="-35.36" rx="14.28" ry="7.48" fill="#fff" fillOpacity=".55" filter={`url(#${id}-soft)`} />
            <path d="M-1.36 -57.12Q1.36 -76.16 13.6 -72.08Q4.08 -68 6.8 -57.12Z" fill="#FF9A84" />
            {[-1, 1].map(side => <ellipse key={`b${side}`} cx={side * 39.44} cy="13.6" rx="8.84" ry="5.1" fill="#FF7E9A" fillOpacity={cheering ? .85 : .6} filter={`url(#${id}-soft)`} />)}
            <g className="mochi__face">
              {eye(-20.4)}{eye(20.4)}
              {thinking ? <ellipse cx="4.08" cy="17.68" rx="3.4" ry="4.08" fill={INK} />
                : mouthOpen ? <g className="mochi__mouth">
                  <path d="M-11.56 14.96Q0 38 11.56 14.96Z" fill={INK} />
                  <ellipse cx="0" cy="27.2" rx="6.8" ry="4.08" fill="#FF6F8E" clipPath={`url(#${id}-mouth)`} />
                </g>
                  : <path d="M-6.12 16.32Q0 21.76 6.12 16.32" stroke={INK} strokeWidth="4.08" strokeLinecap="round" fill="none" />}
            </g>
          </g>
        </g>
      </g>
    </g>
    {thinking && [0, 1, 2].map(i => <circle key={i} className="mochi__dot" cx={148 + i * 18} cy="36" r="5.6" fill="#fff" style={{ animationDelay: `${i * 0.18}s` }} />)}
    {sleepy && [0, 1, 2].map(i => <text key={i} className="mochi__z" x={140 + i * 12} y={50 - i * 14} fontFamily="Nunito, sans-serif" fontWeight="800" fontSize={18 + i * 5} fill="#fff" style={{ animationDelay: `${i * 0.6}s` }}>z</text>)}
    {cheering && [0, 1, 2, 3, 4].map(i => {
      const angle = -Math.PI / 2 + (i - 2) * 0.55;
      return <Star key={i} x={100 + Math.cos(angle) * 96} y={104 + Math.sin(angle) * 96} r={7.6} color={['#FFD166', '#fff', '#FF8FA3'][i % 3]} delay={i * 0.17} />;
    })}
  </svg>;
}
