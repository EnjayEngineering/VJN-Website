import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { legal, legalDocIds, type LegalDocId } from '@/data/legal';
import { useLocale } from '@/i18n';
import { LegalLink, type LegalLinkState } from './LegalLink';
import styles from './LegalSheet.module.css';

function docFromHash(hash: string): LegalDocId | null {
  const id = hash.replace(/^#/, '');
  return legalDocIds.find((doc) => doc === id) ?? null;
}

/**
 * Privacy Policy / Terms & Conditions as a modal sheet over the current page.
 * It is open whenever the URL hash is `#privacy` or `#terms`, so those links can
 * be shared. The text lives in `src/data/legal.ts`.
 */
export function LegalSheet() {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale } = useLocale();
  const text = legal[locale];
  const docId = docFromHash(location.hash);
  const open = docId !== null;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pressedBackdrop = useRef(false);

  // Keep showing the last page while the sheet closes.
  const [shownId, setShownId] = useState(docId);
  if (docId && docId !== shownId) setShownId(docId);
  const doc = shownId && text.docs[shownId];

  const close = useCallback(() => {
    // Opened from a link on this site: going back removes the hash and restores the scroll position.
    if ((location.state as LegalLinkState | null)?.legal) {
      navigate(-1);
    } else {
      navigate(
        { pathname: location.pathname, search: location.search },
        { replace: true, preventScrollReset: true },
      );
    }
  }, [location, navigate]);

  // Show as a modal (focus stays inside, the page behind is inert) and stop the page scrolling.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const root = document.documentElement;
    dialog.showModal();
    titleRef.current?.focus();
    root.style.scrollbarGutter = 'stable'; // keeps the page from shifting when its scrollbar hides
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close(); // returns focus to the link that opened it
      root.style.scrollbarGutter = '';
      document.body.style.overflow = '';
    };
  }, [open]);

  // Switching between the two pages starts the new one at the top.
  const previousId = useRef(shownId);
  useEffect(() => {
    if (previousId.current && shownId !== previousId.current) {
      scrollerRef.current?.scrollTo({ top: 0 });
      titleRef.current?.focus();
    }
    previousId.current = shownId;
  }, [shownId]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.sheet}
      aria-labelledby="legal-sheet-title"
      onCancel={(e) => {
        // Escape: close through the router so the URL is cleared too.
        e.preventDefault();
        close();
      }}
      // A click on the backdrop targets the dialog itself; require the press to start
      // there too, so selecting text and releasing outside doesn't close it.
      onPointerDown={(e) => {
        pressedBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (pressedBackdrop.current && e.target === e.currentTarget) close();
      }}
    >
      {doc && (
        // data-lenis-prevent: lets this panel scroll natively if a smooth-scroll library is added.
        <div ref={scrollerRef} className={styles.scroller} data-lenis-prevent>
          <header className={styles.head}>
            <h2 ref={titleRef} id="legal-sheet-title" className={styles.title} tabIndex={-1}>
              {doc.title}
            </h2>
            <button type="button" className={styles.close} aria-label={text.close} onClick={close}>
              <X size={22} aria-hidden />
            </button>
          </header>

          <div className={styles.body}>
            {text.translationNote && <p className={styles.note}>{text.translationNote}</p>}
            <p className={styles.updated}>{text.updated}</p>
            <p>{renderInline(doc.intro)}</p>

            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                {section.body.map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i}>{renderInline(block)}</p>
                  ) : (
                    <ul key={i}>
                      {block.list.map((item, j) => (
                        <li key={j}>{renderInline(item)}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}

            <p className={styles.other}>
              <LegalLink doc={shownId === 'privacy' ? 'terms' : 'privacy'} replace>
                {doc.otherLink}
              </LegalLink>
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
}

/** Renders the **bold** and [label](href) markup used in `src/data/legal.ts`. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = /^\[(.+?)\]\((.+?)\)$/.exec(part);
    if (!link) return part;
    const [, label, href = ''] = link;
    const doc = href.startsWith('#') && docFromHash(href);
    if (doc) {
      return (
        <LegalLink key={i} doc={doc} replace>
          {label}
        </LegalLink>
      );
    }
    if (href.startsWith('http')) {
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    // mailto: and tel: — keep numbers and addresses left-to-right inside Arabic text.
    return (
      <a key={i} href={href} dir="ltr">
        {label}
      </a>
    );
  });
}
