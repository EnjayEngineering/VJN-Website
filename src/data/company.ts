/** Contact details that don't change between languages. Text lives in `src/i18n`. */
export const company = {
  /** Production origin, used for canonical URLs, the sitemap and social previews. No trailing slash. */
  siteUrl: 'https://rnstechservice.com',
  /** Map pin for the Al Quoz office (matches `mapEmbedUrl`). */
  geo: { latitude: 25.1336543, longitude: 55.2467974 },
  phone: '+971 4 380 6877',
  phoneHref: 'tel:+97143806877',
  email: 'sales.rnstech@gmail.com',
  /** Google Analytics 4 measurement ID; loaded only with consent (`src/lib/analytics.ts`). */
  analyticsId: 'G-MJBB1PXEHG',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14448.240944462277!2d55.2467974!3d25.133654299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f696cc2bf291d%3A0xb321c74c351743dc!2sAl%20Qouz%20Ind.second%20-%20Al%20Quoz%20-%20Dubai!5e0!3m2!1sen!2sae!4v1770749871685!5m2!1sen!2sae',
  mapLink: 'https://maps.google.com/?q=Al+Quoz+Industrial+Area+2,+Dubai',
} as const;

/** Primary navigation; labels come from `t.nav[key]`. */
export const navLinks = [
  { key: 'services', to: '/services' },
  { key: 'sectors', to: '/sectors' },
  { key: 'about', to: '/about' },
  { key: 'careers', to: '/careers' },
  { key: 'contact', to: '/contact' },
] as const;
