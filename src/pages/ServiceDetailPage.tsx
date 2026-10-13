import { useParams } from 'react-router-dom';
import { Clock, Phone } from 'lucide-react';
import { company } from '@/data/company';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { useLocale, useSectors, useServices } from '@/i18n';
import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/PageHero';
import { image } from '@/lib/images';
import { serviceSchema } from '@/lib/structuredData';
import { ServiceCard } from '@/components/ServiceCard';
import { Contact } from '@/sections/Contact';
import NotFoundPage from './NotFoundPage';
import styles from './ServiceDetailPage.module.css';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { t, locale } = useLocale();
  const services = useServices();
  const sectors = useSectors();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFoundPage />;

  const Icon = service.icon;
  const related = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 2);
  const servedSectors = sectors.filter((s) => service.sectors.includes(s.id));
  const photo = image(service.image).src;

  return (
    <>
      <Seo
        title={t.meta.serviceTitle.replace('{service}', service.title)}
        description={t.meta.serviceDescription.replace('{summary}', service.summary)}
        schema={serviceSchema(service, photo, locale)}
      />
      <PageHero
        eyebrow={`${t.services.categories[service.category]} · ${t.services.service}`}
        title={service.title}
        lead={service.summary}
        crumbs={[{ label: t.nav.services, to: '/services' }, { label: service.short }]}
        image={service.image}
        caption={
          <>
            <span className={styles.captionLabel}>{t.services.licence}</span>
            <br />
            {service.licence}
          </>
        }
      />

      <section className={styles.section}>
        <Container className={styles.grid}>
          <Reveal className={styles.content}>
            <span className={styles.icon}>
              <Icon size={24} aria-hidden />
            </span>
            <h2 className={styles.heading}>{t.services.included}</h2>
            <ol className={styles.scope}>
              {service.scope.map((item, i) => (
                <li key={item}>
                  <span className={styles.scopeNum}>{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>

            <h3 className={styles.subheading}>{t.services.sectors}</h3>
            <ul className={styles.chips}>
              {servedSectors.map((s) => (
                <li key={s.id}>
                  <LocaleLink to={`/sectors#${s.id}`}>{s.title}</LocaleLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className={styles.aside}>
            <div className={styles.card}>
              <p className={styles.cardLabel}>{t.services.licence}</p>
              <p className={styles.cardLicence}>{service.licence}</p>
              <div className={styles.cardRows}>
                <a href={company.phoneHref}>
                  <Phone size={16} aria-hidden />
                  <span dir="ltr">{company.phone}</span>
                </a>
                <p>
                  <Clock size={16} aria-hidden />
                  {t.company.hours}
                </p>
              </div>
              <div className={styles.actions}>
                <Button href="#enquire" size="lg" arrow>
                  {t.services.requestQuote}
                </Button>
                <Button to="/services" variant="outline">
                  {t.services.allServices}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <Container>
            <h2 id="related-title" className={styles.relatedTitle}>
              {t.services.related}
            </h2>
            <div className={styles.relatedGrid}>
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <div id="enquire">
        <Contact defaultService={service.slug} />
      </div>
    </>
  );
}
