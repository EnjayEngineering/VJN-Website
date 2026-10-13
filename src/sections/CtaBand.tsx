import { company } from '@/data/company';
import { useLocale } from '@/i18n';
import { emphasis } from '@/lib/emphasis';
import { LogoMark } from '@/components/brand/LogoMark';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import styles from './CtaBand.module.css';

export function CtaBand() {
  const { t } = useLocale();
  return (
    <section className={styles.section}>
      <Container>
        <Reveal className={styles.band}>
          <LogoMark className={styles.mark} />
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{t.cta.eyebrow}</p>
            <h2 className={styles.title}>{emphasis(t.cta.title)}</h2>
            <p className={styles.body}>{t.cta.body}</p>
          </div>
          <div className={styles.actions}>
            <Button to="/contact" variant="light" size="lg" arrow>
              {t.cta.primary}
            </Button>
            <Button href={company.phoneHref} variant="ghost-light" size="lg">
              {t.cta.call} <span dir="ltr">{company.phone}</span>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
