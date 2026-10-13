import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/i18n';
import styles from './Button.module.css';
import { cx } from '@/lib/cx';

type Variant = 'primary' | 'dark' | 'outline' | 'light' | 'ghost-light';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'lg';
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}

type ButtonProps = BaseProps &
  (
    | { to: string; href?: never; type?: never; disabled?: never }
    | { href: string; to?: never; type?: never; disabled?: never }
    | { type?: 'button' | 'submit'; to?: never; href?: never; disabled?: boolean }
  );

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', arrow = false, className, onClick } = props;
  const { dir, localePath } = useLocale();
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;
  const classes = cx(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow className={styles.icon} size={18} aria-hidden />}
    </>
  );

  if (props.to !== undefined) {
    return (
      <Link to={localePath(props.to)} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (props.href !== undefined) {
    const external = props.href.startsWith('http');
    return (
      <a
        href={props.href}
        className={classes}
        onClick={onClick}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      disabled={props.disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
