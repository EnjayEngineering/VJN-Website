import { useLocale } from '@/i18n';
import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/PageHero';

export default function NotFoundPage() {
  const { t } = useLocale();
  const page = t.pages.notFound;
  return (
    <>
      <Seo title={page.metaTitle} description={page.description} noindex />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        lead={page.heroLead}
        crumbs={[{ label: page.crumb }]}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
          <Button to="/" arrow>
            {page.home}
          </Button>
          <Button to="/services" variant="outline">
            {page.browse}
          </Button>
        </div>
      </PageHero>
    </>
  );
}
