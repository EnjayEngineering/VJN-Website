import { Check } from 'lucide-react';
import { useLocale } from '@/i18n';
import { emphasis } from '@/lib/emphasis';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import styles from './About.module.css';

interface AboutProps {
  showLink?: boolean;
}

/** Two overlapping photos beside the company story and its commitments. */
export function About({ showLink = true }: AboutProps) {
  const { t } = useLocale();
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <Container className={styles.grid}>
        <Reveal className={styles.collage}>
          <Photo
            name="hero-site"
            alt={t.about.imageAlt}
            sizes="(min-width: 960px) 40vw, 90vw"
            className={styles.main}
          />
          <Photo
            name="service-plastering"
            alt=""
            sizes="(min-width: 960px) 18vw, 45vw"
            className={styles.inset}
          />
          <div className={styles.card}>
            <p className={styles.cardTitle}>{t.about.cardTitle}</p>
            <p>{t.about.cardBody}</p>
          </div>
        </Reveal>

        <div className={styles.copy}>
          <Reveal>
            <p className={styles.eyebrow}>{t.about.eyebrow}</p>
            <h2 id="about-title" className={styles.title}>
              {emphasis(t.about.title)}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className={styles.lead}>{t.about.lead}</p>
            <p className={styles.body}>{t.about.body}</p>
          </Reveal>

          <ul className={styles.list}>
            {t.about.commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={150 + i * 80} className={styles.item}>
                <span className={styles.check} aria-hidden>
                  <Check size={16} />
                </span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          {showLink && (
            <Reveal delay={300}>
              <Button to="/about" variant="outline" arrow>
                {t.about.more}
              </Button>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
