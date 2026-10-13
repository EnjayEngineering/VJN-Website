import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Moon, Phone, Sun } from 'lucide-react';
import { company, navLinks } from '@/data/company';
import { useScrolled } from '@/hooks/useScrolled';
import { useTheme } from '@/hooks/useTheme';
import { localizePath, stripLocale, useLocale } from '@/i18n';
import { cx } from '@/lib/cx';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { LocaleNavLink } from '@/components/ui/LocaleLink';
import { Logo } from './Logo';
import styles from './Header.module.css';

/** One clean bar: logo, navigation, phone, language, theme and the quote button. */
export function Header() {
  const { pathname, search, hash } = useLocation();
  const { t, locale } = useLocale();
  const { theme, toggle: toggleTheme } = useTheme();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  // The same page in the other language.
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const otherLocaleUrl = localizePath(stripLocale(pathname), otherLocale) + search + hash;
  const close = () => setOpen(false);
  const themeLabel = theme === 'dark' ? t.nav.toLight : t.nav.toDark;

  // While the mobile menu is open: lock page scroll, close on Escape, and
  // close if the window widens to the desktop layout (where the menu is hidden).
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => desktop.matches && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <>
      <header className={cx(styles.header, scrolled && styles.scrolled, open && styles.open)}>
        <Container className={styles.inner}>
          <Logo onClick={close} />

          <nav className={styles.nav} aria-label={t.nav.primary}>
            {navLinks.map((link) => (
              <LocaleNavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => cx(styles.link, isActive && styles.active)}
              >
                {t.nav[link.key]}
              </LocaleNavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <a href={company.phoneHref} className={styles.phone} dir="ltr">
              <Phone size={15} aria-hidden />
              {company.phone}
            </a>
            {/* A real link to the other-language page, so crawlers can follow it too. */}
            <Link
              to={otherLocaleUrl}
              preventScrollReset
              className={styles.round}
              lang={otherLocale}
              hrefLang={otherLocale}
              aria-label={t.nav.languageLabel}
              title={t.nav.languageLabel}
            >
              {t.nav.language}
            </Link>
            <button
              type="button"
              className={cx(styles.round, styles.themeButton)}
              aria-label={themeLabel}
              title={themeLabel}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
            </button>
            <Button to="/contact" className={styles.cta}>
              {t.nav.getQuote}
            </Button>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={styles.bar1} aria-hidden />
              <span className={styles.bar2} aria-hidden />
            </button>
          </div>
        </Container>
      </header>

      {/* Rendered outside <header> so the sticky header cannot clip it. */}
      <div id="mobile-menu" className={styles.panel} hidden={!open}>
        <Container as="nav" aria-label={t.nav.mobile} className={styles.panelNav}>
          {navLinks.map((link) => (
            <LocaleNavLink
              key={link.to}
              to={link.to}
              onClick={close}
              className={({ isActive }) => cx(styles.panelLink, isActive && styles.active)}
            >
              {t.nav[link.key]}
            </LocaleNavLink>
          ))}
          <div className={styles.panelFooter}>
            <Button to="/contact" size="lg" arrow onClick={close}>
              {t.nav.getQuote}
            </Button>
            <a href={company.phoneHref} className={styles.panelContact}>
              <Phone size={18} aria-hidden /> <span dir="ltr">{company.phone}</span>
            </a>
            <a href={`mailto:${company.email}`} className={styles.panelContact}>
              <Mail size={18} aria-hidden /> {company.email}
            </a>
            <div className={styles.panelRow}>
              <p className={styles.panelHours}>{t.company.hours}</p>
              <button type="button" className={styles.panelTheme} onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
                {themeLabel}
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
