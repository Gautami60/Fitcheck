"use client";

import { Sparkles } from 'lucide-react';

interface CompatibilityScoreProps {
  score: number;
  label?: string;
}

export default function CompatibilityScore({ score, label = 'Suitability Score' }: CompatibilityScoreProps) {
  const getDescriptor = (val: number) => {
    if (val >= 92) return 'Exceptional Harmony';
    if (val >= 85) return 'High Compatibility';
    if (val >= 75) return 'Moderate Synergy';
    return 'Styling Adjustment Recommended';
  };

  return (
    <div className="border border-[#C8C8C8] p-8 bg-white relative">
      <div className="flex items-center justify-between mb-6">
        <span className="editorial-subheading text-[#66625C] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#0E0E0E]" />
          {label}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-[#151413] font-medium border border-[#DFDFDF] px-2.5 py-1 bg-[#F7F7F6]">
          {getDescriptor(score)}
        </span>
      </div>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-6xl md:text-7xl font-light tracking-tighter text-[#151413]">
          {score}
        </span>
        <span className="text-sm font-mono text-[#66625C] uppercase tracking-widest">
          / 100
        </span>
      </div>

      {/* Editorial Progress Bar */}
      <div className="w-full h-1.5 bg-[#DFDFDF] overflow-hidden">
        <div
          className="h-full bg-[#0E0E0E] transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
        />
      </div>

      <p className="text-xs text-[#66625C] font-light mt-4 leading-relaxed">
        Algorithmic synthesis of silhouette geometry, undertone balance, and physical proportions.
      </p>
    </div>
  );
}

