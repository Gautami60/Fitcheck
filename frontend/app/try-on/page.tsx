"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Layers,
} from 'lucide-react';
import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';
import CompatibilityScore from '../../components/style/CompatibilityScore';
import ColorPalette from '../../components/style/ColorPalette';
import StyleInsightCard from '../../components/style/StyleInsightCard';
import { isLookSaved, saveLook } from '../../utils/savedLooks';

export default function TryOnResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('tryonResult');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setResult(parsed);
        if (parsed.analysisId) {
          setIsSaved(isLookSaved(parsed.analysisId));
        }
      } catch (e) {
        console.error('Failed to parse tryon result', e);
        router.push('/upload');
      }
    } else {
      router.push('/upload');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs uppercase tracking-widest text-[#66625C]">
        Loading Fashion Intelligence Report...
      </div>
    );
  }

  const analysis = result.analysis || {};
  const styleMatches: Array<{ style: string; percentage: number }> = analysis.styleMatch || [];
  const recommendedColors: string[] = analysis.colorCompatibility?.recommended || [];
  const avoidColors: string[] = analysis.colorCompatibility?.avoid || [];
  const whatWorks: string[] = analysis.whatWorks || [];
  const whatToAvoid: string[] = analysis.whatToAvoid || [];
  const occasions: string[] = analysis.occasionMatch || [];
  const styling = analysis.stylingSuggestions || {};

  const handleSaveToCollection = () => {
    const id = result.analysisId || `analysis-${Date.now()}`;
    saveLook({
      id,
      name: `Style Evaluation &bull; ${styleMatches[0]?.style || 'Custom Analysis'}`,
      image: result.outfitImageUrl,
      category: styleMatches[0]?.style || 'Tailored',
      type: 'analysis',
      score: analysis.suitabilityScore || 85,
    });
    setIsSaved(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#151413] flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16">
          
          {/* Top Navigation & Status Bar */}
          <div className="border-b border-[#C8C8C8] pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#66625C] hover:text-[#151413] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>New Analysis</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-widest text-[#66625C] font-mono">
                REPORT ID: {result.analysisId ? String(result.analysisId).slice(-8).toUpperCase() : 'FIT-2026'}
              </span>
              <div className="h-3 w-[1px] bg-[#C8C8C8]" />
              <button
                onClick={handleSaveToCollection}
                className={`flex items-center gap-2 px-3.5 py-1.5 border text-xs uppercase tracking-wider font-medium transition-colors ${
                  isSaved
                    ? 'border-[#0E0E0E] bg-[#F7F7F6] text-[#0E0E0E]'
                    : 'border-[#C8C8C8] text-[#151413] hover:border-[#151413]'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved In Collection</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SECTION 01: SUBJECT & OUTFIT VISUALIZATION */}
          <section className="space-y-6">
            <div className="border-b border-[#DFDFDF] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="editorial-subheading text-[#66625C] block mb-1">
                  Visual Comparison
                </span>
                <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#151413]">
                  Style Compatibility Report
                </h1>
              </div>
              <p className="text-xs text-[#66625C] font-light max-w-sm">
                Objective evaluation of garment architecture versus physical silhouette proportions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Card 1: Original User Photograph */}
              <div className="border border-[#C8C8C8] p-4 bg-white flex flex-col">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold">
                    Input 01 &bull; Personal Image
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#151413] font-medium">
                    Subject Base
                  </span>
                </div>
                <div className="aspect-[3/4] bg-[#F7F7F6] border border-[#DFDFDF] overflow-hidden flex items-center justify-center">
                  {result.originalUserImageUrl ? (
                    <img
                      src={result.originalUserImageUrl}
                      alt="Subject Base Photograph"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <span className="text-xs text-[#66625C] uppercase">Image Unavailable</span>
                  )}
                </div>
              </div>

              {/* Card 2: Selected Target Garment */}
              <div className="border border-[#C8C8C8] p-4 bg-white flex flex-col">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold">
                    Input 02 &bull; Target Garment
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#151413] font-medium">
                    Outfit Architecture
                  </span>
                </div>
                <div className="aspect-[3/4] bg-[#F7F7F6] border border-[#DFDFDF] overflow-hidden flex items-center justify-center">
                  {result.outfitImageUrl ? (
                    <img
                      src={result.outfitImageUrl}
                      alt="Target Garment"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <span className="text-xs text-[#66625C] uppercase">Image Unavailable</span>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 02: STYLE INTELLIGENCE METRICS */}
          <section className="space-y-8 pt-8 border-t border-[#C8C8C8]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="editorial-subheading text-[#66625C] block mb-1">
                  Algorithmic Breakdown
                </span>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[#151413]">
                  Fashion Intelligence Matrices
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (5/12): Suitability Score & Primary Style Matches */}
              <div className="lg:col-span-5 space-y-8">
                {/* Score */}
                <CompatibilityScore score={analysis.suitabilityScore || 88} />

                {/* Primary Style Match */}
                <div className="border border-[#C8C8C8] p-8 bg-white space-y-6">
                  <div className="flex items-center justify-between border-b border-[#DFDFDF] pb-4">
                    <span className="editorial-subheading text-[#151413]">
                      Aesthetic Classification
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#66625C]">
                      Synergy Ratio
                    </span>
                  </div>

                  <div className="space-y-4">
                    {styleMatches.map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-normal text-[#151413]">{item.style}</span>
                          <span className="font-mono text-[#0E0E0E] font-medium">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-[#DFDFDF]">
                          <div
                            className={`h-full ${idx === 0 ? 'bg-[#0E0E0E]' : 'bg-[#66625C]'}`}
                            style={{ width: `${Math.min(item.percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Occasion Harmonics */}
                <div className="border border-[#C8C8C8] p-8 bg-white space-y-4">
                  <span className="editorial-subheading text-[#151413] block">
                    Recommended Occasions
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((occ, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-[#F7F7F6] border border-[#DFDFDF] text-xs uppercase tracking-wider text-[#151413]"
                      >
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (7/12): Silhouette, Color Harmony, Styling Suggestions */}
              <div className="lg:col-span-7 space-y-8">
                {/* Silhouette & Proportion Card */}
                <StyleInsightCard
                  bodyCompatibility={analysis.bodyCompatibility}
                  whatWorks={whatWorks}
                  whatToAvoid={whatToAvoid}
                  fitRecommendations={analysis.fitRecommendations}
                />

                {/* Color Harmony Grid */}
                <ColorPalette
                  recommended={recommendedColors}
                  avoid={avoidColors}
                />

                {/* Styling Strategy */}
                <div className="border border-[#C8C8C8] p-8 bg-white space-y-6">
                  <div className="flex items-center gap-2 border-b border-[#DFDFDF] pb-4">
                    <Layers className="w-4 h-4 text-[#0E0E0E]" />
                    <span className="editorial-subheading text-[#151413]">
                      Styling Strategy & Complements
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF]">
                      <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold block mb-1">
                        Accessories
                      </span>
                      <p className="text-xs text-[#151413] font-light leading-relaxed">
                        {styling.accessories || 'Minimal geometric jewelry or refined leather belts.'}
                      </p>
                    </div>

                    <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF]">
                      <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold block mb-1">
                        Footwear
                      </span>
                      <p className="text-xs text-[#151413] font-light leading-relaxed">
                        {styling.shoes || 'Structured leather loafers or clean, low-profile minimalist footwear.'}
                      </p>
                    </div>

                    <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF]">
                      <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold block mb-1">
                        Layering
                      </span>
                      <p className="text-xs text-[#151413] font-light leading-relaxed">
                        {styling.layering || 'Unstructured wool overshirt or light tailored blazer.'}
                      </p>
                    </div>

                    <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF]">
                      <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold block mb-1">
                        Timepiece
                      </span>
                      <p className="text-xs text-[#151413] font-light leading-relaxed">
                        {styling.watch || 'Understated dress watch with slim leather strap.'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* BOTTOM ACTIONS BAR */}
          <div className="border border-[#C8C8C8] p-8 bg-[#FBFBFA] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-medium text-[#151413] uppercase tracking-wider mb-1">
                Explore Curated Recommendations
              </h3>
              <p className="text-xs text-[#66625C] font-light">
                Discover alternative silhouettes, colorways, and aesthetic enhancements tuned to this analysis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href="/recommendations"
                className="w-full sm:w-auto px-8 py-4 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2A2927] transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>View Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/upload"
                className="w-full sm:w-auto px-8 py-4 border border-[#C8C8C8] text-[#151413] text-xs uppercase tracking-widest font-medium hover:border-[#151413] transition-colors text-center"
              >
                Analyze Another Outfit
              </Link>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
