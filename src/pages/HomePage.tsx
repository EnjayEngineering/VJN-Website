import { useLocale, useServices } from '@/i18n';
import { businessSchema } from '@/lib/structuredData';
import { Seo } from '@/components/ui/Seo';
import { Hero } from '@/sections/Hero';
import { Activities } from '@/sections/Activities';
import { Disciplines } from '@/sections/Disciplines';
import { About } from '@/sections/About';
import { Sectors } from '@/sections/Sectors';
import { Process } from '@/sections/Process';
import { CtaBand } from '@/sections/CtaBand';
import { Contact } from '@/sections/Contact';

export default function HomePage() {
  const { t, locale } = useLocale();
  const services = useServices();
  return (
    <>
      <Seo description={t.meta.homeDescription} schema={businessSchema(t, services, locale)} />
      <Hero />
      <Disciplines />
      <Activities />
      <About />
      <Sectors />
      <Process />
      <CtaBand />
      <Contact />
    </>
  );
}
