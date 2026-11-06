export interface DominantColor {
  name: string;
  hex: string;
}

export interface HotspotCoordinates {
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
}

export interface GarmentItem {
  id: string;
  pinNumber: string; // e.g. "01", "02", "03"
  name: string;
  category: string;
  color: string;
  fabric: string;
  silhouette: string;
  thumbnail: string;
  description: string;
  stylingNotes: string;
  sizes: string[]; // e.g. ['XS', 'S', 'M', 'L', 'XL']
  defaultSize: string;
  styleTags: string[];
  hotspot: HotspotCoordinates;
}

export interface SuitabilityInsight {
  score: number;
  archetype: string;
  harmony: string;
  keyHighlights: string[];
}

export interface RunwayLook {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  outfitCategory: string;
  dominantColors: DominantColor[];
  styleTags: string[];
  occasionTags: string[];
  garmentMetadata: GarmentItem[];
  suitabilityInsights: SuitabilityInsight;
}

export interface SavedLookItem {
  id: string;
  lookId?: string;
  name: string;
  image: string;
  category: string;
  savedAt: string;
  type: 'runway' | 'analysis';
  score?: number;
}

export interface StylingBagItem {
  id: string;
  garmentId: string;
  lookId: string;
  lookName: string;
  name: string;
  category: string;
  color: string;
  size: string;
  image: string;
  fabric?: string;
  addedAt: string;
}
