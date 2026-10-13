import { useContext } from 'react';
import { services, type Service } from '@/data/services';
import { sectors, type Sector } from '@/data/sectors';
import { LocaleContext, type LocaleContextValue } from './context';
import type { Dictionary } from './en';

export { LocaleProvider } from './LocaleProvider';
export type { Locale } from './context';
export type { Dictionary } from './en';
export { localeFromPath, localizePath, stripLocale } from './paths';

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}

export type LocalizedService = Service & Dictionary['serviceItems'][Service['slug']];
export type LocalizedSector = Sector & Dictionary['sectorItems'][Sector['id']];

/** Services with their text in the current language. */
export function useServices(): LocalizedService[] {
  const { t } = useLocale();
  return services.map((s) => ({ ...s, ...t.serviceItems[s.slug] }));
}

/** Sectors with their text in the current language. */
export function useSectors(): LocalizedSector[] {
  const { t } = useLocale();
  return sectors.map((s) => ({ ...s, ...t.sectorItems[s.id] }));
}
