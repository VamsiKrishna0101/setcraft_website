import type { ReactNode } from 'react';

/** Wraps each headline line in a mask so it can slide into view. */
export function Lines({ lines }: { lines: ReactNode[] }) {
  return <>{lines.map((line, i) => <span key={i} className="ln"><span className="ln__i">{line}</span></span>)}</>;
}

export function Label({ index, children, bare }: { index?: string; children: ReactNode; bare?: boolean }) {
  return <p className={`label${bare ? ' label--bare' : ''}`} data-reveal>{index && <i>{index}</i>}{children}</p>;
}
