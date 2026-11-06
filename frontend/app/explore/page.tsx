"use client";

import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';
import RunwaySection from '../../components/runway/RunwaySection';
import Link from 'next/link';
import { ArrowRight, Sparkles, SlidersHorizontal, ShieldCheck, Compass } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#151413]">
      <SiteHeader />

      <main className="flex-1">
        {/* Main Interactive 3D Runway Experience */}
        <RunwaySection />

        {/* Editorial Runway Context & Style Methodology */}
        <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 md:py-28 border-b border-[#C8C8C8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <span className="editorial-subheading text-[#66625C] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0E0E0E]" />
                Curatorial Protocol
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#151413] leading-tight">
                Architectural Form Meets Algorithmic Precision.
              </h2>
              <p className="text-sm text-[#66625C] font-light leading-relaxed pt-2">
                Each silhouette on the Fitcheck Runway is digitized into a comprehensive physical and chromatic matrix. Rather than relying on superficial virtual try-on illusions, our engine evaluates tailoring drape, undertone equilibrium, and proportion balance.
              </p>
              <div className="pt-4">
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2A2927] transition-all"
                >
                  <span>Analyze Your Personal Compatibility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Three Columns */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-5 h-5 text-[#0E0E0E]" />,
                  title: 'Proportion Synergy',
                  desc: 'Geometric evaluation between torso length, shoulder span, and garment seamlines to ensure harmonious balance.',
                },
                {
                  icon: <SlidersHorizontal className="w-5 h-5 text-[#0E0E0E]" />,
                  title: 'Chromatic Harmony',
                  desc: 'Scientific color matrix mapping hue undertones against seasonal palettes to highlight natural warmth and contrast.',
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-[#0E0E0E]" />,
                  title: 'Objective Scoring',
                  desc: 'Deterministic fashion intelligence providing transparent reasons why specific garments flatter or disrupt.',
                },
              ].map((item, i) => (
                <div key={i} className="border-t border-[#C8C8C8] pt-6 space-y-3">
                  <div className="w-10 h-10 border border-[#DFDFDF] flex items-center justify-center bg-[#F7F7F6]">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide text-[#151413] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#66625C] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}

