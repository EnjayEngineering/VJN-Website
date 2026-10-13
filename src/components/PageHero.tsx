import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/i18n';
import { cx } from '@/lib/cx';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { Photo } from '@/components/ui/Photo';
import { breadcrumbSchema } from '@/lib/structuredData';
import styles from './PageHero.module.css';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  image?: string;
  /** Small caption shown on the photo (e.g. the licence name of a service). */
  caption?: ReactNode;
  children?: ReactNode;
}

/** Light split header for inner pages: text on one side, a framed photo on the other. */
export function PageHero({ eyebrow, title, lead, crumbs, image, caption, children }: PageHeroProps) {
  const { t, dir, localePath } = useLocale();
  const { pathname } = useLocation();
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const trail = breadcrumbSchema([
    { name: t.nav.home, path: localePath('/') },
    ...crumbs.map((c) => ({ name: c.label, path: c.to ? localePath(c.to) : pathname })),
  ]);
  return (
    <section className={cx(styles.hero, image && styles.withImage)}>
      <JsonLd data={trail} />
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <nav aria-label={t.nav.breadcrumb}>
            <ol className={styles.crumbs}>
              <li>
                <LocaleLink to="/">{t.nav.home}</LocaleLink>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  <Chevron size={14} aria-hidden />
                  {c.to ? (
                    <LocaleLink to={c.to}>{c.label}</LocaleLink>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children}
        </div>
        {image && (
          <figure className={styles.figure}>
            <Photo
              name={image}
              alt=""
              priority
              sizes="(min-width: 960px) 42vw, 100vw"
              className={styles.image}
            />
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
          </figure>
        )}
      </Container>
    </section>
  );
}
