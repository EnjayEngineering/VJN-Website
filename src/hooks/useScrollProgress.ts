import { useEffect, useRef } from 'react';

interface Options {
  /** Viewport fraction where progress starts: p = 0 when the element's top is here. */
  start?: number;
  /** Viewport fraction where progress ends: p = 1 when the element's bottom is here. */
  end?: number;
  /** Value used when the visitor prefers reduced motion. */
  reducedValue?: number;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Tracks how far an element has travelled through the viewport and writes it
 * to a `--p` CSS custom property (0 → 1). Writing the variable directly avoids
 * React re-renders on every scroll frame.
 */
export function useScrollProgress<T extends HTMLElement>({
  start = 1,
  end = 0,
  reducedValue = 1,
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      node.style.setProperty('--p', String(reducedValue));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const travelled = vh * start - rect.top;
      const distance = vh * (start - end) + rect.height;
      const p = Math.min(1, Math.max(0, travelled / distance));
      node.style.setProperty('--p', p.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [start, end, reducedValue]);

  return ref;
}
