import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';
import { useLocale, useServices } from '@/i18n';
import { emphasis } from '@/lib/emphasis';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './Disciplines.module.css';

const panels: { category: Service['category']; key: 'mep' | 'finishing'; image: string }[] = [
  { category: 'MEP', key: 'mep', image: 'service-electrical' },
  { category: 'Finishing', key: 'finishing', image: 'service-carpentry' },
];

/** Home-page overview: the two disciplines, each with its own photo and service list. */
export function Disciplines() {
  const { t, dir } = useLocale();
  const services = useServices();
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className={styles.section} aria-labelledby="disciplines-title">
      <Container>
        <SectionHeader
          eyebrow={t.disciplines.eyebrow}
          title={<span id="disciplines-title">{emphasis(t.disciplines.title)}</span>}
          lead={t.disciplines.lead}
          align="split"
          action={
            <Button to="/services" variant="outline" arrow>
              {t.services.viewAll}
            </Button>
          }
        />

        <div className={styles.grid}>
          {panels.map((panel, i) => {
            const copy = t.disciplines[panel.key];
            const list = services.filter((s) => s.category === panel.category);
            return (
              <Reveal key={panel.key} delay={i * 120} className={styles.panel}>
                <div className={styles.media}>
                  <Photo
                    name={panel.image}
                    alt=""
                    sizes="(min-width: 960px) 50vw, 100vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{copy.title}</h3>
                  <p className={styles.text}>{copy.body}</p>
                  <ul className={styles.links}>
                    {list.map((s) => (
                      <li key={s.slug}>
                        <LocaleLink to={`/services/${s.slug}`}>
                          <span>{s.short}</span>
                          <Arrow size={16} aria-hidden />
                        </LocaleLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
