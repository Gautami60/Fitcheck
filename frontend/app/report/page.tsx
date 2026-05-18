"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ChevronRight, Activity, ArrowLeft, Hexagon, Layers, Palette, ShieldCheck, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReportResult() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  
  useEffect(() => {
    const data = sessionStorage.getItem('reportResult');
    if (data) {
      setResult(JSON.parse(data));
    } else {
      router.push('/upload');
    }
  }, [router]);

  if (!result) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-light tracking-widest text-sm uppercase">Loading Intelligence...</div>;

  const analysis = result.analysis || {};
  const styleMatch = analysis.styleMatch || [];
  const recommendedColors = analysis.colorCompatibility?.recommended || [];
  const avoidColors = analysis.colorCompatibility?.avoid || [];

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] p-8 md:p-12 font-sans selection:bg-indigo-500/30">
      
      <header className="mb-12 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/upload" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-medium">
          <ArrowLeft className="w-4 h-4" />
          New Analysis
        </Link>
        <div className="text-[10px] text-indigo-400 uppercase tracking-widest flex items-center gap-2 font-bold border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Intelligence Active
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Conceptual Moodboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-6 sticky top-12"
        >
          <div className="relative rounded-3xl overflow-hidden bg-zinc-900/40 border border-white/5 p-4 backdrop-blur-3xl shadow-2xl">
            {/* The "Moodboard" Composition */}
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-[#0a0a0a]">
              
              {/* Abstract Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-transparent opacity-50 mix-blend-screen" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px]" />

              {/* User Image Layer */}
              <div className="absolute top-4 left-4 w-2/3 h-2/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform -rotate-2 origin-bottom-left hover:rotate-0 transition-transform duration-700 ease-out z-10">
                {result.originalUserImageUrl ? (
                  <img src={result.originalUserImageUrl} className="w-full h-full object-cover filter grayscale-[20%] contrast-125" alt="Subject" />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs uppercase tracking-widest">Subject</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest font-bold text-white/80">Subject</div>
              </div>

              {/* Outfit Image Layer */}
              <div className="absolute bottom-4 right-4 w-3/5 h-3/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform rotate-3 origin-bottom-right hover:rotate-0 transition-transform duration-700 ease-out z-20 backdrop-blur-sm bg-black/20">
                {result.outfitImageUrl ? (
                  <img src={result.outfitImageUrl} className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" alt="Garment" />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs uppercase tracking-widest">Garment</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest font-bold text-white/80">Target Garment</div>
              </div>

              {/* Style Tags Overlay */}
              <div className="absolute top-6 right-6 z-30 flex flex-col gap-2 items-end">
                {styleMatch.slice(0, 2).map((s: any, idx: number) => (
                  <div key={idx} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-zinc-300 shadow-xl">
                    {s.style}
                  </div>
                ))}
              </div>

              {/* Conceptual Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-zinc-300">Style Visualization</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between px-2 text-zinc-500 text-[10px] uppercase tracking-widest">
            <span>ID: {result.analysisId?.substring(0, 8) || 'SYS-8902'}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Encrypted Analysis</span>
          </div>
        </motion.div>

        {/* Right: Luxury Insight Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lg:col-span-7 flex flex-col gap-8 pb-24"
        >
          <div className="border-b border-white/5 pb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">Fashion <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">Intelligence</span></h1>
            <p className="text-zinc-400 font-light text-sm max-w-xl leading-relaxed">Comprehensive algorithmic breakdown of silhouette synergy, color harmony, and style compatibility based on your profile.</p>
          </div>

          {/* Hero Metrics Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] group-hover:bg-emerald-500/10 transition-colors duration-700" />
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] mb-4 uppercase tracking-widest font-bold">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Suitability Score
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-light tracking-tighter text-white">{analysis.suitabilityScore || 0}</span>
                <span className="text-sm text-zinc-600 font-bold tracking-widest uppercase">/ 100</span>
              </div>
            </div>

            <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] group-hover:bg-indigo-500/10 transition-colors duration-700" />
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] mb-4 uppercase tracking-widest font-bold">
                <Hexagon className="w-3.5 h-3.5 text-indigo-400" />
                Primary Style Match
              </div>
              <div className="text-2xl font-medium tracking-tight text-white mb-1">
                {styleMatch[0]?.style || 'Unknown'}
              </div>
              <div className="text-emerald-400 text-sm font-bold tracking-widest">{styleMatch[0]?.percentage || 0}% Synergy</div>
            </div>
          </div>

          {/* Detailed Intelligence Cards */}
          <div className="space-y-4">
            
            {/* Body & Fit */}
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <Activity className="w-4 h-4 text-zinc-300" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">Silhouette & Fit Analysis</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">Body Compatibility</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-light">{analysis.bodyCompatibility || 'Analysis pending.'}</p>
                </div>
                <div className="space-y-4 border-l border-white/5 pl-8">
                  <div>
                    <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Ideal Fit</h4>
                    <div className="text-sm font-medium text-emerald-400">{analysis.fitRecommendations?.best || 'N/A'}</div>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Avoid</h4>
                    <div className="text-sm font-light text-red-400">{analysis.fitRecommendations?.avoid || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Intelligence */}
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <Palette className="w-4 h-4 text-zinc-300" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">Color Harmony</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] text-emerald-500/70 uppercase tracking-widest mb-3 font-bold">Recommended Tones</h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendedColors.map((color: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-lg capitalize">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-l border-white/5 pl-8">
                  <h4 className="text-[10px] text-red-500/70 uppercase tracking-widest mb-3 font-bold">Tones to Avoid</h4>
                  <div className="flex flex-wrap gap-2">
                    {avoidColors.map((color: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-lg capitalize">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Styling & Occasion */}
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <Layers className="w-4 h-4 text-zinc-300" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">Styling Strategy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">Accessories & Footwear</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-light">{analysis.stylingSuggestions || 'No suggestions available.'}</p>
                </div>
                
                <div>
                  <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-bold">Ideal Occasions</h4>
                  <div className="flex flex-wrap gap-2">
                    {(analysis.occasionMatch || []).map((occ: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-full capitalize flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" /> {occ}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <Link href="/dashboard" className="mt-8 relative group overflow-hidden rounded-2xl p-[1px]">
            <span className="absolute inset-0 bg-gradient-to-r from-zinc-500/0 via-zinc-500/40 to-zinc-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex justify-between items-center group-hover:bg-zinc-900/50 transition-colors relative z-10 cursor-pointer">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-300 mb-1">Return to Dashboard</div>
                <div className="text-[10px] text-zinc-500 font-light tracking-widest">View your historical style analytics</div>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>

        </motion.div>
      </div>
    </main>
  );
}
