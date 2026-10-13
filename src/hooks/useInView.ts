import { useEffect, useRef, useState, type RefObject } from 'react';

const isServer = typeof window === 'undefined';
const supported = !isServer && 'IntersectionObserver' in window;

/** Reports once an element has entered the viewport, then stops observing. */
export function useInView<T extends Element>(
  rootMargin = '0px 0px -10% 0px',
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  // Without IntersectionObserver support, treat everything as visible. Prerendered HTML
  // starts hidden like the browser does; index.html reveals it when JavaScript is off.
  const [inView, setInView] = useState(!supported && !isServer);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView];
}
