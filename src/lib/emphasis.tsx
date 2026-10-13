import { Fragment, type ReactNode } from 'react';

/** Renders `*word*` segments of a copy string as <em>. */
export function emphasis(text: string): ReactNode {
  return text
    .split(/(\*[^*]+\*)/)
    .map((part, i) =>
      part.startsWith('*') && part.endsWith('*') ? (
        <em key={i}>{part.slice(1, -1)}</em>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}
