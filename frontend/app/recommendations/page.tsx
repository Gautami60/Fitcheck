"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Recommendations() {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem('tryonResult');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.analysis?.alternativeSuggestions) {
        setSuggestions(parsed.analysis.alternativeSuggestions);
      }
    } else {
      setSuggestions([
        "A midnight blue variant",
        "Cropped jacket hem",
        "Micro-houndstooth texture"
      ]);
    }
  }, []);

  const getDynamicColor = (index: number) => {
    const colors = ["bg-indigo-900", "bg-zinc-800", "bg-violet-900"];
    return colors[index % colors.length];
  };

  return (
    <main className="min-h-screen bg-[#070707] text-[#ededed] p-8 md:p-12 relative">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        <header className="mb-16">
          <Link href="/try-on" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors uppercase tracking-widest font-medium mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Try-On
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-4"
          >
            Curated <span className="font-bold">Recommendations</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 font-light text-lg"
          >
            AI-driven suggestions to elevate your aesthetic based on your recent try-on.
          </motion.p>
        </header>

        <div className="space-y-6">
          {suggestions.map((rec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-colors"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
              <div className="flex gap-6 items-center">
                <div className={`w-12 h-12 rounded-full ${getDynamicColor(i)} shrink-0 border border-white/10 shadow-lg`} />
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {rec}
                    {i === 0 && <Sparkles className="w-4 h-4 text-violet-400" />}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
