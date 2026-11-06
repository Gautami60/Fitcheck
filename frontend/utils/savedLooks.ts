import { SavedLookItem, StylingBagItem } from '../types/runway';

const SAVED_COLLECTION_KEY = 'fitcheck_saved_collection';
const STYLING_BAG_KEY = 'fitcheck_styling_bag';

/* ============================================================
   1. STYLING BAG ITEMS (Garments with Sizes)
   ============================================================ */
export function getStylingBag(): StylingBagItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STYLING_BAG_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse styling bag', e);
    return [];
  }
}

export function addToStylingBag(item: Omit<StylingBagItem, 'id' | 'addedAt'>): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getStylingBag();
    // Unique by garmentId + size
    const exists = current.some((b) => b.garmentId === item.garmentId && b.size === item.size);
    if (exists) return false;

    const newItem: StylingBagItem = {
      ...item,
      id: `bag-${item.garmentId}-${item.size}-${Date.now()}`,
      addedAt: new Date().toISOString(),
    };
    const updated = [newItem, ...current];
    localStorage.setItem(STYLING_BAG_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('fitcheck_styling_bag_updated'));
    window.dispatchEvent(new Event('fitcheck_saved_looks_updated'));
    return true;
  } catch (e) {
    console.error('Failed to add to styling bag', e);
    return false;
  }
}

export function removeFromStylingBag(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStylingBag();
    const updated = current.filter((b) => b.id !== id);
    localStorage.setItem(STYLING_BAG_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('fitcheck_styling_bag_updated'));
    window.dispatchEvent(new Event('fitcheck_saved_looks_updated'));
  } catch (e) {
    console.error('Failed to remove from styling bag', e);
  }
}

export function isInStylingBag(garmentId: string, size?: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getStylingBag();
  if (size) {
    return current.some((b) => b.garmentId === garmentId && b.size === size);
  }
  return current.some((b) => b.garmentId === garmentId);
}

export function getStylingBagCount(): number {
  return getStylingBag().length;
}

/* ============================================================
   2. SAVED RUNWAY LOOKS & ANALYSES
   ============================================================ */
export function getSavedLooks(): SavedLookItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_COLLECTION_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse saved looks', e);
    return [];
  }
}

export function saveLook(item: Omit<SavedLookItem, 'savedAt'>): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getSavedLooks();
    const exists = current.some((l) => l.id === item.id);
    if (exists) return false;

    const newItem: SavedLookItem = {
      ...item,
      savedAt: new Date().toISOString(),
    };
    const updated = [newItem, ...current];
    localStorage.setItem(SAVED_COLLECTION_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('fitcheck_saved_looks_updated'));
    return true;
  } catch (e) {
    console.error('Failed to save look', e);
    return false;
  }
}

export function removeSavedLook(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedLooks();
    const updated = current.filter((l) => l.id !== id);
    localStorage.setItem(SAVED_COLLECTION_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('fitcheck_saved_looks_updated'));
  } catch (e) {
    console.error('Failed to remove saved look', e);
  }
}

export function isLookSaved(id: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getSavedLooks();
  return current.some((l) => l.id === id);
}

export function getTotalStylingBagCount(): number {
  return getStylingBag().length + getSavedLooks().length;
}
