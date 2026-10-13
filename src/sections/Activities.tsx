import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { useLocale, useServices } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './Activities.module.css';

/** The ten activities on the trade licence, each with its own thumbnail. */
export function Activities() {
  const { t, dir } = useLocale();
  const services = useServices();
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className={styles.section} aria-labelledby="activities-title">
      <Container>
        <SectionHeader
          eyebrow={t.activities.eyebrow}
          title={<span id="activities-title">{t.activities.title}</span>}
          lead={t.activities.lead}
          align="split"
        />

        <ol className={styles.list}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 2) * 60}>
              <LocaleLink to={`/services/${s.slug}`} className={styles.item}>
                <Photo name={s.image} alt="" sizes="80px" className={styles.thumb} />
                <span className={styles.text}>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  <strong>{s.title}</strong>
                  <small>{s.licence}</small>
                </span>
                <span className={styles.go} aria-hidden>
                  <Arrow size={17} />
                </span>
              </LocaleLink>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
