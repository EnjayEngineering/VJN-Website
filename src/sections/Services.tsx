import { useState } from 'react';
import type { Service } from '@/data/services';
import { useLocale, useServices } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { cx } from '@/lib/cx';
import styles from './Services.module.css';

type Filter = 'All' | Service['category'];
const filters: Filter[] = ['All', 'MEP', 'Finishing'];

interface ServicesProps {
  /** Show category filter chips (used on the Services page). */
  filterable?: boolean;
  showHeader?: boolean;
}

export function Services({ filterable = false, showHeader = true }: ServicesProps) {
  const { t } = useLocale();
  const services = useServices();
  const [filter, setFilter] = useState<Filter>('All');
  const visible = filter === 'All' ? services : services.filter((s) => s.category === filter);

  return (
    <section className={styles.section} aria-labelledby={showHeader ? 'services-title' : undefined}>
      <Container>
        {showHeader && (
          <SectionHeader
            eyebrow={t.services.eyebrow}
            title={<span id="services-title">{t.services.title}</span>}
            lead={t.services.lead}
            align="split"
            action={
              !filterable && (
                <Button to="/services" variant="outline" arrow>
                  {t.services.viewAll}
                </Button>
              )
            }
          />
        )}

        {filterable && (
          <div className={styles.filters} role="group" aria-label={t.services.filterLabel}>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                className={cx(styles.chip, filter === f && styles.chipActive)}
                onClick={() => setFilter(f)}
              >
                {t.services.filters[f]}
                <span className={styles.count}>
                  {f === 'All' ? services.length : services.filter((s) => s.category === f).length}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.grid}>
          {visible.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={(i % 4) * 70}
              className={cx(styles.cell, filter === 'All' && i < 2 && styles.wide)}
            >
              <ServiceCard
                service={service}
                index={services.indexOf(service)}
                featured={filter === 'All' && i < 2}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
