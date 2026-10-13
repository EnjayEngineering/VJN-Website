import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { useLocale, useSectors } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './Sectors.module.css';

/** Three tall sector cards on a deep green band. */
export function Sectors() {
  const { t, dir } = useLocale();
  const sectors = useSectors();
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className={styles.section} aria-labelledby="sectors-title">
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow={t.sectors.eyebrow}
          title={<span id="sectors-title">{t.sectors.title}</span>}
          lead={t.sectors.lead}
          align="split"
        />

        <div className={styles.grid}>
          {sectors.map((sector, i) => (
            <Reveal key={sector.id} delay={i * 110} className={styles.cell}>
              <LocaleLink to={`/sectors#${sector.id}`} className={styles.card}>
                <Photo
                  name={sector.image}
                  alt={`${sector.title}, ${t.sectors.projectBy}`}
                  sizes="(min-width: 960px) 33vw, 100vw"
                  className={styles.image}
                />
                <span className={styles.shade} aria-hidden />
                <span className={styles.content}>
                  <span className={styles.kicker}>{sector.kicker}</span>
                  <span className={styles.title}>{sector.title}</span>
                  <span className={styles.offer}>
                    {sector.offer.slice(0, 3).map((o) => (
                      <span key={o.label}>{o.label}</span>
                    ))}
                  </span>
                  <span className={styles.more}>
                    {t.sectors.explore}
                    <Arrow size={16} aria-hidden />
                  </span>
                </span>
              </LocaleLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
