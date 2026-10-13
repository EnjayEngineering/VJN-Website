import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/app/router';
import { initAnalytics } from '@/lib/analytics';
import '@/styles/global.css';

initAnalytics();

const router = createBrowserRouter(routes);

function render() {
  // The prerendered <head> tags are replaced by the ones React renders for each page.
  document.querySelectorAll('[data-prerender]').forEach((node) => node.remove());
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

// Wait for the current page's code so the prerendered HTML stays on screen until
// React can render the same page in its place.
if (router.state.initialized) {
  render();
} else {
  const unsubscribe = router.subscribe((state) => {
    if (!state.initialized) return;
    unsubscribe();
    render();
  });
}
