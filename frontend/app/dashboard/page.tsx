"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Upload, Sparkles, History, Settings, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#070707] text-[#ededed] p-8 md:p-12 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            FITCHECK<span className="text-violet-500">.</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/profile" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
              <Settings className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Intelligence <span className="font-bold">Dashboard</span>
          </h1>
          <p className="text-zinc-400 font-light mb-12">Welcome back. Your style analytics are ready.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Action Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 glass-panel p-10 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Initiate Style Preview</h2>
                <p className="text-zinc-400 font-light max-w-md">
                  Upload your photo and a target outfit. Our intelligence engine will generate a conceptual preview and comprehensive style analysis.
                </p>
              </div>
              <Link href="/upload" className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors w-max group/btn">
                Start Process <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Side Cards */}
          <div className="flex flex-col gap-8">
            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel p-8 rounded-3xl"
            >
              <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 font-medium">Style Profile</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-zinc-400">Body Archetype</span>
                  <span className="font-medium">Athletic</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-zinc-400">Undertone</span>
                  <span className="font-medium">Cool / Neutral</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Primary Aesthetic</span>
                  <span className="font-medium">Minimalist</span>
                </div>
              </div>
            </motion.div>

            {/* History Link */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-panel p-8 rounded-3xl hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <History className="w-5 h-5 text-indigo-400" />
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-lg mb-1">Archive</h3>
              <p className="text-zinc-400 text-sm font-light">Review past analyses and style previews.</p>
            </motion.div>
          </div>
        </div>

      </div>
    </main>
  );
}
