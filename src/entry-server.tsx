// Build-time entry: renders one route to HTML for `scripts/prerender.mjs`.
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import { routes } from '@/app/router';
import { services } from '@/data/services';
import { localizePath } from '@/i18n';

export { company } from '@/data/company';
export { localeFromPath, localizePath, stripLocale } from '@/i18n';

/** Every public page (English path), in sitemap order. Each also exists under /ar. */
export const basePaths = [
  '/',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/sectors',
  '/about',
  '/careers',
  '/contact',
];

export const paths = [...basePaths, ...basePaths.map((p) => localizePath(p, 'ar'))];

/** Renders `path` and returns its HTML (head tags first, then the page markup). */
export async function render(path: string): Promise<string> {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`http://localhost${path}`));
  if (context instanceof Response) throw new Error(`Unexpected redirect while rendering ${path}`);
  const router = createStaticRouter(handler.dataRoutes, context);

  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  );
  return new Response(prelude).text();
}
