import { useEffect, useMemo, type ReactNode } from 'react';
import { en, type Dictionary } from './en';
import { ar } from './ar';
import { LocaleContext, type Locale, type LocaleContextValue } from './context';
import { localizePath } from './paths';

const dictionaries: Record<Locale, Dictionary> = { en, ar };

/** Provides the language of the current URL (set per route branch in `router.tsx`). */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dir: LocaleContextValue['dir'] = locale === 'ar' ? 'rtl' : 'ltr';

  // Prerendered pages already have the right <html lang dir>; this covers client-side navigation.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
  }, [locale, dir]);

  const value = useMemo(
    () => ({
      locale,
      dir,
      t: dictionaries[locale],
      localePath: (path: string) => localizePath(path, locale),
    }),
    [locale, dir],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
