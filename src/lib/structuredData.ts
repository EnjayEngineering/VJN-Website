import { company } from '@/data/company';
import { localizePath, type Dictionary, type Locale, type LocalizedService } from '@/i18n';

// schema.org JSON-LD that helps Google show the business, its services and
// breadcrumbs in search results. https://developers.google.com/search/docs/appearance/structured-data

const BUSINESS_ID = `${company.siteUrl}/#business`;
const WEBSITE_ID = `${company.siteUrl}/#website`;

export const absoluteUrl = (path: string) => `${company.siteUrl}${path === '/' ? '/' : path}`;

/** The company as a local business, with its services as an offer catalogue. */
export function businessSchema(t: Dictionary, services: LocalizedService[], locale: Locale) {
  const url = (path: string) => absoluteUrl(localizePath(path, locale));
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      '@id': BUSINESS_ID,
      name: t.company.name,
      alternateName: t.meta.siteName,
      description: t.meta.homeDescription,
      url: url('/'),
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon-512.png'),
        width: 512,
        height: 512,
      },
      image: absoluteUrl('/og-image.jpg'),
      telephone: company.phoneHref.replace('tel:', ''),
      email: company.email,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: company.phoneHref.replace('tel:', ''),
        email: company.email,
        areaServed: 'AE',
        availableLanguage: ['English', 'Arabic'],
      },
      address: {
        '@type': 'PostalAddress',
        postOfficeBoxNumber: '37932',
        streetAddress: 'Al Quoz Industrial Area 2',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      geo: { '@type': 'GeoCoordinates', ...company.geo },
      hasMap: company.mapLink,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
      areaServed: { '@type': 'City', name: 'Dubai' },
      knowsAbout: services.map((s) => s.title),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: t.nav.services,
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.summary,
            url: url(`/services/${s.slug}`),
          },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: t.meta.siteName,
      url: url('/'),
      inLanguage: locale,
      publisher: { '@id': BUSINESS_ID },
    },
  ];
}

/** One service, provided by the business, in Dubai. */
export function serviceSchema(service: LocalizedService, imageUrl: string, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.short,
    description: service.summary,
    url: absoluteUrl(localizePath(`/services/${service.slug}`, locale)),
    image: imageUrl.startsWith('http') ? imageUrl : absoluteUrl(imageUrl),
    provider: {
      '@id': BUSINESS_ID,
      '@type': 'HomeAndConstructionBusiness',
      name: 'VJN Technical Services LLC',
    },
    areaServed: { '@type': 'City', name: 'Dubai' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.scope.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };
}

/** Breadcrumb trail; the last item is the current page. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
