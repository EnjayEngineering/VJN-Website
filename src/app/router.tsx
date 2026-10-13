import type { ComponentType } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';

// Home is bundled eagerly for the fastest first paint; inner pages load on demand.
// Route-level `lazy` (rather than React.lazy) lets the router finish loading a page
// before it renders, so the prerendered HTML is never swapped for a blank fallback.
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

const pages: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: 'services', lazy: page(() => import('@/pages/ServicesPage')) },
  { path: 'services/:slug', lazy: page(() => import('@/pages/ServiceDetailPage')) },
  { path: 'sectors', lazy: page(() => import('@/pages/SectorsPage')) },
  { path: 'about', lazy: page(() => import('@/pages/AboutPage')) },
  { path: 'careers', lazy: page(() => import('@/pages/CareersPage')) },
  { path: 'contact', lazy: page(() => import('@/pages/ContactPage')) },
  { path: '*', lazy: page(() => import('@/pages/NotFoundPage')) },
];

/**
 * Every page exists in English at the root and in Arabic under /ar.
 * Shared by the browser router (`main.tsx`) and the build-time prerenderer.
 */
export const routes: RouteObject[] = [
  { path: 'ar', element: <Layout locale="ar" />, children: pages },
  { element: <Layout locale="en" />, children: pages },
];
