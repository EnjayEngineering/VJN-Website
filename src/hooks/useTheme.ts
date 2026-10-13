import { useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'vjn-theme';

/**
 * Light/dark theme stored on <html data-theme>. index.html applies the saved
 * choice (or the system preference) before first paint to avoid a flash.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
      ? 'dark'
      : 'light',
  );

  const toggle = useCallback(() => {
    setThemeState((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage unavailable; the choice lasts for this visit only.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
