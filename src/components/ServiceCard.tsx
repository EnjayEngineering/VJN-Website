import { LocaleLink } from '@/components/ui/LocaleLink';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { useLocale, type LocalizedService } from '@/i18n';
import { Photo } from '@/components/ui/Photo';
import { cx } from '@/lib/cx';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: LocalizedService;
  index: number;
  featured?: boolean;
}

/** Photo-topped card for one service. */
export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const { t, dir } = useLocale();
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;
  return (
    <LocaleLink
      to={`/services/${service.slug}`}
      className={cx(styles.card, featured && styles.featured)}
      aria-label={service.title}
    >
      <div className={styles.media}>
        <Photo
          name={service.image}
          alt=""
          sizes={
            featured
              ? '(min-width: 1024px) 50vw, 100vw'
              : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
          }
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{t.services.categories[service.category]}</p>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.summary}>{service.summary}</p>
        <span className={styles.more}>
          {t.services.view}
          <Arrow size={16} aria-hidden />
        </span>
      </div>
    </LocaleLink>
  );
}
