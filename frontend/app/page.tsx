"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, Layers, Eye } from 'lucide-react';
import SiteHeader from '../components/layout/SiteHeader';
import SiteFooter from '../components/layout/SiteFooter';
import { RUNWAY_LOOKS } from '../data/runwayLooks';

export default function Home() {
  const heroLook = RUNWAY_LOOKS[0];
  const allLooks = RUNWAY_LOOKS;

  return (
    <div className="min-h-screen bg-white text-[#151413] flex flex-col font-sans selection:bg-[#0E0E0E] selection:text-white">
      <SiteHeader />

      <main className="flex-1">
        {/* ============================================================
            HERO SECTION: BALANCED TWO-COLUMN EDITORIAL COMPOSITION
           ============================================================ */}
        <section className="relative border-b border-[#C8C8C8] bg-white overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* LEFT COLUMN: EDITORIAL STATEMENT & CTAs */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Category Label */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#C8C8C8] bg-[#F7F7F6]">
                  <Sparkles className="w-3.5 h-3.5 text-[#0E0E0E]" />
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#151413]">
                    AI Fashion Compatibility &amp; Style Intelligence
                  </span>
                </div>

                {/* Oversized Editorial Display Heading */}
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#151413] leading-[1.04]">
                  See Your Style <br />
                  <span className="font-normal italic">Before You Buy.</span>
                </h1>

                {/* Supporting Description */}
                <p className="text-base sm:text-lg text-[#66625C] font-light max-w-xl leading-relaxed">
                  Experience fashion through an interactive 3D runway and algorithmic aesthetic compatibility. Evaluate tailoring drape, silhouette harmony, and chromatic balance with editorial precision.
                </p>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href="/explore"
                    className="px-8 py-5 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2927] transition-all flex items-center justify-center gap-3 group shadow-sm"
                  >
                    <span>Enter The Runway</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/upload"
                    className="px-8 py-5 border border-[#C8C8C8] text-[#151413] text-xs uppercase tracking-widest font-semibold hover:border-[#151413] hover:bg-[#F7F7F6] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Analyze Your Outfit</span>
                  </Link>
                </div>

                {/* Micro-Editorial Features List */}
                <div className="pt-6 border-t border-[#DFDFDF] grid grid-cols-3 gap-6 max-w-lg">
                  <div>
                    <span className="text-xl font-light text-[#151413] font-mono block">06</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#66625C] font-medium">
                      Runway Looks
                    </span>
                  </div>
                  <div>
                    <span className="text-xl font-light text-[#151413] font-mono block">3D</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#66625C] font-medium">
                      Circular Stage
                    </span>
                  </div>
                  <div>
                    <span className="text-xl font-light text-[#151413] font-mono block">95%</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#66625C] font-medium">
                      Synergy Precision
                    </span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: VISUALLY DOMINANT EDITORIAL FASHION COMPOSITION */}
              <div className="lg:col-span-5 relative">
                
                {/* Main Fashion Frame Container */}
                <div className="relative mx-auto max-w-[480px] lg:max-w-none border border-[#151413] p-3 bg-[#FBFBFA] shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
                  
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] bg-[#F7F7F6] overflow-hidden border border-[#DFDFDF]">
                    <img
                      src={heroLook.image}
                      alt="Fitcheck Editorial Runway Model"
                      className="w-full h-full object-cover object-top filter grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 border border-[#C8C8C8] shadow-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0E0E0E]" />
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-[#151413]">
                        LOOK 01 &bull; {heroLook.name}
                      </span>
                    </div>

                    {/* Interactive Hotspot Pin 01 (Blazer) */}
                    <div className="absolute left-[48%] top-[34%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                      <Link
                        href="/explore"
                        className="group relative flex items-center justify-center p-2"
                        title="Click to explore this garment on the runway"
                      >
                        <span className="absolute w-8 h-8 rounded-full border border-white/80 animate-ping pointer-events-none" />
                        <span className="relative w-7 h-7 rounded-full bg-[#0E0E0E] text-white border border-[#0E0E0E] text-[10px] font-mono font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          01
                        </span>
                      </Link>
                    </div>

                    {/* Interactive Hotspot Pin 03 (Trousers) */}
                    <div className="absolute left-[49%] top-[70%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                      <Link
                        href="/explore"
                        className="group relative flex items-center justify-center p-2"
                        title="Click to explore these trousers on the runway"
                      >
                        <span className="relative w-7 h-7 rounded-full bg-white/95 text-[#151413] border border-[#C8C8C8] text-[10px] font-mono font-bold flex items-center justify-center shadow-md group-hover:bg-[#0E0E0E] group-hover:text-white transition-colors">
                          03
                        </span>
                      </Link>
                    </div>

                    {/* Floating Bottom Card: Interactive Product Detail */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#C8C8C8] p-3 shadow-lg flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-14 bg-[#F7F7F6] border border-[#DFDFDF] overflow-hidden shrink-0">
                          <img
                            src={heroLook.garmentMetadata[0].thumbnail}
                            alt={heroLook.garmentMetadata[0].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-widest text-[#66625C] font-semibold block truncate">
                            {heroLook.garmentMetadata[0].category} &bull; Size S/M/L
                          </span>
                          <h4 className="text-xs font-medium text-[#151413] truncate">
                            {heroLook.garmentMetadata[0].name}
                          </h4>
                        </div>
                      </div>

                      <Link
                        href="/explore"
                        className="shrink-0 p-2.5 bg-[#0E0E0E] text-white hover:bg-[#2A2927] transition-colors"
                        title="Explore on Runway"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>

                  {/* Footnote Underneath Photo */}
                  <div className="mt-3 px-2 flex items-center justify-between text-[10px] text-[#66625C] uppercase tracking-wider">
                    <span>Campaign Collection 2026</span>
                    <span className="font-semibold text-[#151413]">Fitcheck Runway Stage</span>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ============================================================
            SIX RUNWAY LOOKS SHOWCASE
           ============================================================ */}
        <section className="border-b border-[#C8C8C8] bg-[#FBFBFA] py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="editorial-subheading text-[#66625C] block mb-2">
                  Interactive 3D Carousel Stage
                </span>
                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#151413]">
                  The Runway Collection
                </h2>
                <p className="text-sm text-[#66625C] font-light mt-2 max-w-md">
                  Six distinct sartorial expressions digitized for physical and chromatic compatibility analysis.
                </p>
              </div>

              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#151413] hover:underline"
              >
                <span>Launch Interactive 3D Stage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 6 Looks Editorial Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allLooks.map((look) => (
                <Link
                  key={look.id}
                  href="/explore"
                  className="group block border border-[#C8C8C8] bg-white p-4 hover:border-[#151413] transition-all duration-300 shadow-sm"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] bg-[#F7F7F6] overflow-hidden mb-5 border border-[#DFDFDF]">
                    <img
                      src={look.image}
                      alt={look.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter grayscale-[10%] group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 border border-[#C8C8C8] text-[10px] uppercase tracking-widest font-semibold text-[#151413]">
                      LOOK {look.number}
                    </div>
                    <div className="absolute top-4 right-4 bg-[#0E0E0E] text-white px-2.5 py-1 text-[10px] font-mono tracking-wider">
                      {look.suitabilityInsights.score}% SYNERGY
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-medium">
                        {look.outfitCategory}
                      </span>
                      <span className="text-[10px] text-[#66625C]">
                        {look.garmentMetadata.length} Pieces
                      </span>
                    </div>

                    <h3 className="text-xl font-light text-[#151413] tracking-tight group-hover:underline">
                      {look.name}
                    </h3>

                    <p className="text-xs text-[#66625C] font-light line-clamp-2 leading-relaxed">
                      {look.description}
                    </p>

                    <div className="pt-4 border-t border-[#DFDFDF] flex items-center justify-between text-xs text-[#151413]">
                      <span className="font-semibold uppercase tracking-wider text-[11px]">
                        Inspect Hotspots &amp; Sizes
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* ============================================================
            THE 3-STEP JOURNEY
           ============================================================ */}
        <section className="border-b border-[#C8C8C8] py-20 md:py-28 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            
            <div className="max-w-2xl mb-16">
              <span className="editorial-subheading text-[#66625C] block mb-2">
                System Architecture
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#151413]">
                The Style Intelligence Journey
              </h2>
              <p className="text-sm text-[#66625C] font-light leading-relaxed mt-2">
                A streamlined workflow designed to evaluate wardrobe selections against your personal aesthetic archetype.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Upload Personal Image',
                  desc: 'Provide a clear photograph of yourself to establish physical proportions, vertical lines, and complexion nuances.',
                  icon: <Compass className="w-5 h-5 text-[#0E0E0E]" />,
                },
                {
                  step: '02',
                  title: 'Select Outfit Inspiration',
                  desc: 'Upload any garment of interest or choose directly from the Fitcheck Runway catalog for instant analysis.',
                  icon: <Layers className="w-5 h-5 text-[#0E0E0E]" />,
                },
                {
                  step: '03',
                  title: 'Receive Style Intelligence',
                  desc: 'Review comprehensive compatibility analytics: suitability scoring, silhouette harmonics, what works, and what to avoid.',
                  icon: <Sparkles className="w-5 h-5 text-[#0E0E0E]" />,
                },
              ].map((step, i) => (
                <div key={i} className="border border-[#C8C8C8] p-8 bg-white space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-light text-[#151413]">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 border border-[#DFDFDF] flex items-center justify-center bg-[#F7F7F6]">
                      {step.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold uppercase tracking-wider text-[#151413] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#66625C] font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ============================================================
            CALL TO ACTION
           ============================================================ */}
        <section className="py-24 md:py-32 bg-[#0E0E0E] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <span className="editorial-subheading text-[#C8C8C8] tracking-[0.25em]">
              Elevate Your Wardrobe Decision-Making
            </span>

            <h2 className="text-4xl sm:text-6xl font-light tracking-tight leading-tight">
              Curate With Algorithmic Certainty.
            </h2>

            <p className="text-sm md:text-base text-[#DFDFDF] font-light max-w-xl mx-auto leading-relaxed">
              Step onto the interactive 3D runway or upload your own outfits to receive instantaneous, objective style compatibility insights.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/explore"
                className="px-9 py-5 bg-white text-[#0E0E0E] text-xs uppercase tracking-widest font-semibold hover:bg-[#DFDFDF] transition-colors"
              >
                Explore 3D Runway Stage
              </Link>
              <Link
                href="/upload"
                className="px-9 py-5 border border-[#66625C] text-white text-xs uppercase tracking-widest font-semibold hover:border-white transition-colors"
              >
                Start Style Analysis
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
