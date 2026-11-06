"use client";

import { useState, useEffect } from 'react';
import RunwayCarousel from './RunwayCarousel';
import OutfitDetailsPanel from './OutfitDetailsPanel';
import { RUNWAY_LOOKS } from '../../data/runwayLooks';

export default function RunwaySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGarmentId, setSelectedGarmentId] = useState<string>(
    RUNWAY_LOOKS[0]?.garmentMetadata[0]?.id || ''
  );
  const [isHoveringPanel, setIsHoveringPanel] = useState(false);

  const activeLook = RUNWAY_LOOKS[activeIndex] || RUNWAY_LOOKS[0];

  // Whenever the active look changes, reset selected garment to the first item in the new look
  useEffect(() => {
    if (activeLook && activeLook.garmentMetadata.length > 0) {
      setSelectedGarmentId(activeLook.garmentMetadata[0].id);
    }
  }, [activeIndex, activeLook]);

  return (
    <section className="w-full bg-white border-b border-[#C8C8C8]">
      {/* Editorial Top Headline Banner */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 border-b border-[#DFDFDF] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="editorial-subheading text-[#66625C] block mb-1">
            Fitcheck Runway &bull; Edition 2026
          </span>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight text-[#151413]">
            Try The Look &mdash; Interactive 3D Stage
          </h1>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#66625C]">
          <span className="hidden sm:inline-block">
            Click Pins to Inspect &bull; Drag to Rotate &bull; Left/Right Arrows
          </span>
          <div className="h-3 w-[1px] bg-[#C8C8C8] hidden sm:block" />
          <span className="font-mono text-[#151413]">
            {activeLook.number} / 0{RUNWAY_LOOKS.length}
          </span>
        </div>
      </div>

      {/* Main Two-Column Stage & Details Section */}
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[720px] lg:min-h-[780px]">
        {/* Left: 3D Runway Carousel Stage */}
        <RunwayCarousel
          looks={RUNWAY_LOOKS}
          activeIndex={activeIndex}
          selectedGarmentId={selectedGarmentId}
          setActiveIndex={setActiveIndex}
          onSelectGarment={(gId) => setSelectedGarmentId(gId)}
          isPausedFromOutside={isHoveringPanel}
        />

        {/* Right: "In This Look" Details & Styling Panel */}
        <OutfitDetailsPanel
          look={activeLook}
          selectedGarmentId={selectedGarmentId}
          onSelectGarment={(gId) => setSelectedGarmentId(gId)}
          onHoverStart={() => setIsHoveringPanel(true)}
          onHoverEnd={() => setIsHoveringPanel(false)}
        />
      </div>
    </section>
  );
}
