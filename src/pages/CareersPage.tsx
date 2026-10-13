import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { CheckCircle2, Mail, Paperclip } from 'lucide-react';
import { company } from '@/data/company';
import { legal } from '@/data/legal';
import type { ServiceSlug } from '@/data/services';
import { en } from '@/i18n/en';
import { useLocale, useServices } from '@/i18n';
import { emphasis } from '@/lib/emphasis';
import { submitApplication, type ApplicationPayload } from '@/lib/contact';
import { cx } from '@/lib/cx';
import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { LegalLink } from '@/components/legal/LegalLink';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/PageHero';
import styles from './CareersPage.module.css';

type Status =
  { state: 'idle' | 'sending' } | { state: 'sent'; via: 'api' | 'email' } | { state: 'error' };

export default function CareersPage() {
  const { t, locale } = useLocale();
  const c = t.careers;
  const page = t.pages.careers;
  const legalText = legal[locale];
  const services = useServices();
  const [trade, setTrade] = useState<ServiceSlug | ''>('');
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  // Picking a trade card fills in the form and brings it into view.
  function chooseTrade(slug: ServiceSlug) {
    setTrade(slug);
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    // Values are sent in English so the inbox reads consistently.
    const data: ApplicationPayload = {
      name: raw.name ?? '',
      email: raw.email ?? '',
      phone: raw.phone ?? '',
      trade: trade ? en.serviceItems[trade].title : '',
      experience: en.careers.experienceOptions[Number(raw.experience)] ?? '',
      message: raw.message ?? '',
    };
    setStatus({ state: 'sending' });
    const result = await submitApplication(data);
    if (result.ok) {
      setStatus({ state: 'sent', via: result.via });
      if (result.via === 'api') {
        form.reset();
        setTrade('');
      }
    } else {
      setStatus({ state: 'error' });
    }
  }

  return (
    <>
      <Seo title={page.metaTitle} description={page.description} />
      <PageHero
        eyebrow={page.title}
        title={page.heroTitle}
        lead={page.heroLead}
        crumbs={[{ label: page.title }]}
        image="service-plumbing"
      />

      {/* Intro and how to apply */}
      <section className={styles.section}>
        <Container className={styles.intro}>
          <Reveal>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 className={styles.title}>{emphasis(c.title)}</h2>
            <p className={styles.lead}>{c.lead}</p>
          </Reveal>
          <Reveal delay={100}>
            <h3 className={styles.stepsTitle}>{c.stepsTitle}</h3>
            <ol className={styles.steps}>
              {c.steps.map((step, i) => (
                <li key={step.title}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Trades */}
      <section className={styles.trades} aria-labelledby="trades-title">
        <Container>
          <div className={styles.tradesHead}>
            <h2 id="trades-title" className={styles.title}>
              {c.tradesTitle}
            </h2>
            <p className={styles.lead}>{c.tradesLead}</p>
          </div>
          <ul className={styles.tradeGrid}>
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    className={cx(styles.trade, trade === s.slug && styles.tradeActive)}
                    aria-pressed={trade === s.slug}
                    onClick={() => chooseTrade(s.slug)}
                  >
                    <span className={styles.tradeIcon}>
                      <Icon size={20} aria-hidden />
                    </span>
                    <span>{s.short}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" className={styles.section} aria-labelledby="apply-title">
        <Container className={styles.applyGrid}>
          <Reveal className={styles.formCard}>
            <h2 id="apply-title" className={styles.formTitle}>
              {c.formTitle}
            </h2>
            <p className={styles.formLead}>{c.formLead}</p>

            {status.state === 'sent' && status.via === 'api' ? (
              <div className={styles.success} role="status">
                <CheckCircle2 size={40} aria-hidden />
                <h3>{c.successTitle}</h3>
                <p>{c.successBody}</p>
                <Button variant="outline" onClick={() => setStatus({ state: 'idle' })}>
                  {c.sendAnother}
                </Button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.row}>
                  <Field label={c.name} name="name" autoComplete="name" required />
                  <Field
                    label={c.phone}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    dir="ltr"
                    required
                  />
                </div>
                <div className={styles.row}>
                  <Field
                    label={c.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    required
                  />
                  <label className={styles.field}>
                    <span>{c.experience}</span>
                    <select name="experience" required defaultValue="">
                      <option value="" disabled>
                        —
                      </option>
                      {c.experienceOptions.map((option, i) => (
                        <option key={option} value={i}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className={styles.field}>
                  <span>{c.trade}</span>
                  <select
                    name="trade"
                    value={trade}
                    onChange={(e) => setTrade(e.target.value as ServiceSlug | '')}
                  >
                    <option value="">{c.general}</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>{c.message}</span>
                  <textarea name="message" rows={4} placeholder={c.messagePlaceholder} />
                </label>

                {status.state === 'error' && (
                  <p className={styles.error} role="alert">
                    {c.error} {company.email}
                  </p>
                )}
                {status.state === 'sent' && status.via === 'email' && (
                  <p className={styles.note} role="status">
                    {c.emailOpened}
                  </p>
                )}

                <Button type="submit" size="lg" arrow disabled={status.state === 'sending'}>
                  {status.state === 'sending' ? c.sending : c.send}
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
            <div className={styles.asideCard}>
              <Paperclip size={22} aria-hidden />
              <p>{c.cvNote}</p>
            </div>
            <a href={`mailto:${company.email}`} className={styles.asideCard}>
              <Mail size={22} aria-hidden />
              <span>{company.email}</span>
            </a>
          </Reveal>
        </Container>
      </section>
    </>
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
