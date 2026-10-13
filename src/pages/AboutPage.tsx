import { useLocale } from '@/i18n';
import { Seo } from '@/components/ui/Seo';
import { PageHero } from '@/components/PageHero';
import { About } from '@/sections/About';
import { Sectors } from '@/sections/Sectors';
import { Process } from '@/sections/Process';
import { CtaBand } from '@/sections/CtaBand';

export default function AboutPage() {
  const { t } = useLocale();
  const page = t.pages.about;
  return (
    <>
      <Seo title={page.metaTitle} description={page.description} />
      <PageHero
        eyebrow={page.title}
        title={page.heroTitle}
        lead={page.heroLead}
        crumbs={[{ label: t.nav.about }]}
        image="service-electromechanical"
      />
      <About showLink={false} />
      <Process />
      <Sectors />
      <div style={{ paddingTop: 'var(--section-y)' }}>
        <CtaBand />
      </div>
    </>
  );
}
