# VJN Technical Services — Website

Marketing website for **VJN Technical Services LLC**, Dubai: MEP, maintenance and interior finishing works across the ten activities on the company's trade licence. Bilingual (English and Arabic), built with React 19, TypeScript, Vite and React Router, and prerendered to static HTML.

## Before going live

Some details still come from the previous company website and must be replaced with VJN's own:

- [ ] **Phone, email and map** in `src/data/company.ts` (also used by the contact and careers forms)
- [ ] **Domain** (`siteUrl`) in `src/data/company.ts` and `public/robots.txt`
- [ ] **Google Analytics ID** (`analyticsId`) in `src/data/company.ts`
- [ ] **Privacy policy** in `src/data/legal.ts`: add the careers form (job applications and CVs)
- [ ] Optional: a separate careers/HR email for job applications (`src/lib/contact.ts`)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload                                                      |
| `npm run build`     | Type-check, build and prerender every page to `dist/`                                     |
| `npm run preview`   | Serve the production build locally                                                        |
| `npm run lint`      | Lint with ESLint                                                                          |
| `npm run typecheck` | Type-check without building                                                               |
| `npm run format`    | Format source files with Prettier                                                         |
| `npm run images`    | Regenerate the WebP photos from the originals (needs the local `_legacy/` folder)         |
| `npm run icons`     | Regenerate the social preview card (`og-image.jpg`) and PNG app icons in `public/`        |

## Pages

| Page     | English path              | Arabic path                  |
| -------- | ------------------------- | ---------------------------- |
| Home     | `/`                       | `/ar`                        |
| Services | `/services`               | `/ar/services`               |
| Service  | `/services/<slug>` (×10)  | `/ar/services/<slug>`        |
| Sectors  | `/sectors`                | `/ar/sectors`                |
| About    | `/about`                  | `/ar/about`                  |
| Careers  | `/careers`                | `/ar/careers`                |
| Contact  | `/contact`                | `/ar/contact`                |

The ten services follow the activities on the VJN trade licence, in the same order. Each one shows its exact licence wording (`licence` in the dictionaries) alongside a shorter, readable title.

## Project structure

```
├── public/                  Static files copied as-is (logo, icons, social card, robots, hosting config)
│   └── brand/vjn-logo.png   The VJN emblem
├── scripts/
│   ├── optimize-images.mjs  PNG → cropped, responsive WebP (640 / 1024 px)
│   ├── make-icons.mjs       Social preview card + PNG app icons
│   └── prerender.mjs        Static HTML per page + sitemap.xml (runs in `npm run build`)
├── src/
│   ├── app/router.tsx       Route table (inner pages are lazy-loaded)
│   ├── assets/images/       Optimised photography
│   ├── components/
│   │   ├── brand/           LogoMark (the emblem)
│   │   ├── layout/          Header, Footer, Logo, Layout shell
│   │   ├── legal/           Cookie banner, privacy/terms pop-up
│   │   ├── ui/              Primitives (Button, Container, Reveal, Photo, Seo…)
│   │   ├── PageHero.tsx     Inner-page header: text, breadcrumbs and a framed photo
│   │   └── ServiceCard.tsx
│   ├── data/                Structure that doesn't change between languages
│   │   ├── company.ts       Phone, email, map, domain, analytics ID, navigation
│   │   ├── services.ts      The 10 services (slug, icon, photo, category, sectors)
│   │   ├── sectors.ts       Residential / Commercial / Industrial
│   │   └── legal.ts         Privacy policy and terms (English and Arabic)
│   ├── i18n/                ← All wording lives here
│   │   ├── en.ts            English
│   │   └── ar.ts            Arabic (same shape as en.ts)
│   ├── hooks/               useInView, useScrolled, useTheme…
│   ├── lib/                 Helpers (images, form submission, analytics, structured data)
│   ├── pages/               One file per route
│   ├── sections/            Home-page sections (Hero, Disciplines, Activities, About,
│   │                        Sectors, Process, CTA, Contact)
│   ├── styles/global.css    Design tokens + base styles
│   └── main.tsx
└── _legacy/                 Original photos and old site (local only, not committed)
```

### Editing content

All wording is in `src/i18n/en.ts` (English) and `src/i18n/ar.ts` (Arabic). Both must have the same shape, so TypeScript reports a missing Arabic translation as an error. In headlines, words wrapped in `*asterisks*` are shown in orange.

To add a service:
1. Add its structure (slug, icon, image, category, sectors) to `src/data/services.ts`.
2. Add its text under `serviceItems` in **both** `en.ts` and `ar.ts`.

It then appears on the home page, the services page, the footer, the contact and careers forms, and its own `/services/<slug>` page.

**When adding a page:** add its route in `src/app/router.tsx`, its path to `basePaths` in `src/entry-server.tsx`, and its module to `pageModule` in `scripts/prerender.mjs`. To show it in the menu, add it to `navLinks` in `src/data/company.ts` and its label under `nav` in both dictionaries.

### Photos

Source photos are the PNGs in `_legacy/rnstechservice.com/images/new/` (kept locally). `npm run images` crops each one slightly (about a 14% zoom), which removes the watermark in the bottom-right corner, and writes 640 px and 1024 px WebP files to `src/assets/images/`. Use a photo anywhere with `<Photo name="service-hvac" alt="…" />`.

### Languages and themes

- **English / Arabic:** the "ع" / "EN" button in the header switches language. Arabic pages live under `/ar` and switch the whole layout to right-to-left (`<html dir="rtl">`). Styles use logical properties (`inset-inline-start`, `padding-inline-end`) so they mirror automatically.
- **Light / dark:** the moon/sun button switches theme. The site always opens in the **light** theme; a visitor's own choice is saved in their browser. Colours are CSS variables, overridden under `:root[data-theme='dark']` in `src/styles/global.css`.
- A small script in `index.html` applies the language direction and saved theme before the page draws, so there's no flash.

### Styling

Styles use **CSS Modules** (`*.module.css` next to each component), with shared design tokens (colours, type scale, spacing, radii) as CSS variables in `src/styles/global.css`.

- **Fonts:** Instrument Sans for all English text. Arabic uses Noto Kufi Arabic for headings and IBM Plex Sans Arabic for body text.
- **Colours** come from the emblem: deep green (`--green`) as the main colour, orange (`--accent`) for highlights, magenta (`--magenta`) used sparingly.

## Brand

The logo is the VJN emblem, taken from a company quotation document. The file is `public/brand/vjn-logo.png` (background removed); `src/components/brand/LogoMark.tsx` renders it, and `src/components/layout/Logo.tsx` sets "VJN" and the legal name beside it. The source image is small (168×109 px), so a vector or high-resolution version of the logo would improve it on large screens and the social card.

## Forms

The site has two forms:

- **Contact** (`src/sections/Contact.tsx`): name, email, phone, service and message.
- **Careers** (`src/pages/CareersPage.tsx`): name, phone, email, years of experience, trade and an optional note. Clicking a trade card on the page selects it in the form.

By default, both open the visitor's email app with a pre-filled message to the address in `src/data/company.ts`. Job applicants are reminded to attach their CV, since an email link can't attach files.

To receive submissions directly instead, create a form endpoint (e.g. [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)) and set it in a `.env` file:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Both forms then POST JSON to it and show an inline success message. Job applications are sent with `type: "application"` so they can be told apart. The logic is in `src/lib/contact.ts`.

## Privacy and terms

The Privacy Policy and Terms & Conditions open as a pop-up over any page when the URL ends in `#privacy` or `#terms`. Links are in the footer and under each form.

- All their text, in English and Arabic, is in `src/data/legal.ts`. The Arabic version says the English one prevails.
- The pop-up is `src/components/legal/LegalSheet.tsx`; `LegalLink` opens it.
- The policy describes what the site does: forms that open the visitor's email app, browser `localStorage` settings (`vjn-theme`, `vjn-consent`), session-storage scroll positions, Google Analytics with consent and the embedded Google map. **If you add a form endpoint, cookies or any other outside service, update the policy first** and change its "Last updated" date.

## Analytics

Google Analytics 4 (measurement ID `analyticsId` in `src/data/company.ts`) loads only after a visitor presses **Accept** on the cookie banner (`src/components/legal/CookieBanner.tsx`). Declining, or never answering, means the Google script is never requested. "Cookie settings" in the footer reopens the banner; declining there stops tracking and deletes the `_ga` cookies. The logic is in `src/lib/analytics.ts`.

- Only production builds load it, so `npm run dev` never shows up in the reports.
- Keep **Page changes based on browser history events** switched on in GA (Admin > Data streams > the web stream > Enhanced measurement) so in-app navigation is counted.
- The privacy policy says statistics are kept for at most 14 months. Set Admin > Data collection and modification > Data retention to 14 months (or less).

## SEO

`npm run build` prerenders every page in both languages (`scripts/prerender.mjs` using `src/entry-server.tsx`), so search engines and link previews get real HTML without running JavaScript. Each page gets:

- Its own `<title>`, description, canonical URL, `hreflang` links between English and Arabic, and Open Graph and Twitter tags, set with `<Seo>` in the page component.
- schema.org structured data: the business and its services on the home page, a `Service` on each service page, and breadcrumbs on every inner page (`src/lib/structuredData.ts`).

The build also writes `dist/sitemap.xml` (listed in `robots.txt`) and `dist/404.html`.

**After the site goes live:** add the domain in [Google Search Console](https://search.google.com/search-console), submit `https://<your-domain>/sitemap.xml`, and request indexing for the home page. Set up a [Google Business Profile](https://business.google.com) with the same name, address and phone as the site; that is what puts the company on Google Maps and in local results.

## Deployment

Run `npm run build` and upload the contents of `dist/`. Each page is its own HTML file (`about.html`, `services/hvac.html`, `ar/careers.html`…), served at its clean URL, and unknown URLs get `404.html` with a 404 status. Config is included for:

- **Apache / cPanel:** `public/.htaccess`. Uncomment the HTTPS / non-www redirect once SSL is installed.
- **Vercel:** `vercel.json`
