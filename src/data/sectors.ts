import type { SectorId } from './services';

/** Structural data for each sector; the text lives in `src/i18n`. */
export interface Sector {
  id: SectorId;
  image: string;
}

export const sectors: Sector[] = [
  { id: 'residential', image: 'sector-residential' },
  { id: 'commercial', image: 'sector-commercial' },
  { id: 'industrial', image: 'sector-industrial' },
];
