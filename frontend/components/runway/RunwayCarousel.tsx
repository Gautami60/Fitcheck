"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import RunwayModel from './RunwayModel';
import RunwayControls from './RunwayControls';
import LookPopup from './LookPopup';
import CustomCursor from './CustomCursor';
import { RunwayLook } from '../../types/runway';

interface RunwayCarouselProps {
  looks: RunwayLook[];
  activeIndex: number;
  selectedGarmentId: string;
  setActiveIndex: (index: number) => void;
  onSelectGarment: (garmentId: string) => void;
  isPausedFromOutside?: boolean;
}

export default function RunwayCarousel({
  looks,
  activeIndex,
  selectedGarmentId,
  setActiveIndex,
  onSelectGarment,
  isPausedFromOutside = false,
}: RunwayCarouselProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedPopupLook, setSelectedPopupLook] = useState<RunwayLook | null>(null);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'drag' | 'view' | 'select'>('default');
  const [cursorText, setCursorText] = useState('DRAG TO EXPLORE');

  // Drag tracking refs
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);

  // Next / Prev helpers
  const handlePrev = useCallback(() => {
    setActiveIndex((activeIndex - 1 + looks.length) % looks.length);
  }, [activeIndex, looks.length, setActiveIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((activeIndex + 1) % looks.length);
  }, [activeIndex, looks.length, setActiveIndex]);

  // Autoplay timer (5-second interval)
  useEffect(() => {
    if (!isPlaying || isPausedFromOutside || selectedPopupLook !== null) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isPausedFromOutside, selectedPopupLook, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPopupLook !== null) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, selectedPopupLook]);

  // Drag handlers (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    setCursorVariant('drag');
    setCursorText('DRAGGING');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (deltaX > 70) {
      handlePrev();
      isDraggingRef.current = false;
      setCursorText('DRAG TO EXPLORE');
    } else if (deltaX < -70) {
      handleNext();
      isDraggingRef.current = false;
      setCursorText('DRAG TO EXPLORE');
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setCursorText('DRAG TO EXPLORE');
  };

  // Touch handlers (Mobile)
  const touchStartXRef = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartXRef.current;
    if (delta > 50) {
      handlePrev();
    } else if (delta < -50) {
      handleNext();
    }
  };

  return (
    <div
      ref={stageRef}
      className="flex-1 flex flex-col justify-between relative bg-white overflow-hidden min-h-[620px] lg:min-h-[760px] select-none"
      onMouseEnter={() => {
        setCursorVariant('drag');
        setCursorText('DRAG TO EXPLORE');
      }}
      onMouseLeave={() => {
        setCursorVariant('default');
        isDraggingRef.current = false;
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Desktop Custom Cursor */}
      <CustomCursor cursorVariant={cursorVariant} cursorText={cursorText} />

      {/* ARIA Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite">
        Now viewing look {looks[activeIndex].number} of {looks.length}: {looks[activeIndex].name}.
      </div>

      {/* Stage Backdrop & Subtle Grid / Editorial Accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stage Center Axis Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#F7F7F6]" />
        
        {/* Subtle stage perimeter indicators */}
        <div className="absolute top-8 left-8 text-[10px] tracking-[0.25em] uppercase text-[#66625C] font-semibold">
          RUNWAY 0{looks.length} &bull; 3D CIRCULAR CAROUSEL
        </div>

        <div className="absolute top-8 right-8 text-[10px] tracking-[0.2em] uppercase text-[#66625C] font-mono">
          [ CLICK PINS TO INSPECT ]
        </div>
      </div>

      {/* 3D Runway Stage Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden py-12">
        <div className="relative w-full max-w-5xl h-[560px] md:h-[650px] flex items-center justify-center">
          {looks.map((look, index) => (
            <RunwayModel
              key={look.id}
              look={look}
              index={index}
              activeIndex={activeIndex}
              totalLooks={looks.length}
              selectedGarmentId={selectedGarmentId}
              onSelect={(idx) => setActiveIndex(idx)}
              onSelectGarment={onSelectGarment}
              onOpenPopup={(l) => setSelectedPopupLook(l)}
              onMouseEnterActive={() => {
                setCursorVariant('view');
                setCursorText('VIEW LOOK');
              }}
              onMouseEnterHotspot={() => {
                setCursorVariant('select');
                setCursorText('SELECT PIECE');
              }}
              onMouseLeaveHotspot={() => {
                setCursorVariant('view');
                setCursorText('VIEW LOOK');
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <RunwayControls
        looks={looks}
        activeIndex={activeIndex}
        onSelect={(idx) => setActiveIndex(idx)}
        onPrev={handlePrev}
        onNext={handleNext}
        isPlaying={isPlaying && !isPausedFromOutside}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
      />

      {/* Expanded View Look Modal Popup */}
      <LookPopup
        look={selectedPopupLook}
        isOpen={selectedPopupLook !== null}
        onClose={() => setSelectedPopupLook(null)}
      />
    </div>
  );
}
