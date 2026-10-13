import type { CSSProperties } from 'react';
import { useLocale } from '@/i18n';
import { emphasis } from '@/lib/emphasis';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';
import styles from './Hero.module.css';

/** Editorial hero: serif headline beside a three-photo mosaic. */
export function Hero() {
  const { t } = useLocale();

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            {t.hero.titleLines.map((line, i) => (
              <span key={i} className={styles.line} style={{ '--i': i } as CSSProperties}>
                {emphasis(line)}
              </span>
            ))}
          </h1>
          <p className={styles.lead}>{t.hero.lead}</p>
          <div className={styles.ctas}>
            <Button to="/contact" size="lg" arrow>
              {t.hero.primary}
            </Button>
            <Button to="/services" size="lg" variant="outline">
              {t.hero.secondary}
            </Button>
          </div>
          <ul className={styles.facts}>
            {t.hero.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <div className={styles.mosaic}>
          <Photo
            name="service-wallpaper"
            alt={t.hero.photoAlt}
            priority
            sizes="(min-width: 1024px) 28vw, 60vw"
            className={styles.tall}
          />
          <Photo
            name="service-hvac"
            alt=""
            priority
            sizes="(min-width: 1024px) 20vw, 40vw"
            className={styles.small}
          />
          <Photo
            name="service-ornamentation"
            alt=""
            sizes="(min-width: 1024px) 20vw, 40vw"
            className={styles.small}
          />
        </div>
      </Container>
    </section>
  );
}
