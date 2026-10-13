import { legal } from '@/data/legal';
import { useLocale } from '@/i18n';
import { setConsent, useConsent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';
import { LegalLink } from './LegalLink';
import styles from './CookieBanner.module.css';

/**
 * Asks before Google Analytics runs. Hidden once the visitor answers; "Cookie
 * settings" in the footer brings it back. Text lives in `src/data/legal.ts`.
 */
export function CookieBanner() {
  const { locale } = useLocale();
  const consent = useConsent();
  const text = legal[locale];
  if (consent !== 'ask') return null;

  return (
    <section className={styles.banner} aria-label={text.cookies.label}>
      <p className={styles.message}>
        {text.cookies.message} <LegalLink doc="privacy">{text.label.privacy}</LegalLink>
      </p>
      <div className={styles.actions}>
        <Button variant="outline" onClick={() => setConsent('denied')}>
          {text.cookies.decline}
        </Button>
        <Button onClick={() => setConsent('granted')}>{text.cookies.accept}</Button>
      </div>
    </section>
  );
}
