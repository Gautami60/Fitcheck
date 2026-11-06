"use client";

import { Check, X, Activity } from 'lucide-react';

interface StyleInsightCardProps {
  bodyCompatibility?: string;
  whatWorks?: string[];
  whatToAvoid?: string[];
  fitRecommendations?: {
    best?: string;
    avoid?: string;
  };
}

export default function StyleInsightCard({
  bodyCompatibility,
  whatWorks = [],
  whatToAvoid = [],
  fitRecommendations,
}: StyleInsightCardProps) {
  return (
    <div className="border border-[#C8C8C8] p-8 bg-white space-y-8">
      {/* Header & Body Compatibility Narrative */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-[#0E0E0E]" />
          <span className="editorial-subheading text-[#151413]">
            Silhouette & Proportion Evaluation
          </span>
        </div>
        {bodyCompatibility && (
          <p className="text-sm text-[#151413] font-light leading-relaxed">
            {bodyCompatibility}
          </p>
        )}
      </div>

      {/* Two Column Breakdown: What Works vs What To Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#DFDFDF]">
        {/* What Works */}
        <div className="border border-[#DFDFDF] p-5 bg-[#FBFBFA]">
          <span className="editorial-subheading text-[#151413] flex items-center gap-2 mb-4 font-semibold">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            What Works
          </span>
          <ul className="space-y-2.5">
            {whatWorks.map((item, i) => (
              <li key={i} className="text-xs text-[#151413] flex items-start gap-2.5 capitalize font-light">
                <span className="w-1.5 h-1.5 bg-[#0E0E0E] mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What To Avoid */}
        <div className="border border-[#DFDFDF] p-5 bg-[#FBFBFA]">
          <span className="editorial-subheading text-[#66625C] flex items-center gap-2 mb-4 font-semibold">
            <X className="w-3.5 h-3.5 text-amber-800" />
            What To Avoid
          </span>
          <ul className="space-y-2.5">
            {whatToAvoid.map((item, i) => (
              <li key={i} className="text-xs text-[#66625C] flex items-start gap-2.5 capitalize font-light">
                <span className="w-1.5 h-1.5 bg-[#66625C] mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fit Recommendations */}
      {fitRecommendations && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#DFDFDF]">
          <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF]">
            <span className="text-[10px] uppercase tracking-widest text-[#66625C] block mb-1">
              Optimal Silhouette
            </span>
            <span className="text-sm font-normal text-[#151413]">
              {fitRecommendations.best || 'Tailored fit'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF]">
            <span className="text-[10px] uppercase tracking-widest text-[#66625C] block mb-1">
              Suboptimal Silhouette
            </span>
            <span className="text-sm font-normal text-[#66625C]">
              {fitRecommendations.avoid || 'Extreme oversized fits'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
