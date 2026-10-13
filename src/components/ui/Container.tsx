import type { ComponentPropsWithoutRef, ElementType } from 'react';
import styles from './Container.module.css';
import { cx } from '@/lib/cx';

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: 'default' | 'narrow';
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = 'div'>({
  as,
  size = 'default',
  className,
  ...rest
}: ContainerProps<T>) {
  const Tag = as ?? 'div';
  return (
    <Tag
      className={cx(styles.container, size === 'narrow' && styles.narrow, className)}
      {...rest}
    />
  );
}
