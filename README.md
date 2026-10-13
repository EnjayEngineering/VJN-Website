# VJN Technical Services — Website

Marketing website for **VJN Technical Services LLC**, Dubai. Built with React 19, TypeScript, Vite and React Router.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload                 |
| `npm run build`     | Type-check, build and prerender every page to `dist/` |
| `npm run preview`   | Serve the production build locally                   |
| `npm run lint`      | Lint with ESLint                                     |
| `npm run typecheck` | Type-check without building                          |
| `npm run format`    | Format source files with Prettier                    |
| `npm run images`    | Regenerate optimised WebP photos from the originals (needs the local `_legacy/` folder) |
| `npm run icons`     | Regenerate the social preview card (`og-image.jpg`) and PNG app icons in `public/` |

## Project structure

```
├── public/                  Static files copied as-is (favicon, icons, social card, robots, hosting config)
├── scripts/
│   ├── optimize-images.mjs  PNG → responsive WebP (640 / 1024 px)
│   ├── make-icons.mjs       Social preview card + PNG app icons
│   └── prerender.mjs        Static HTML per page + sitemap.xml (runs in `npm run build`)
├── src/
│   ├── app/router.tsx       Route table (inner pages are lazy-loaded)
│   ├── assets/images/       Optimised photography
│   ├── components/
│   │   ├── layout/          Header, Footer, Logo, Layout shell
│   │   ├── ui/              Design-system primitives (Button, Container, Reveal, Photo, Seo…)
│   │   ├── PageHero.tsx     Inner-page banner with breadcrumbs
│   │   └── ServiceCard.tsx
│   ├── data/                ← All site content lives here
│   │   ├── company.ts       Name, phone, email, address, hours, nav, process
│   │   ├── services.ts      The 10 services (title, summary, scope, sectors)
│   │   └── sectors.ts       Residential / Commercial / Industrial
│   ├── hooks/               useInView, useScrolled
│   ├── lib/                 Helpers (images, contact form submission, cx)
│   ├── pages/               One file per route
│   ├── sections/            Page sections (Hero, About, Services, Sectors, Process, CTA, Contact)
│   ├── styles/global.css    Design tokens + base styles
│   └── main.tsx
└── _legacy/                 The original site (local only, not committed)
```

### Editing content

All wording lives in two dictionaries: `src/i18n/en.ts` (English) and `src/i18n/ar.ts` (Arabic). Both must have the same shape, so TypeScript reports a missing Arabic translation as an error. Phone, email and map links are in `src/data/company.ts`.

To add a service:
1. Add its structure (slug, icon, image, sectors) to `src/data/services.ts`.
2. Add its text under `serviceItems` in **both** `en.ts` and `ar.ts`.

It then appears on the home page, the services page, the footer, the contact form and its own `/services/<slug>` page.

### Languages and themes

- **English / Arabic:** the "ع" / "EN" button in the header switches language. Arabic switches the whole layout to right-to-left (`<html dir="rtl">`) and uses IBM Plex Sans Arabic. Styles use logical properties (`inset-inline-start`, `padding-inline-end`) so they mirror automatically.
- **Light / dark:** the sun/moon button switches theme. Colours are CSS variables, overridden under `:root[data-theme='dark']` in `src/styles/global.css`.
- Both choices are saved in the visitor's browser. A small script in `index.html` applies them before the page draws, so there's no flash. With no saved choice, the theme follows the device setting.

### Styling

Styles use **CSS Modules** (`*.module.css` next to each component), with shared design tokens (colours, type scale, spacing, radii) defined as CSS variables in `src/styles/global.css`.

## Brand

The logo is the VJN emblem, taken from the company quotation file. The file is `public/brand/vjn-logo.png` (the background is removed), and `src/components/brand/LogoMark.tsx` renders it. The wordmark "VJN" is set in the display font, in `src/components/layout/Logo.tsx`. Colours are the `--green`, `--accent` and `--magenta` tokens in `src/styles/global.css`.

## Contact form

By default, submitting the form opens the visitor's email client with a pre-filled message to `sales.rnstech@gmail.com`.

To receive submissions directly, create a form endpoint (e.g. [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)) and set it in a `.env` file:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

The form then POSTs JSON (`name, email, phone, service, message`) and shows an inline success message.

## Privacy and terms

The Privacy Policy and Terms & Conditions open as a pop-up sheet over any page when the URL ends in `#privacy` or `#terms` (e.g. `https://rnstechservice.com/#terms` can be shared). Links are in the footer and under the enquiry form.

- All their text, in English and Arabic, is in `src/data/legal.ts`. The Arabic version says the English one prevails.
- The pop-up is `src/components/legal/LegalSheet.tsx`; `LegalLink` opens it.
- The privacy policy describes what the site does today: the form only opens the visitor's email app, three `localStorage` settings (`vjn-locale`, `vjn-theme`, `vjn-consent`), session-storage scroll positions, Google Analytics with consent, the embedded Google map and a Gmail inbox. **If you add a form endpoint, cookies or any other outside service, update the policy first** and change its "Last updated" date.

## Analytics

Google Analytics 4 (measurement ID `analyticsId` in `src/data/company.ts`) loads only after a visitor presses **Accept** on the cookie banner (`src/components/legal/CookieBanner.tsx`). Declining, or never answering, means the Google script is never requested. "Cookie settings" in the footer reopens the banner; declining there stops tracking and deletes the `_ga` cookies. The logic is in `src/lib/analytics.ts`.

- Only production builds load it, so `npm run dev` never shows up in the reports.
- Page views for in-app navigation come from GA's enhanced measurement. Keep **Page changes based on browser history events** switched on (Admin > Data streams > the web stream > Enhanced measurement).
- The privacy policy says statistics are kept for at most 14 months. In GA, set Admin > Data collection and modification > Data retention to 14 months (or less).

## SEO

`npm run build` prerenders every page (`scripts/prerender.mjs` using `src/entry-server.tsx`), so search engines and link previews get real HTML without running JavaScript. Each page gets:

- Its own `<title>`, description, canonical URL, Open Graph and Twitter tags, set with `<Seo>` in the page component.
- schema.org structured data: the business and its services on the home page, a `Service` on each service page, and breadcrumbs on every inner page (`src/lib/structuredData.ts`).

The build also writes `dist/sitemap.xml` (listed in `robots.txt`) and `dist/404.html`. Pages are prerendered in English; Arabic is a client-side switch on the same URLs.

The production domain is `siteUrl` in `src/data/company.ts`. If it changes, update it there and in `public/robots.txt`.

**When adding a page:** add its route in `src/app/router.tsx`, its path to `paths` in `src/entry-server.tsx`, and its module to `pageModule` in `scripts/prerender.mjs`.

**After the site goes live:** add the domain in [Google Search Console](https://search.google.com/search-console), submit `https://rnstechservice.com/sitemap.xml`, and request indexing for the home page. Set up a [Google Business Profile](https://business.google.com) with the same name, address and phone as the site. That is what puts the company on Google Maps and in local results.

## Deployment

Run `npm run build` and upload the contents of `dist/`. Each page is its own HTML file (`about.html`, `services/hvac.html`…), served at its clean URL, and unknown URLs get `404.html` with a 404 status. Config is included for the common hosts:

- **Apache / cPanel:** `public/.htaccess`. Uncomment the HTTPS / non-www redirect once SSL is installed.
- **Netlify:** works as-is (`public/_redirects` documents why there's no rewrite rule).
- **Vercel:** `vercel.json`
