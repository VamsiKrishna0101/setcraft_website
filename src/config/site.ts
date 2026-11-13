/** Add verified public destinations here when the store listings are ready. */
export const site = {
  name: 'Setcraft',
  appStoreUrl: '',
  googlePlayUrl: '',
  privacyUrl: '/privacy.html',
  termsUrl: '/terms.html',
  supportEmail: 'support@setcraft.fit',
  instagramUrl: '',
} as const;

export const navigation = [
  { label: 'Mochi', href: '#mochi' },
  { label: 'Features', href: '#features' },
  { label: 'Languages', href: '#languages' },
  { label: 'Membership', href: '#membership' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Creators', href: '/creator' },
] as const;
