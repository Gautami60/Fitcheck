"use client";

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { RunwayLook } from '../../types/runway';

interface RunwayModelProps {
  look: RunwayLook;
  index: number;
  activeIndex: number;
  totalLooks: number;
  selectedGarmentId?: string;
  onSelect: (index: number) => void;
  onSelectGarment?: (garmentId: string) => void;
  onOpenPopup: (look: RunwayLook) => void;
  onMouseEnterActive?: () => void;
  onMouseEnterHotspot?: (label: string) => void;
  onMouseLeaveHotspot?: () => void;
}

export default function RunwayModel({
  look,
  index,
  activeIndex,
  totalLooks,
  selectedGarmentId,
  onSelect,
  onSelectGarment,
  onOpenPopup,
  onMouseEnterActive,
  onMouseEnterHotspot,
  onMouseLeaveHotspot,
}: RunwayModelProps) {
  // Compute circular offset between -3 and +3
  let offset = (index - activeIndex) % totalLooks;
  if (offset > totalLooks / 2) offset -= totalLooks;
  if (offset < -totalLooks / 2) offset += totalLooks;

  const isActive = offset === 0;

  // 3D Ring coordinates
  const getTransform = () => {
    switch (offset) {
      case 0:
        return {
          x: '0%',
          z: 0,
          scale: 1,
          rotateY: 0,
          blur: '0px',
          opacity: 1,
          zIndex: 30,
        };
      case 1:
        return {
          x: '85%',
          z: -120,
          scale: 0.82,
          rotateY: -15,
          blur: '2px',
          opacity: 0.65,
          zIndex: 20,
        };
      case -1:
        return {
          x: '-85%',
          z: -120,
          scale: 0.82,
          rotateY: 15,
          blur: '2px',
          opacity: 0.65,
          zIndex: 20,
        };
      case 2:
        return {
          x: '145%',
          z: -260,
          scale: 0.65,
          rotateY: -25,
          blur: '4px',
          opacity: 0.35,
          zIndex: 10,
        };
      case -2:
        return {
          x: '-145%',
          z: -260,
          scale: 0.65,
          rotateY: 25,
          blur: '4px',
          opacity: 0.35,
          zIndex: 10,
        };
      default:
        return {
          x: '0%',
          z: -380,
          scale: 0.5,
          rotateY: 0,
          blur: '6px',
          opacity: 0.15,
          zIndex: 5,
        };
    }
  };

  const transform = getTransform();

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
      style={{
        zIndex: transform.zIndex,
        perspective: 1200,
      }}
      animate={{
        x: `calc(-50% + ${transform.x})`,
        y: '-50%',
        scale: transform.scale,
        opacity: transform.opacity,
        filter: `blur(${transform.blur})`,
      }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 24,
        mass: 0.8,
      }}
      onClick={() => {
        if (!isActive) {
          onSelect(index);
        }
      }}
      onMouseEnter={() => {
        if (isActive && onMouseEnterActive) {
          onMouseEnterActive();
        }
      }}
    >
      <div className="relative group flex flex-col items-center">
        
        {/* Model Figure Frame */}
        <div
          className={`relative w-[270px] sm:w-[310px] md:w-[350px] lg:w-[380px] h-[410px] sm:h-[490px] md:h-[550px] lg:h-[620px] bg-[#F7F7F6] overflow-hidden border transition-all duration-300 ${
            isActive
              ? 'border-[#151413] shadow-[0_25px_60px_rgba(0,0,0,0.14)]'
              : 'border-[#DFDFDF] hover:border-[#C8C8C8]'
          }`}
        >
          {/* Fashion Photograph */}
          <img
            src={look.image}
            alt={look.name}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover object-top filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
          />

          {/* Active Look Overlay Badge */}
          {isActive && (
            <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 border border-[#C8C8C8] shadow-sm flex items-center gap-2 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E0E]" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#151413]">
                LOOK {look.number} &bull; {look.outfitCategory}
              </span>
            </div>
          )}

          {/* INTERACTIVE OUTFIT HOTSPOTS (Displayed only on the active model) */}
          {isActive && look.garmentMetadata && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {look.garmentMetadata.map((garment) => {
                const isGarmentActive = selectedGarmentId === garment.id;
                return (
                  <div
                    key={garment.id}
                    className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${garment.hotspot.x}%`,
                      top: `${garment.hotspot.y}%`,
                    }}
                    onMouseEnter={() => {
                      if (onMouseEnterHotspot) {
                        onMouseEnterHotspot(`${garment.pinNumber} ${garment.name}`);
                      }
                    }}
                    onMouseLeave={() => {
                      if (onMouseLeaveHotspot) {
                        onMouseLeaveHotspot();
                      }
                    }}
                  >
                    <button
                      type="button"
                      aria-label={`Hotspot ${garment.pinNumber}: ${garment.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectGarment) {
                          onSelectGarment(garment.id);
                        }
                      }}
                      className="group/pin relative flex items-center justify-center focus:outline-none p-2"
                    >
                      {/* Outer subtle radar ring for active hotspot */}
                      <span
                        className={`absolute w-8 h-8 rounded-full border transition-all duration-500 pointer-events-none ${
                          isGarmentActive
                            ? 'border-[#0E0E0E] scale-125 opacity-100 animate-ping'
                            : 'border-white/80 scale-100 opacity-60 group-hover/pin:scale-110 group-hover/pin:border-[#0E0E0E]'
                        }`}
                      />

                      {/* Numbered Pin Badge */}
                      <span
                        className={`relative w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold tracking-wider transition-all duration-300 shadow-md ${
                          isGarmentActive
                            ? 'bg-[#0E0E0E] text-white border border-[#0E0E0E] scale-110'
                            : 'bg-white/95 text-[#151413] border border-[#C8C8C8] hover:bg-[#0E0E0E] hover:text-white hover:border-[#0E0E0E]'
                        }`}
                      >
                        {garment.pinNumber}
                      </span>

                      {/* Hover / Active Floating Label Pill */}
                      <div
                        className={`absolute left-9 whitespace-nowrap bg-white/95 backdrop-blur-md px-3 py-1.5 border border-[#C8C8C8] shadow-lg pointer-events-none transition-all duration-200 z-30 ${
                          isGarmentActive
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-1 group-hover/pin:opacity-100 group-hover/pin:translate-x-0'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase tracking-widest text-[#66625C] font-semibold">
                            {garment.category}
                          </span>
                          <div className="w-[1px] h-2.5 bg-[#C8C8C8]" />
                          <span className="text-[11px] font-medium text-[#151413]">
                            {garment.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Expanded Modal Trigger Prompt at Bottom Right of Active Model */}
          {isActive && (
            <div className="absolute bottom-4 right-4 z-20">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPopup(look);
                }}
                className="bg-white/90 backdrop-blur-md px-3.5 py-2 border border-[#C8C8C8] hover:border-[#151413] shadow-sm flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#151413] transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full View</span>
              </button>
            </div>
          )}
        </div>

        {/* Realistic Floor Shadow */}
        <div
          className={`w-[85%] h-6 rounded-[100%] transition-opacity duration-300 -mt-2 pointer-events-none ${
            isActive
              ? 'bg-black/15 blur-md'
              : 'bg-black/5 blur-sm'
          }`}
        />

        {/* Minimal caption underneath */}
        <div className="mt-3 text-center">
          <span
            className={`text-[11px] uppercase tracking-[0.18em] transition-colors ${
              isActive ? 'text-[#151413] font-semibold' : 'text-[#66625C]'
            }`}
          >
            {look.number} &mdash; {look.name}
          </span>
        </div>

      </div>
    </motion.div>
  );
}
