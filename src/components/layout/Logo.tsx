import type { MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { LogoMark } from '@/components/brand/LogoMark';
import { useLocale } from '@/i18n';
import { cx } from '@/lib/cx';
import styles from './Logo.module.css';

interface LogoProps {
  tone?: 'dark' | 'light';
  onClick?: () => void;
}

/** Brand lockup: the emblem, the VJN name and the legal tagline. */
export function Logo({ tone = 'dark', onClick }: LogoProps) {
  const { t, localePath } = useLocale();
  const { pathname } = useLocation();

  // On the home page itself the link goes nowhere new, so scroll back to the top instead.
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (pathname === localePath('/')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <LocaleLink
      to="/"
      className={cx(styles.logo, tone === 'light' && styles.light)}
      aria-label={t.company.homeLabel}
      onClick={handleClick}
    >
      <LogoMark className={styles.mark} />
      <span className={styles.text}>
        <span className={styles.name}>VJN</span>
        <span className={styles.tagline}>{t.company.logoTagline}</span>
      </span>
    </LocaleLink>
  );
}
