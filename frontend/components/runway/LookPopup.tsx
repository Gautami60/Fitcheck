"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Bookmark, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RunwayLook } from '../../types/runway';
import { isLookSaved, saveLook, addToStylingBag } from '../../utils/savedLooks';

interface LookPopupProps {
  look: RunwayLook | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LookPopup({ look, isOpen, onClose }: LookPopupProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (look) {
      setSaved(isLookSaved(look.id));
    }
  }, [look]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!look) return null;

  const handleSave = () => {
    saveLook({
      id: look.id,
      lookId: look.id,
      name: look.name,
      image: look.image,
      category: look.outfitCategory,
      type: 'runway',
      score: look.suitabilityInsights.score,
    });
    setSaved(true);
  };

  const handleAnalyze = () => {
    sessionStorage.setItem(
      'selectedRunwayLook',
      JSON.stringify({
        id: look.id,
        name: look.name,
        image: look.image,
        category: look.outfitCategory,
      })
    );
    onClose();
    router.push('/upload');
  };

  const handleAddGarmentToBag = (garment: RunwayLook['garmentMetadata'][0]) => {
    const size = selectedSizes[garment.id] || garment.defaultSize || garment.sizes[0];
    addToStylingBag({
      garmentId: garment.id,
      lookId: look.id,
      lookName: look.name,
      name: garment.name,
      category: garment.category,
      color: garment.color,
      size,
      image: garment.thumbnail,
      fabric: garment.fabric,
    });

    setAddedItemIds((prev) => ({ ...prev, [garment.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [garment.id]: false }));
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-white border border-[#C8C8C8] shadow-2xl flex flex-col md:flex-row overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close look preview"
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/95 border border-[#C8C8C8] flex items-center justify-center text-[#151413] hover:bg-[#151413] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Full-Bleed Editorial Fashion Image with Hotspots */}
            <div className="md:w-1/2 relative bg-[#F7F7F6] overflow-hidden min-h-[350px] md:min-h-full">
              <img
                src={look.image}
                alt={look.name}
                className="w-full h-full object-cover object-top"
              />

              {/* Hotspot Pins Overlay on Image */}
              <div className="absolute inset-0 pointer-events-none">
                {look.garmentMetadata.map((garment) => (
                  <div
                    key={garment.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${garment.hotspot.x}%`,
                      top: `${garment.hotspot.y}%`,
                    }}
                  >
                    <span className="w-6 h-6 rounded-full bg-white/90 text-[#151413] border border-[#151413] text-[9px] font-mono font-bold flex items-center justify-center shadow-md">
                      {garment.pinNumber}
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 border border-[#C8C8C8]">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#151413]">
                  LOOK {look.number} &bull; {look.outfitCategory}
                </span>
              </div>
            </div>

            {/* Right: Detailed Fashion Intelligence & Garments */}
            <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[90vh]">
              <div className="space-y-6">
                
                {/* Header */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#66625C] mb-2 font-medium">
                    {look.subtitle}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#151413]">
                    {look.name}
                  </h2>
                </div>

                {/* Narrative Description */}
                <p className="text-xs text-[#66625C] font-light leading-relaxed">
                  {look.description}
                </p>

                {/* Dominant Palette Swatches */}
                <div className="pt-2 border-t border-[#DFDFDF]">
                  <span className="editorial-subheading text-[#151413] block mb-3">
                    Dominant Palette
                  </span>
                  <div className="flex gap-4">
                    {look.dominantColors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 border border-[#C8C8C8]"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs text-[#151413] font-light">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Garments Breakdown with Size Selectors */}
                <div className="pt-2 border-t border-[#DFDFDF] space-y-4">
                  <span className="editorial-subheading text-[#151413] block">
                    Garment Composition ({look.garmentMetadata.length} Pieces)
                  </span>

                  <div className="space-y-3">
                    {look.garmentMetadata.map((garment) => {
                      const activeSize = selectedSizes[garment.id] || garment.defaultSize || garment.sizes[0];
                      const isAdded = addedItemIds[garment.id];

                      return (
                        <div
                          key={garment.id}
                          className="p-3.5 border border-[#DFDFDF] bg-[#F7F7F6]/50 flex flex-col gap-2.5 text-left"
                        >
                          <div className="flex gap-3">
                            <div className="w-14 h-18 bg-white border border-[#DFDFDF] shrink-0 overflow-hidden">
                              <img
                                src={garment.thumbnail}
                                alt={garment.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="w-4 h-4 rounded-full bg-[#0E0E0E] text-white text-[9px] font-mono flex items-center justify-center font-bold">
                                  {garment.pinNumber}
                                </span>
                                <span className="text-[10px] uppercase tracking-wider text-[#66625C] font-semibold truncate">
                                  {garment.category} &bull; {garment.color}
                                </span>
                              </div>
                              <h4 className="text-xs font-medium text-[#151413] truncate">
                                {garment.name}
                              </h4>
                              <p className="text-[11px] text-[#66625C] font-light line-clamp-1 mt-0.5">
                                {garment.fabric}
                              </p>
                            </div>
                          </div>

                          {/* Size Selection & Quick Add Button */}
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#DFDFDF]">
                            <div className="flex items-center gap-1">
                              {garment.sizes.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setSelectedSizes((prev) => ({ ...prev, [garment.id]: s }))}
                                  className={`px-2 py-0.5 text-[10px] uppercase font-mono border ${
                                    activeSize === s
                                      ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
                                      : 'bg-white text-[#151413] border-[#C8C8C8] hover:border-[#151413]'
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddGarmentToBag(garment)}
                              className="px-3 py-1 bg-[#0E0E0E] text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-[#2A2927] transition-colors flex items-center gap-1.5"
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Added ({activeSize})</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Add To Bag</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Suitability Insight Box */}
                <div className="p-4 bg-[#F7F7F6] border border-[#C8C8C8] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold">
                      Compatibility Rating
                    </span>
                    <span className="text-xs font-semibold text-[#151413] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {look.suitabilityInsights.score}%
                    </span>
                  </div>
                  <p className="text-xs text-[#151413] font-light leading-relaxed">
                    {look.suitabilityInsights.harmony}
                  </p>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="pt-6 mt-6 border-t border-[#C8C8C8] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAnalyze}
                  className="flex-1 py-4 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2927] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Analyze This Look</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSave}
                  className={`px-5 py-4 border text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 ${
                    saved
                      ? 'border-[#0E0E0E] bg-[#0E0E0E] text-white'
                      : 'border-[#C8C8C8] text-[#151413] hover:border-[#151413]'
                  }`}
                >
                  {saved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Full Look</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
