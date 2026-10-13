import type { ReactNode } from 'react';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { company, navLinks } from '@/data/company';
import { legal } from '@/data/legal';
import { useLocale, useServices } from '@/i18n';
import { reviewConsent } from '@/lib/analytics';
import { Container } from '@/components/ui/Container';
import { LegalLink } from '@/components/legal/LegalLink';
import { LogoMark } from '@/components/brand/LogoMark';
import { Logo } from './Logo';
import styles from './Footer.module.css';

export function Footer() {
  const { t, locale } = useLocale();
  const legalText = legal[locale];
  const services = useServices();

  return (
    <footer className={styles.footer}>
      {/* Deep green footer; the emblem sits faintly beneath the links. */}
      <div className={styles.frame}>
        <div className={styles.panel}>
          <Container>
            {/* Brand, and the two quickest ways to reach the team. */}
            <div className={styles.intro}>
              <div className={styles.brand}>
                <Logo tone="light" />
                <p>{t.company.blurb}</p>
              </div>
              <ul className={styles.reach}>
                <ReachLink
                  href={company.phoneHref}
                  icon={<Phone size={15} />}
                  label={t.contact.callUs}
                  value={company.phone}
                />
                <ReachLink
                  href={`mailto:${company.email}`}
                  icon={<Mail size={15} />}
                  label={t.contact.emailLabel}
                  value={company.email}
                />
              </ul>
            </div>

            <div className={styles.links}>
              <div className={styles.company}>
                <h2 className={styles.heading}>{t.footer.company}</h2>
                <ul className={styles.list}>
                  <li>
                    <LocaleLink to="/">{t.nav.home}</LocaleLink>
                  </li>
                  {navLinks.map((l) => (
                    <li key={l.to}>
                      <LocaleLink to={l.to}>{t.nav[l.key]}</LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.services}>
                <h2 className={styles.heading}>{t.footer.services}</h2>
                <ul className={`${styles.list} ${styles.twoCol}`}>
                  {services.map((s) => (
                    <li key={s.slug}>
                      <LocaleLink to={`/services/${s.slug}`}>{s.short}</LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.visit}>
                <h2 className={styles.heading}>{t.contact.visit}</h2>
                <ul className={`${styles.list} ${styles.iconList}`}>
                  <li>
                    <MapPin size={16} aria-hidden />
                    <a href={company.mapLink} target="_blank" rel="noopener noreferrer">
                      {t.company.addressLine}
                      {t.company.sep}
                      {t.company.city}
                    </a>
                  </li>
                  <li>
                    <Clock size={16} aria-hidden />
                    <span>{t.company.hours}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.bottom}>
              <p>
                © {new Date().getFullYear()} {t.company.name}. {t.company.rights}
              </p>
              <nav className={styles.legal} aria-label={legalText.footerNav}>
                <LegalLink doc="privacy">{legalText.label.privacy}</LegalLink>
                <LegalLink doc="terms">{legalText.label.terms}</LegalLink>
                <button type="button" onClick={reviewConsent}>
                  {legalText.cookies.settings}
                </button>
              </nav>
              <p>
                {t.company.poBox}
                {t.company.sep}
                {t.company.city}
              </p>
            </div>
          </Container>

          {/* Faint emblem at the foot of the page. */}
          <div className={styles.signature} aria-hidden dir="ltr">
            <LogoMark className={styles.wordmark} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function ReachLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li>
      <a href={href} className={styles.reachLink}>
        <span className={styles.reachLabel}>
          <span aria-hidden>{icon}</span>
          {label}
        </span>
        <span className={styles.reachValue} dir="ltr">
          {value}
        </span>
      </a>
    </li>
  );
}
