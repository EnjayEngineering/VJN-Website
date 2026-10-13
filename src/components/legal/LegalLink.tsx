import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { LegalDocId } from '@/data/legal';

/** Marks history entries pushed by these links, so closing the sheet can simply go back. */
export interface LegalLinkState {
  legal?: boolean;
}

interface LegalLinkProps {
  doc: LegalDocId;
  /** Swap the open page in place (used inside the sheet) instead of adding a history entry. */
  replace?: boolean;
  className?: string;
  children: ReactNode;
}

/** Opens a policy in `LegalSheet` by adding `#privacy` / `#terms` to the current URL. */
export function LegalLink({ doc, replace = false, className, children }: LegalLinkProps) {
  const location = useLocation();
  return (
    <Link
      to={{ pathname: location.pathname, search: location.search, hash: doc }}
      state={replace ? location.state : ({ legal: true } satisfies LegalLinkState)}
      replace={replace}
      preventScrollReset
      className={className}
    >
      {children}
    </Link>
  );
}
