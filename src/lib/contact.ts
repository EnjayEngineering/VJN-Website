import { company } from '@/data/company';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export type SubmitResult = { ok: true; via: 'api' | 'email' } | { ok: false };

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

/**
 * Sends an enquiry. If `VITE_CONTACT_ENDPOINT` is configured the payload is
 * POSTed as JSON; otherwise the visitor's email client opens with a
 * pre-filled message so no enquiry is ever lost. The email is always in
 * English so the sales inbox reads consistently, whatever the site language.
 */
export async function submitEnquiry(data: ContactPayload): Promise<SubmitResult> {
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return { ok: true, via: 'api' };
    } catch {
      return { ok: false };
    }
  }

  const subject = `Enquiry: ${data.service || 'General'} from ${data.name}`;
  const body = [
    data.message,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.service && `Service: ${data.service}`,
  ]
    .filter((line): line is string => typeof line === 'string')
    .join('\n');
  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, via: 'email' };
}

export interface ApplicationPayload {
  name: string;
  email: string;
  phone: string;
  trade: string;
  experience: string;
  message: string;
}

/**
 * Sends a job application from the Careers page, the same way as an enquiry:
 * POSTed to `VITE_CONTACT_ENDPOINT` when set (tagged `type: 'application'`),
 * otherwise as a pre-filled email the applicant can attach their CV to.
 */
export async function submitApplication(data: ApplicationPayload): Promise<SubmitResult> {
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ type: 'application', ...data }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return { ok: true, via: 'api' };
    } catch {
      return { ok: false };
    }
  }

  const subject = `Job application: ${data.trade || 'General'} from ${data.name}`;
  const body = [
    data.message,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Trade: ${data.trade || 'General application'}`,
    `Experience: ${data.experience}`,
    '',
    '(CV attached)',
  ].join('\n');
  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, via: 'email' };
}
