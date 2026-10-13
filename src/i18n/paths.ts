import type { Locale } from './context';

// English pages live at the root (/services); each has an Arabic twin under /ar (/ar/services).
// Separate URLs let search engines index both languages; see `hreflang` in `Seo.tsx`.

/** Language of a site path: everything under /ar is Arabic. */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
}

/** The page's path without its language prefix: '/ar/services' -> '/services'. */
export function stripLocale(pathname: string): string {
  return localeFromPath(pathname) === 'ar' ? pathname.slice(3) || '/' : pathname;
}

/** A site path in the given language: ('/services', 'ar') -> '/ar/services'. */
export function localizePath(path: string, locale: Locale): string {
  if (locale === 'en') return path;
  return path === '/' ? '/ar' : `/ar${path}`;
}
