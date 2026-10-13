import { LocaleLink } from '@/components/ui/LocaleLink';
import { useLocale, useSectors, useServices } from '@/i18n';
import { Seo } from '@/components/ui/Seo';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/sections/CtaBand';
import styles from './SectorsPage.module.css';

/** Each sector: a wide banner photo with its title, then details in two columns. */
export default function SectorsPage() {
  const { t } = useLocale();
  const page = t.pages.sectors;
  const sectors = useSectors();
  const services = useServices();
  return (
    <>
      <Seo title={page.metaTitle} description={page.description} />
      <PageHero
        eyebrow={page.title}
        title={page.heroTitle}
        lead={page.heroLead}
        crumbs={[{ label: page.title }]}
        image="service-false-ceiling"
      />

      <div className={styles.list}>
        {sectors.map((sector, i) => {
          const sectorServices = services.filter((s) => s.sectors.includes(sector.id));
          return (
            <section
              key={sector.id}
              id={sector.id}
              className={styles.sector}
              aria-labelledby={`${sector.id}-title`}
            >
              <Container>
                <Reveal className={styles.banner}>
                  <Photo
                    name={sector.image}
                    alt={`${sector.title}, ${t.sectors.projectBy}`}
                    sizes="(min-width: 1240px) 1240px, 100vw"
                    className={styles.image}
                  />
                  <div className={styles.bannerText}>
                    <span className={styles.number}>0{i + 1}</span>
                    <div>
                      <p className={styles.kicker}>{sector.kicker}</p>
                      <h2 id={`${sector.id}-title`} className={styles.title}>
                        {sector.title}
                      </h2>
                    </div>
                  </div>
                </Reveal>

                <div className={styles.details}>
                  <Reveal>
                    <p className={styles.intro}>{sector.intro}</p>
                    <ul
                      className={styles.chips}
                      aria-label={`${t.sectors.servicesFor} ${sector.title}`}
                    >
                      {sectorServices.map((s) => (
                        <li key={s.slug}>
                          <LocaleLink to={`/services/${s.slug}`}>{s.short}</LocaleLink>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={100}>
                    <ul className={styles.offer}>
                      {sector.offer.map((o) => (
                        <li key={o.label}>
                          <strong>{o.label}</strong>
                          <span>{o.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </Container>
            </section>
          );
        })}
      </div>
      <CtaBand />
    </>
  );
}
