import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom';
import { useLocale } from '@/i18n';

// Internal links take English paths ('/services'); on Arabic pages they point to the
// Arabic twin ('/ar/services'), so visitors and crawlers stay in one language.

export function LocaleLink({ to, ...rest }: Omit<LinkProps, 'to'> & { to: string }) {
  const { localePath } = useLocale();
  return <Link to={localePath(to)} {...rest} />;
}

export function LocaleNavLink({ to, ...rest }: Omit<NavLinkProps, 'to'> & { to: string }) {
  const { localePath } = useLocale();
  // The home link must only be "active" on the home page itself.
  return <NavLink to={localePath(to)} end={to === '/'} {...rest} />;
}
