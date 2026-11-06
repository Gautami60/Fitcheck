"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, Check, X } from 'lucide-react';
import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';
import { RUNWAY_LOOKS } from '../../data/runwayLooks';

export default function RecommendationsPage() {
  const [alternativeSuggestions, setAlternativeSuggestions] = useState<string[]>([
    'A midnight blue variant with high-twist wool drape',
    'Cropped boxy jacket hem to elongate lower torso line',
    'Micro-houndstooth texture for subtle dimensional depth',
    'Unlined fluid trench coat in sand-washed neutral tones',
  ]);

  useEffect(() => {
    const raw = sessionStorage.getItem('tryonResult');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.analysis?.alternativeSuggestions?.length) {
          setAlternativeSuggestions(parsed.analysis.alternativeSuggestions);
        }
      } catch (e) {
        console.error('Failed to parse analysis data', e);
      }
    }
  }, []);

  const recommendedLooks = RUNWAY_LOOKS.slice(0, 3);

  const colorAlternatives = [
    { name: 'Midnight Navy', hex: '#1C2833', reason: 'Provides high contrast without the severity of pure black.' },
    { name: 'Oatmeal Melange', hex: '#D8D2C6', reason: 'Warm undertone reflection that complements neutral complexions.' },
    { name: 'Smoked Charcoal', hex: '#36454F', reason: 'Softens architectural silhouettes while maintaining formal presence.' },
    { name: 'Sand Terracotta', hex: '#B86B52', reason: 'Introduces organic warmth and tactile richness for daytime events.' },
  ];

  const silhouetteGuidelines = [
    {
      title: 'High-Rise Straight Trousers',
      verdict: 'Recommended',
      desc: 'Creates an unbroken vertical line from waist to shoe break, adding perceived height.',
    },
    {
      title: 'Structured Roped Shoulder Blazer',
      verdict: 'Recommended',
      desc: 'Defines torso frame and posture without requiring excessive padding.',
    },
    {
      title: 'Skinny Low-Rise Denim',
      verdict: 'Avoid',
      desc: 'Disrupts natural proportion balance and accentuates lower torso compression.',
    },
    {
      title: 'Bulky Boxy Down Parka',
      verdict: 'Avoid',
      desc: 'Masks silhouette structure and introduces unflattering horizontal volume.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#151413] flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16">
          
          {/* Header */}
          <div className="border-b border-[#C8C8C8] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Link
                href="/try-on"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#66625C] hover:text-[#151413] transition-colors font-medium mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Style Report</span>
              </Link>
              <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#151413]">
                Curated Recommendations
              </h1>
              <p className="text-sm text-[#66625C] font-light max-w-xl mt-2 leading-relaxed">
                Algorithmic adjustments, silhouette alternatives, and chromatic upgrades customized to optimize your personal styling trajectory.
              </p>
            </div>

            <Link
              href="/upload"
              className="px-6 py-3.5 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2A2927] transition-colors inline-flex items-center gap-2"
            >
              <span>Test New Variation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 1. KEY AI AESTHETIC ENHANCEMENTS */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#DFDFDF] pb-3">
              <span className="editorial-subheading text-[#151413] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0E0E0E]" />
                Primary Style Enhancements
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#66625C]">
                Algorithmic Curation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {alternativeSuggestions.map((rec, i) => (
                <div
                  key={i}
                  className="border border-[#C8C8C8] p-6 bg-white flex flex-col justify-between hover:border-[#151413] transition-colors"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-[#66625C] block">
                      0{i + 1}
                    </span>
                    <h3 className="text-sm font-medium text-[#151413] leading-snug">
                      {rec}
                    </h3>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#DFDFDF]">
                    <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-medium">
                      Synergy Upgrade
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. BETTER COLOR ALTERNATIVES */}
          <section className="space-y-6">
            <div className="border-b border-[#DFDFDF] pb-3">
              <span className="editorial-subheading text-[#151413] block">
                Chromatic Balance & Alternatives
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {colorAlternatives.map((item, i) => (
                <div
                  key={i}
                  className="border border-[#C8C8C8] p-6 bg-white space-y-4"
                >
                  <div
                    className="w-full h-16 border border-[#DFDFDF]"
                    style={{ backgroundColor: item.hex }}
                  />
                  <div>
                    <h4 className="text-sm font-medium text-[#151413]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#66625C] font-light leading-relaxed mt-1">
                      {item.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. OUTFIT SILHOUETTES: WHAT TO WEAR VS WHAT TO AVOID */}
          <section className="space-y-6">
            <div className="border-b border-[#DFDFDF] pb-3">
              <span className="editorial-subheading text-[#151413] block">
                Proportion & Silhouette Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {silhouetteGuidelines.map((item, i) => {
                const isPositive = item.verdict === 'Recommended';
                return (
                  <div
                    key={i}
                    className="border border-[#C8C8C8] p-6 bg-white flex items-start gap-4"
                  >
                    <div
                      className={`w-8 h-8 shrink-0 flex items-center justify-center border ${
                        isPositive
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-amber-600 bg-amber-50 text-amber-800'
                      }`}
                    >
                      {isPositive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-medium text-[#151413]">
                          {item.title}
                        </h4>
                        <span
                          className={`text-[10px] uppercase tracking-wider font-semibold ${
                            isPositive ? 'text-emerald-700' : 'text-amber-800'
                          }`}
                        >
                          {item.verdict}
                        </span>
                      </div>
                      <p className="text-xs text-[#66625C] font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. RECOMMENDED RUNWAY SILHOUETTES */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#DFDFDF] pb-3">
              <span className="editorial-subheading text-[#151413]">
                Runway Silhouettes To Explore
              </span>
              <Link
                href="/explore"
                className="text-xs uppercase tracking-wider text-[#151413] hover:underline"
              >
                Go to Runway &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedLooks.map((look) => (
                <div
                  key={look.id}
                  className="border border-[#C8C8C8] p-4 bg-white group hover:border-[#151413] transition-colors"
                >
                  <div className="aspect-[3/4] bg-[#F7F7F6] overflow-hidden mb-4 border border-[#DFDFDF]">
                    <img
                      src={look.image}
                      alt={look.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#66625C] block mb-1">
                    {look.outfitCategory}
                  </span>
                  <h4 className="text-base font-light text-[#151413] mb-3">
                    {look.name}
                  </h4>
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#151413] hover:underline"
                  >
                    <span>View in 3D Stage</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
