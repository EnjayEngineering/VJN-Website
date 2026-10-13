import { createContext } from 'react';
import type { Dictionary } from './en';

export type Locale = 'en' | 'ar';

export interface LocaleContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  t: Dictionary;
  /** A site path in this language: '/services' -> '/ar/services' on Arabic pages. */
  localePath: (path: string) => string;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);
