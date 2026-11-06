"use client";

import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { RunwayLook } from '../../types/runway';

interface RunwayControlsProps {
  looks: RunwayLook[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function RunwayControls({
  looks,
  activeIndex,
  onSelect,
  onPrev,
  onNext,
  isPlaying,
  onTogglePlay,
}: RunwayControlsProps) {
  const activeLook = looks[activeIndex];

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4 md:px-8 border-t border-[#C8C8C8] bg-white">
      
      {/* Left: Active Look Index & Title */}
      <div className="flex items-center gap-4">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#151413]">
          {activeLook.number} / 0{looks.length}
        </div>
        <div className="h-4 w-[1px] bg-[#C8C8C8]" />
        <div className="text-sm font-light uppercase tracking-wider text-[#151413]">
          {activeLook.name}
        </div>
      </div>

      {/* Center: 01 - 06 Progress Indicators */}
      <div className="flex items-center gap-2 sm:gap-4" role="tablist" aria-label="Runway looks navigation">
        {looks.map((look, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={look.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`View look ${look.number}: ${look.name}`}
              onClick={() => onSelect(index)}
              className="group flex flex-col items-center py-2 px-1 relative focus:outline-none"
            >
              <span
                className={`text-[11px] font-mono tracking-wider transition-colors ${
                  isActive ? 'text-[#151413] font-bold' : 'text-[#66625C] group-hover:text-[#151413]'
                }`}
              >
                {look.number}
              </span>
              <div
                className={`mt-1 h-[2px] transition-all duration-300 ${
                  isActive
                    ? 'w-6 sm:w-8 bg-[#0E0E0E]'
                    : 'w-3 sm:w-4 bg-[#DFDFDF] group-hover:bg-[#C8C8C8]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Right: Prev / Next Arrows & Autoplay Toggle */}
      <div className="flex items-center gap-2">
        {/* Play/Pause Autoplay Toggle */}
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause 5-second autoplay' : 'Resume autoplay'}
          title={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
          className="w-10 h-10 border border-[#C8C8C8] flex items-center justify-center text-[#151413] hover:border-[#151413] hover:bg-[#F7F7F6] transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Previous Arrow */}
        <button
          onClick={onPrev}
          aria-label="Previous look"
          className="w-10 h-10 border border-[#C8C8C8] flex items-center justify-center text-[#151413] hover:border-[#151413] hover:bg-[#F7F7F6] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Next Arrow */}
        <button
          onClick={onNext}
          aria-label="Next look"
          className="w-10 h-10 border border-[#C8C8C8] flex items-center justify-center text-[#151413] hover:border-[#151413] hover:bg-[#F7F7F6] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

