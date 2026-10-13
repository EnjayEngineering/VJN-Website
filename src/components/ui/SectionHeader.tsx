import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';
import { cx } from '@/lib/cx';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'start' | 'center' | 'split';
  tone?: 'light' | 'dark';
  action?: ReactNode;
  as?: 'h1' | 'h2';
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'start',
  tone = 'light',
  action,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  return (
    <Reveal className={cx(styles.header, styles[align], tone === 'dark' && styles.dark)}>
      <div className={styles.main}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Heading className={styles.title}>{title}</Heading>
      </div>
      {(lead || action) && (
        <div className={styles.aside}>
          {lead && <p className={styles.lead}>{lead}</p>}
          {action}
        </div>
      )}
    </Reveal>
  );
}
