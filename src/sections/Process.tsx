import type { CSSProperties } from 'react';
import { useLocale } from '@/i18n';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './Process.module.css';

export function Process() {
  const ref = useScrollProgress<HTMLDivElement>({ start: 0.85, end: 0.55 });
  const { t } = useLocale();
  const process = t.process.steps;

  return (
    <section className={styles.section} aria-labelledby="process-title">
      <Container>
        <SectionHeader
          eyebrow={t.process.eyebrow}
          title={<span id="process-title">{t.process.title}</span>}
          align="split"
          lead={t.process.lead}
        />
        <div ref={ref} className={styles.timeline}>
          <div className={styles.track} aria-hidden>
            <div className={styles.fill} />
            {process.map((step, i) => (
              <span key={step.title} className={styles.dot} style={{ '--i': i } as CSSProperties} />
            ))}
          </div>
          <ol className={styles.steps}>
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90} className={styles.step}>
                <span className={styles.number} style={{ '--i': i } as CSSProperties}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.body}>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
