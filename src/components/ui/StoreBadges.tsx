import { site } from '../../config/site';

type Props = { onUnavailable: (title: string) => void; compact?: boolean };
export function StoreBadges({ onUnavailable, compact }: Props) {
  const badges = [
    { name: 'App Store', url: site.appStoreUrl, image: '/assets/app-store.svg', className: 'store-badge--apple' },
    { name: 'Google Play', url: site.googlePlayUrl, image: '/assets/google-play.png', className: 'store-badge--google' },
  ];
  return <div className={`store-badges${compact ? ' store-badges--compact' : ''}`}>
    {badges.map(badge => {
      const image = <img src={badge.image} alt={`${badge.name === 'App Store' ? 'Download on the' : 'Get it on'} ${badge.name}`} width={badge.name === 'App Store' ? 120 : 135} height="40" />;
      return badge.url ? <a key={badge.name} className={`store-badge ${badge.className}`} href={badge.url} target="_blank" rel="noopener noreferrer">{image}</a>
        : <button key={badge.name} className={`store-badge ${badge.className}`} onClick={() => onUnavailable('Download Setcraft')} aria-label={`${badge.name} — download details coming soon`}>{image}</button>;
    })}
  </div>;
}
