import { useLocale } from '@/i18n';
import { Seo } from '@/components/ui/Seo';
import { PageHero } from '@/components/PageHero';
import { Contact } from '@/sections/Contact';

export default function ContactPage() {
  const { t } = useLocale();
  const page = t.pages.contact;
  return (
    <>
      <Seo title={page.metaTitle} description={page.description} />
      <PageHero
        eyebrow={page.title}
        title={page.heroTitle}
        lead={page.heroLead}
        crumbs={[{ label: page.title }]}
        image="sector-commercial"
      />
      <Contact showHeader={false} />
    </>
  );
}
