import { useLocale } from '@/i18n';
import { Seo } from '@/components/ui/Seo';
import { PageHero } from '@/components/PageHero';
import { Services } from '@/sections/Services';
import { Process } from '@/sections/Process';
import { CtaBand } from '@/sections/CtaBand';

export default function ServicesPage() {
  const { t } = useLocale();
  const page = t.pages.services;
  return (
    <>
      <Seo title={page.metaTitle} description={page.description} />
      <PageHero
        eyebrow={page.title}
        title={page.heroTitle}
        lead={page.heroLead}
        crumbs={[{ label: page.title }]}
        image="service-tiling"
      />
      <Services filterable showHeader={false} />
      <Process />
      <CtaBand />
    </>
  );
}
