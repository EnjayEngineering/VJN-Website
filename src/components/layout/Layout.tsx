import { useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from '@/components/legal/CookieBanner';
import { LegalSheet } from '@/components/legal/LegalSheet';
import { ScrollProgress } from './ScrollProgress';
import { LocaleProvider, useLocale, type Locale } from '@/i18n';

/** Page shell for one language; the router mounts it at / (English) and /ar (Arabic). */
export function Layout({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Shell />
    </LocaleProvider>
  );
}

function Shell() {
  const { pathname } = useLocation();
  const { t } = useLocale();
  // The first page is already on screen (prerendered), so only later navigations fade in.
  const [landingPath, setLandingPath] = useState<string | null>(pathname);
  if (landingPath !== null && pathname !== landingPath) setLandingPath(null);

  return (
    <>
      <a href="#main" className="skip-link">
        {t.nav.skip}
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        {/* Re-keyed per route so each page fades in on navigation. */}
        <div key={pathname} className={landingPath === null ? 'page-enter' : undefined}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <CookieBanner />
      <LegalSheet />
      <ScrollRestoration />
    </>
  );
}
