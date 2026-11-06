"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'drag' | 'view' | 'select';
}

export default function CustomCursor({ cursorText = '', cursorVariant = 'default' }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop screens
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch || window.innerWidth < 1024);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isActionState = cursorVariant === 'drag' || cursorVariant === 'view' || cursorVariant === 'select';

  const defaultText = () => {
    if (cursorText) return cursorText;
    if (cursorVariant === 'drag') return 'DRAG';
    if (cursorVariant === 'view') return 'VIEW';
    if (cursorVariant === 'select') return 'SELECT';
    return '';
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center font-sans"
      animate={{
        x: mousePosition.x - (isActionState ? 44 : 12),
        y: mousePosition.y - (isActionState ? 44 : 12),
        width: isActionState ? 88 : 24,
        height: isActionState ? 88 : 24,
      }}
      transition={{
        type: 'spring',
        damping: 28,
        stiffness: 400,
        mass: 0.2,
      }}
    >
      <div
        className={`w-full h-full rounded-full flex items-center justify-center transition-colors duration-200 border p-2 text-center ${
          isActionState
            ? 'bg-[#151413] text-white border-[#151413] shadow-xl'
            : 'bg-transparent border-[#151413]/60'
        }`}
      >
        {isActionState && (
          <span className="text-[9px] font-semibold tracking-widest uppercase select-none text-white leading-tight">
            {defaultText()}
          </span>
        )}
      </div>
    </motion.div>
  );
}
