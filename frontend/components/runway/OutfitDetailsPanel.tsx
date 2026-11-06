"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Bookmark, Check, Sparkles, Sliders, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RunwayLook, GarmentItem } from '../../types/runway';
import { isLookSaved, saveLook, addToStylingBag, isInStylingBag } from '../../utils/savedLooks';

interface OutfitDetailsPanelProps {
  look: RunwayLook;
  selectedGarmentId: string;
  onSelectGarment: (garmentId: string) => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function OutfitDetailsPanel({
  look,
  selectedGarmentId,
  onSelectGarment,
  onHoverStart,
  onHoverEnd,
}: OutfitDetailsPanelProps) {
  const router = useRouter();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [justAddedGarmentId, setJustAddedGarmentId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isLookSaved(look.id));
  }, [look]);

  // Current selected garment
  const selectedGarment: GarmentItem =
    look.garmentMetadata.find((g) => g.id === selectedGarmentId) ||
    look.garmentMetadata[0];

  const currentSize =
    selectedSizes[selectedGarment.id] ||
    selectedGarment.defaultSize ||
    selectedGarment.sizes[0] ||
    'M';

  const handleSizeSelect = (size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [selectedGarment.id]: size,
    }));
  };

  const handleAddToBag = () => {
    const success = addToStylingBag({
      garmentId: selectedGarment.id,
      lookId: look.id,
      lookName: look.name,
      name: selectedGarment.name,
      category: selectedGarment.category,
      color: selectedGarment.color,
      size: currentSize,
      image: selectedGarment.thumbnail,
      fabric: selectedGarment.fabric,
    });

    if (success || true) {
      setJustAddedGarmentId(selectedGarment.id);
      setTimeout(() => setJustAddedGarmentId(null), 2500);
    }
  };

  const handleSaveEntireLook = () => {
    saveLook({
      id: look.id,
      lookId: look.id,
      name: look.name,
      image: look.image,
      category: look.outfitCategory,
      type: 'runway',
      score: look.suitabilityInsights.score,
    });
    setIsSaved(true);
  };

  const handleAnalyzeThisLook = () => {
    sessionStorage.setItem(
      'selectedRunwayLook',
      JSON.stringify({
        id: look.id,
        name: look.name,
        image: look.image,
        category: look.outfitCategory,
        garmentCount: look.garmentMetadata.length,
      })
    );
    router.push('/upload');
  };

  const alreadyInBag = isInStylingBag(selectedGarment.id, currentSize);

  return (
    <aside
      className="w-full lg:w-[410px] xl:w-[460px] shrink-0 bg-white border-t lg:border-t-0 lg:border-l border-[#C8C8C8] flex flex-col justify-between overflow-y-auto"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="p-6 md:p-8 space-y-8">
        
        {/* Look Headline Banner */}
        <div className="border-b border-[#DFDFDF] pb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="editorial-subheading text-[#66625C]">
              Look {look.number} &bull; {look.outfitCategory}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F7F6] border border-[#DFDFDF] text-[10px] font-semibold text-[#151413] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#0E0E0E]" />
              {look.suitabilityInsights.score}% Synergy
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[#151413] mb-2">
            {look.name}
          </h2>
          <p className="text-xs text-[#66625C] font-light leading-relaxed">
            {look.description}
          </p>
        </div>

        {/* SELECTED PRODUCT & STYLING SPOTLIGHT */}
        <div className="border border-[#151413] p-5 bg-[#FBFBFA] space-y-5">
          <div className="flex items-center justify-between border-b border-[#DFDFDF] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#0E0E0E] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                {selectedGarment.pinNumber}
              </span>
              <span className="editorial-subheading text-[#151413] font-semibold">
                Product &bull; {selectedGarment.category}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-mono">
              HOTSPOT ACTIVE
            </span>
          </div>

          {/* Garment Details & Thumbnail */}
          <div className="flex gap-4 items-start">
            <div className="w-20 h-26 bg-white border border-[#DFDFDF] overflow-hidden shrink-0">
              <img
                src={selectedGarment.thumbnail}
                alt={selectedGarment.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="text-sm font-medium text-[#151413] leading-snug">
                {selectedGarment.name}
              </h3>
              <p className="text-[11px] text-[#66625C] font-light">
                Color: <span className="text-[#151413] font-medium">{selectedGarment.color}</span>
              </p>
              <p className="text-[11px] text-[#66625C] font-light">
                Silhouette: <span className="text-[#151413]">{selectedGarment.silhouette}</span>
              </p>
              <p className="text-[11px] text-[#66625C] font-light line-clamp-2 pt-0.5">
                Fabric: {selectedGarment.fabric}
              </p>
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div className="space-y-2 pt-2 border-t border-[#DFDFDF]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold">
                Select Size
              </span>
              <span className="text-[10px] text-[#66625C]">
                Active: <span className="font-semibold text-[#151413]">{currentSize}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Available sizes">
              {selectedGarment.sizes.map((size) => {
                const isSelected = size === currentSize;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeSelect(size)}
                    className={`min-w-10 h-9 px-3 text-xs uppercase font-medium tracking-wider border transition-all ${
                      isSelected
                        ? 'bg-[#0E0E0E] text-white border-[#0E0E0E] shadow-sm'
                        : 'bg-white text-[#151413] border-[#C8C8C8] hover:border-[#151413]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STYLING NOTES */}
          <div className="p-3 bg-white border border-[#DFDFDF] space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#66625C] font-semibold block">
              Styling Note
            </span>
            <p className="text-[11px] text-[#151413] font-light italic leading-relaxed">
              &ldquo;{selectedGarment.stylingNotes}&rdquo;
            </p>
          </div>

          {/* ADD TO STYLING BAG BUTTON */}
          <button
            type="button"
            onClick={handleAddToBag}
            className={`w-full py-3.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
              justAddedGarmentId === selectedGarment.id || alreadyInBag
                ? 'bg-[#151413] text-white border border-[#151413]'
                : 'bg-[#0E0E0E] text-white hover:bg-[#2A2927]'
            }`}
          >
            {justAddedGarmentId === selectedGarment.id ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added To Styling Bag ({currentSize})</span>
              </>
            ) : alreadyInBag ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Styling Bag ({currentSize}) &bull; Add Another Size</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add To Styling Bag ({currentSize})</span>
              </>
            )}
          </button>
        </div>

        {/* ALL PIECES IN THIS LOOK (Interactive Hotspot Switcher) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="editorial-subheading text-[#151413]">
              Outfit Pieces ({look.garmentMetadata.length})
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#66625C]">
              Click Pin To Inspect
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {look.garmentMetadata.map((garment) => {
              const isSelected = garment.id === selectedGarmentId;
              return (
                <button
                  key={garment.id}
                  type="button"
                  onClick={() => onSelectGarment(garment.id)}
                  className={`text-left p-2.5 border flex items-center gap-2.5 transition-all ${
                    isSelected
                      ? 'border-[#0E0E0E] bg-[#F7F7F6] ring-1 ring-[#0E0E0E]'
                      : 'border-[#DFDFDF] bg-white hover:border-[#C8C8C8]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#0E0E0E] text-white'
                        : 'bg-[#F7F7F6] text-[#66625C] border border-[#DFDFDF]'
                    }`}
                  >
                    {garment.pinNumber}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#66625C] block truncate">
                      {garment.category}
                    </span>
                    <h4 className="text-xs font-medium text-[#151413] truncate">
                      {garment.name}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dominant Colors */}
        <div className="space-y-3 pt-2 border-t border-[#DFDFDF]">
          <span className="editorial-subheading text-[#151413] block">
            Chromatic Balance
          </span>
          <div className="flex items-center gap-3">
            {look.dominantColors.map((color, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border border-[#DFDFDF] p-1.5 pr-3 bg-white"
              >
                <span
                  className="w-3.5 h-3.5 border border-[#C8C8C8]"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[11px] font-light text-[#151413]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility Insight */}
        <div className="p-4 bg-[#F7F7F6] border border-[#C8C8C8] space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#151413] uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-[#0E0E0E]" />
            <span>Suitability Archetype</span>
          </div>
          <div className="text-xs text-[#151413] font-medium">
            {look.suitabilityInsights.archetype}
          </div>
          <p className="text-[11px] text-[#66625C] font-light leading-relaxed">
            {look.suitabilityInsights.harmony}
          </p>
        </div>

      </div>

      {/* Action Footer (Sticky Bottom) */}
      <div className="p-6 md:p-8 border-t border-[#C8C8C8] bg-white space-y-3">
        <button
          onClick={handleAnalyzeThisLook}
          className="w-full py-4 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2927] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Analyze This Look With My Photo</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleSaveEntireLook}
          className={`w-full py-3.5 border text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 ${
            isSaved
              ? 'border-[#0E0E0E] bg-[#F7F7F6] text-[#0E0E0E]'
              : 'border-[#C8C8C8] text-[#151413] hover:border-[#151413]'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Saved in Collection</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Full Look</span>
            </>
          )}
        </button>
      </div>

    </aside>
  );
}
