import type { LucideIcon } from 'lucide-react';
import {
  AirVent,
  Cog,
  Droplets,
  PlugZap,
  Grid3x3,
  Hammer,
  Sparkles,
  Wallpaper,
  LayoutPanelTop,
  PaintRoller,
} from 'lucide-react';
import type { Dictionary } from '@/i18n/en';

/** Structural data for each service; the text lives in `src/i18n`. */
export type ServiceSlug = keyof Dictionary['serviceItems'];
export type SectorId = keyof Dictionary['sectorItems'];

export interface Service {
  slug: ServiceSlug;
  category: 'MEP' | 'Finishing';
  icon: LucideIcon;
  image: string;
  sectors: SectorId[];
}

/** In the same order as the activities on the VJN trade licence. */
export const services: Service[] = [
  {
    slug: 'hvac',
    category: 'MEP',
    icon: AirVent,
    image: 'service-hvac',
    sectors: ['residential', 'commercial', 'industrial'],
  },
  {
    slug: 'electromechanical',
    category: 'MEP',
    icon: Cog,
    image: 'service-electromechanical',
    sectors: ['commercial', 'industrial'],
  },
  {
    slug: 'plumbing',
    category: 'MEP',
    icon: Droplets,
    image: 'service-plumbing',
    sectors: ['residential', 'commercial', 'industrial'],
  },
  {
    slug: 'tiling',
    category: 'Finishing',
    icon: Grid3x3,
    image: 'service-tiling',
    sectors: ['residential', 'commercial', 'industrial'],
  },
  {
    slug: 'carpentry',
    category: 'Finishing',
    icon: Hammer,
    image: 'service-carpentry',
    sectors: ['residential', 'commercial'],
  },
  {
    slug: 'ornamentation',
    category: 'Finishing',
    icon: Sparkles,
    image: 'service-ornamentation',
    sectors: ['residential', 'commercial'],
  },
  {
    slug: 'wallpaper',
    category: 'Finishing',
    icon: Wallpaper,
    image: 'service-wallpaper',
    sectors: ['residential', 'commercial'],
  },
  {
    slug: 'false-ceiling',
    category: 'Finishing',
    icon: LayoutPanelTop,
    image: 'service-false-ceiling',
    sectors: ['residential', 'commercial', 'industrial'],
  },
  {
    slug: 'electrical',
    category: 'MEP',
    icon: PlugZap,
    image: 'service-electrical',
    sectors: ['residential', 'commercial', 'industrial'],
  },
  {
    slug: 'plastering',
    category: 'Finishing',
    icon: PaintRoller,
    image: 'service-plastering',
    sectors: ['residential', 'commercial', 'industrial'],
  },
];
