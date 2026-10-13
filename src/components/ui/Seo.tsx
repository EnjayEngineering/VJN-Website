import { useLocation } from 'react-router-dom';
import { localizePath, stripLocale, useLocale } from '@/i18n';
import { absoluteUrl } from '@/lib/structuredData';
import { JsonLd } from './JsonLd';

interface SeoProps {
  title?: string;
  description: string;
  /** Social preview image (a site path or absolute URL). Defaults to the branded card. */
  image?: string;
  /** Keep the page out of search results (e.g. the 404 page). */
  noindex?: boolean;
  /** schema.org JSON-LD for this page. */
  schema?: object | object[];
}

const DEFAULT_IMAGE = '/og-image.jpg';

/**
 * Per-page document metadata. React 19 hoists these tags into <head>, and the
 * build prerenders them into each page's HTML (see `scripts/prerender.mjs`).
 */
export function Seo({
  title,
  description,
  image = DEFAULT_IMAGE,
  noindex = false,
  schema,
}: SeoProps) {
  const { t, locale } = useLocale();
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | ${t.meta.siteName}` : t.meta.defaultTitle;
  // One URL per page: no trailing slash, no query string.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  const url = absoluteUrl(path);
  // The same page in each language, for hreflang (English is the default).
  const basePath = stripLocale(path);
  const enUrl = absoluteUrl(basePath);
  const arUrl = absoluteUrl(localizePath(basePath, 'ar'));
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}
      />
      {!noindex && (
        <>
          <link rel="canonical" href={url} />
          <link rel="alternate" hrefLang="en" href={enUrl} />
          <link rel="alternate" hrefLang="ar" href={arUrl} />
          <link rel="alternate" hrefLang="x-default" href={enUrl} />
        </>
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={t.meta.siteName} />
      <meta property="og:locale" content={locale === 'ar' ? 'ar_AE' : 'en_AE'} />
      <meta property="og:locale:alternate" content={locale === 'ar' ? 'en_AE' : 'ar_AE'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      {image === DEFAULT_IMAGE && (
        <>
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      <meta property="og:image:alt" content={fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schema && <JsonLd data={schema} />}
    </>
  );
}
