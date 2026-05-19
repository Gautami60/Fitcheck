"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Download, CheckCircle2, XCircle, Palette, Activity, Layers, Hexagon, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TryOnResult() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  
  useEffect(() => {
    const data = sessionStorage.getItem('tryonResult');
    if (data) {
      setResult(JSON.parse(data));
    } else {
      router.push('/upload');
    }
  }, [router]);

  if (!result) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-light tracking-widest text-sm uppercase">Loading Style Preview...</div>;

  const analysis = result.analysis || {};
  const styleMatch = analysis.styleMatch || [];
  const recommendedColors = analysis.colorCompatibility?.recommended || [];
  const avoidColors = analysis.colorCompatibility?.avoid || [];
  const whatWorks = analysis.whatWorks || [];
  const whatToAvoid = analysis.whatToAvoid || [];

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] p-6 md:p-12 font-sans selection:bg-violet-500/30 overflow-x-hidden">
      
      <header className="mb-12 flex items-center justify-between max-w-[1400px] mx-auto">
        <Link href="/upload" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-medium">
          <ArrowLeft className="w-4 h-4" />
          New Analysis
        </Link>
        <div className="text-[10px] text-violet-400 uppercase tracking-widest flex items-center gap-2 font-bold border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Generation & Analysis Complete
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* HERO SECTION: IMAGES */}
        <section>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">AI Style <span className="font-bold text-white">Preview</span></h1>
            <p className="text-zinc-400 font-light text-sm max-w-xl mx-auto leading-relaxed">Conceptual visualization of your selected garment and aesthetic compatibility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto items-stretch">
            {/* Original Image */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Step 1</span>
                <span className="text-xs uppercase tracking-widest text-zinc-400">Original</span>
              </div>
              <div className="relative rounded-3xl overflow-hidden bg-zinc-900/40 border border-white/5 p-3 backdrop-blur-3xl h-full flex flex-col">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-zinc-900 w-full flex-grow">
                  {result.originalUserImageUrl ? <img src={result.originalUserImageUrl} className="w-full h-full object-cover" alt="Original Upload" /> : <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">Original</div>}
                </div>
              </div>
            </motion.div>

            {/* Outfit Image */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Step 2</span>
                <span className="text-xs uppercase tracking-widest text-zinc-400">Garment</span>
              </div>
              <div className="relative rounded-3xl overflow-hidden bg-zinc-900/40 border border-white/5 p-3 backdrop-blur-3xl h-full flex flex-col">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-zinc-900 w-full flex-grow">
                  {result.outfitImageUrl ? <img src={result.outfitImageUrl} className="w-full h-full object-cover" alt="Target Outfit" /> : <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">Garment</div>}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* FASHION INTELLIGENCE SECTION */}
        <section className="pt-8 border-t border-white/5">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">Fashion <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white">Intelligence</span></h2>
            <p className="text-zinc-400 font-light text-sm max-w-2xl mx-auto leading-relaxed">Comprehensive algorithmic breakdown of silhouette synergy, color harmony, and style compatibility.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Suitability & Style Match (Left Column 4/12) */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Suitability Score */}
              <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[50px] group-hover:bg-emerald-500/10 transition-colors duration-700" />
                <div className="flex items-center gap-2 text-zinc-500 text-xs mb-6 uppercase tracking-widest font-bold">
                  <Zap className="w-4 h-4 text-emerald-400" /> Suitability Score
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-light tracking-tighter text-white">{analysis.suitabilityScore || 0}</span>
                  <span className="text-lg text-zinc-600 font-bold tracking-widest uppercase">/ 100</span>
                </div>
              </div>

              {/* Style Match */}
              <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-zinc-500 text-xs mb-6 uppercase tracking-widest font-bold">
                  <Hexagon className="w-4 h-4 text-violet-400" /> Primary Style Match
                </div>
                <div className="space-y-5">
                  {styleMatch.map((s: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="text-lg text-white font-medium">{s.style}</span>
                      <span className={`text-sm font-bold tracking-widest ${idx === 0 ? 'text-violet-400' : 'text-zinc-500'}`}>{s.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>

            {/* Detailed Analysis (Right Column 8/12) */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Works vs Avoid */}
              <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5"><Activity className="w-5 h-5 text-zinc-300" /></div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">Silhouette & Fit Analysis</h3>
                </div>
                
                <div className="mb-8">
                  <p className="text-zinc-400 text-sm leading-relaxed">{analysis.bodyCompatibility}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
                    <h4 className="text-xs text-emerald-400 uppercase tracking-widest mb-4 font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> What Works</h4>
                    <ul className="space-y-3">
                      {whatWorks.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-zinc-300 flex items-start gap-2 capitalize">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-2xl">
                    <h4 className="text-xs text-red-400 uppercase tracking-widest mb-4 font-bold flex items-center gap-2"><XCircle className="w-4 h-4" /> What To Avoid</h4>
                    <ul className="space-y-3">
                      {whatToAvoid.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-zinc-300 flex items-start gap-2 capitalize">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-1.5 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Grid for Colors & Styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Color Intelligence */}
                <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5"><Palette className="w-5 h-5 text-zinc-300" /></div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">Color Harmony</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-bold">Recommended Tones</h4>
                      <div className="flex flex-wrap gap-2">
                        {recommendedColors.map((color: string, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-lg capitalize">{color}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-bold">Tones to Avoid</h4>
                      <div className="flex flex-wrap gap-2">
                        {avoidColors.map((color: string, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-red-500/10 border border-red-500/10 text-red-300/80 text-xs rounded-lg capitalize">{color}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Styling Strategy */}
                <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5"><Layers className="w-5 h-5 text-zinc-300" /></div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">Styling Strategy</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">Accessories</span>
                      <span className="text-sm text-zinc-300">{analysis.stylingSuggestions?.accessories || 'N/A'}</span>
                    </div>
                    <div className="pb-3 border-b border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">Footwear</span>
                      <span className="text-sm text-zinc-300">{analysis.stylingSuggestions?.shoes || 'N/A'}</span>
                    </div>
                    <div className="pb-3 border-b border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">Layering</span>
                      <span className="text-sm text-zinc-300">{analysis.stylingSuggestions?.layering || 'N/A'}</span>
                    </div>
                    <div className="pt-1">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-2">Ideal Occasions</span>
                      <div className="flex flex-wrap gap-2">
                        {(analysis.occasionMatch || []).map((occ: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/5 text-zinc-400 text-[10px] uppercase tracking-wider rounded-md">{occ}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}
