"use client";

import { Palette } from 'lucide-react';

interface ColorPaletteProps {
  recommended: string[];
  avoid: string[];
}

export default function ColorPalette({ recommended, avoid }: ColorPaletteProps) {
  // Map common color names to approximate hex for visual preview
  const getColorHex = (name: string): string => {
    const map: Record<string, string> = {
      emerald: '#0B6623',
      champagne: '#F7E7CE',
      charcoal: '#36454F',
      ivory: '#FFFFF0',
      navy: '#000080',
      burgundy: '#800020',
      slate: '#708090',
      'neon tones': '#39FF14',
      'oversaturated contrasts': '#FF0055',
      'mustard yellow': '#E1AD01',
      'bright magenta': '#FF00FF',
    };
    return map[name.toLowerCase()] || '#888888';
  };

  return (
    <div className="border border-[#C8C8C8] p-8 bg-white h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Palette className="w-4 h-4 text-[#0E0E0E]" />
          <span className="editorial-subheading text-[#151413]">
            Chromatic Compatibility
          </span>
        </div>

        <div className="space-y-6">
          {/* Recommended Tones */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold block mb-3">
              Recommended Harmonics
            </span>
            <div className="flex flex-wrap gap-2.5">
              {recommended.map((color, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-[#F7F7F6] border border-[#DFDFDF] text-xs text-[#151413] capitalize"
                >
                  <span
                    className="w-3.5 h-3.5 border border-[#C8C8C8] shrink-0"
                    style={{ backgroundColor: getColorHex(color) }}
                  />
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tones to Avoid */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold block mb-3">
              Tones to Avoid
            </span>
            <div className="flex flex-wrap gap-2.5">
              {avoid.map((color, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-[#FFF8F8] border border-[#F0D0D0] text-xs text-[#8A2525] capitalize"
                >
                  <span
                    className="w-3.5 h-3.5 border border-[#E0A0A0] shrink-0"
                    style={{ backgroundColor: getColorHex(color) }}
                  />
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#66625C] font-light mt-6 pt-4 border-t border-[#DFDFDF]">
        Palette derived from optical undertone contrast balance.
      </p>
    </div>
  );
}

