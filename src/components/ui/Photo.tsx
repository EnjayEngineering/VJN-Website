import type { ImgHTMLAttributes } from 'react';
import { image } from '@/lib/images';

interface PhotoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  name: string;
  alt: string;
  priority?: boolean;
}

/** Responsive WebP photo from `src/assets/images`. */
export function Photo({ name, alt, priority = false, sizes = '100vw', ...rest }: PhotoProps) {
  const { src, srcSet } = image(name);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={1024}
      height={1024}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  );
}
