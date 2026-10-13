import { useSyncExternalStore } from 'react';
import { company } from '@/data/company';

/**
 * Google Analytics, loaded only after the visitor accepts the cookie banner
 * (`CookieBanner`). Their answer is kept in localStorage under `vjn-consent`.
 * Page views for in-app navigation come from GA's enhanced measurement
 * ("page changes based on browser history events"), so none are sent by hand.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [disable: `ga-disable-${string}`]: boolean | undefined;
  }
}

/** `ask` shows the banner. */
export type ConsentState = 'granted' | 'denied' | 'ask';

const STORAGE_KEY = 'vjn-consent';
const id = company.analyticsId;
const listeners = new Set<() => void>();
let state: ConsentState | undefined;

function stored(): ConsentState {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'granted' || value === 'denied') return value;
  } catch {
    // Storage unavailable; ask on every visit.
  }
  return 'ask';
}

const getSnapshot = (): ConsentState => (state ??= stored());

function setState(next: ConsentState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useConsent(): ConsentState {
  // Prerendered pages never include the banner; the browser decides once the page loads.
  return useSyncExternalStore(subscribe, getSnapshot, () => 'denied');
}

/** Records the visitor's answer and starts or stops Google Analytics. */
export function setConsent(choice: 'granted' | 'denied') {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage unavailable; the choice lasts for this visit only.
  }
  setState(choice);
  if (choice === 'granted') startAnalytics();
  else stopAnalytics();
}

/** Shows the banner again (footer "Cookie settings"); the current choice holds until they answer. */
export function reviewConsent() {
  setState('ask');
}

/** Starts Google Analytics on page load if the visitor accepted on an earlier visit. */
export function initAnalytics() {
  if (getSnapshot() === 'granted') startAnalytics();
}

function startAnalytics() {
  // Only the live site is measured, so local development doesn't show up in the reports.
  if (!import.meta.env.PROD) return;
  window[`ga-disable-${id}`] = false;
  if (window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  window.dataLayer ??= [];
  window.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Advertising features are not used.
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', id);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.append(script);
}

function stopAnalytics() {
  window[`ga-disable-${id}`] = true;
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  // Delete the _ga cookies, which GA sets on the bare domain (e.g. .rnstechservice.com).
  const host = location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]!.trim();
    if (!name.startsWith('_ga')) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain && `; domain=${domain}`}`;
    }
  }
}
