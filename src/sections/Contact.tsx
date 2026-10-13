import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { company } from '@/data/company';
import { legal } from '@/data/legal';
import type { ServiceSlug } from '@/data/services';
import { en } from '@/i18n/en';
import { useLocale, useServices } from '@/i18n';
import { submitEnquiry, type ContactPayload } from '@/lib/contact';
import { Button } from '@/components/ui/Button';
import { LegalLink } from '@/components/legal/LegalLink';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './Contact.module.css';

type Status =
  { state: 'idle' | 'sending' } | { state: 'sent'; via: 'api' | 'email' } | { state: 'error' };

interface ContactProps {
  showHeader?: boolean;
  /** Pre-selects a service (used on service pages). */
  defaultService?: ServiceSlug;
}

export function Contact({ showHeader = true, defaultService }: ContactProps) {
  const { t, locale } = useLocale();
  const legalText = legal[locale];
  const services = useServices();
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as unknown as ContactPayload;
    setStatus({ state: 'sending' });
    const result = await submitEnquiry(data);
    if (result.ok) {
      setStatus({ state: 'sent', via: result.via });
      if (result.via === 'api') form.reset();
    } else {
      setStatus({ state: 'error' });
    }
  }

  return (
    <section className={styles.section} aria-labelledby={showHeader ? 'contact-title' : undefined}>
      <Container>
        {showHeader && (
          <SectionHeader
            eyebrow={t.contact.eyebrow}
            title={<span id="contact-title">{t.contact.title}</span>}
            lead={t.contact.lead}
            align="split"
          />
        )}

        <div className={styles.grid}>
          <Reveal className={styles.formCard}>
            {status.state === 'sent' && status.via === 'api' ? (
              <div className={styles.success} role="status">
                <CheckCircle2 size={40} aria-hidden />
                <h3>{t.contact.successTitle}</h3>
                <p>
                  {t.contact.successBody} <span dir="ltr">{company.phone}</span>
                </p>
                <Button variant="outline" onClick={() => setStatus({ state: 'idle' })}>
                  {t.contact.sendAnother}
                </Button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.row}>
                  <Field label={t.contact.name} name="name" autoComplete="name" required />
                  <Field
                    label={t.contact.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    required
                  />
                </div>
                <div className={styles.row}>
                  <Field
                    label={t.contact.phone}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    dir="ltr"
                  />
                  <label className={styles.field}>
                    <span>{t.contact.service}</span>
                    {/* Values stay in English so the sales inbox reads consistently. */}
                    <select
                      name="service"
                      defaultValue={defaultService ? en.serviceItems[defaultService].title : ''}
                    >
                      <option value="">{t.contact.general}</option>
                      {services.map((s) => (
                        <option key={s.slug} value={en.serviceItems[s.slug].title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className={styles.field}>
                  <span>{t.contact.message}</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder={t.contact.messagePlaceholder}
                  />
                </label>

                {status.state === 'error' && (
                  <p className={styles.error} role="alert">
                    {t.contact.error} <span dir="ltr">{company.phone}</span> · {company.email}
                  </p>
                )}
                {status.state === 'sent' && status.via === 'email' && (
                  <p className={styles.note} role="status">
                    {t.contact.emailOpened}
                  </p>
                )}

                <Button type="submit" size="lg" arrow disabled={status.state === 'sending'}>
                  {status.state === 'sending' ? t.contact.sending : t.contact.send}
                </Button>
                <p className={styles.consent}>
                  {legalText.formConsent.before}
                  <LegalLink doc="privacy">{legalText.label.privacy}</LegalLink>
                  {legalText.formConsent.after}
                </p>
              </form>
            )}
          </Reveal>

          <Reveal delay={120} className={styles.aside}>
            <ul className={styles.details}>
              <Detail icon={<Phone size={20} />} label={t.contact.callUs}>
                <a href={company.phoneHref} dir="ltr">
                  {company.phone}
                </a>
              </Detail>
              <Detail icon={<Mail size={20} />} label={t.contact.emailLabel}>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </Detail>
              <Detail icon={<MapPin size={20} />} label={t.contact.visit}>
                <a href={company.mapLink} target="_blank" rel="noopener noreferrer">
                  {[t.company.poBox, t.company.addressLine, t.company.city].join(t.company.sep)}
                </a>
              </Detail>
              <Detail icon={<Clock size={20} />} label={t.contact.hours}>
                <span>{t.company.hours}</span>
              </Detail>
            </ul>
            <iframe
              className={styles.map}
              title={t.contact.mapTitle}
              src={company.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, ...input }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input type="text" {...input} />
    </label>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className={styles.detail}>
      <span className={styles.detailIcon} aria-hidden>
        {icon}
      </span>
      <div>
        <p className={styles.detailLabel}>{label}</p>
        <div className={styles.detailValue}>{children}</div>
      </div>
    </li>
  );
}
