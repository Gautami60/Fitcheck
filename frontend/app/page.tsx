"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070707] text-[#ededed] overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background ambient glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-panel border-b-0 border-white/5 py-4 px-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          FITCHECK<span className="text-violet-500">.</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-6 items-center text-sm font-medium"
        >
          <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">Log In</Link>
          <Link href="/signup" className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Get Started
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-zinc-300 mb-8"
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span>Fitcheck AI Intelligence 2.0 is now live</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 max-w-5xl leading-[1.1]"
        >
          See Your Style <br />
          <span className="text-gradient-accent">Before You Buy.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl font-light"
        >
          AI-powered fashion compatibility and personal style intelligence. Experience styling in a completely new dimension.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/signup" className="group relative px-8 py-4 bg-white text-black rounded-full font-medium text-lg overflow-hidden flex items-center gap-2">
            <span className="relative z-10 flex items-center gap-2">Analyze Outfit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-zinc-100 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
          </Link>
          <button className="px-8 py-4 rounded-full glass-panel text-white font-medium text-lg hover:bg-white/10 transition-colors">
            View Editorial Lookbook
          </button>
        </motion.div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-400" />,
              title: "Instant Visualization",
              desc: "Upload any outfit and see it instantly wrapped around your silhouette with photorealistic accuracy."
            },
            {
              icon: <Sparkles className="w-6 h-6 text-violet-400" />,
              title: "Color & Cut Analysis",
              desc: "Our AI evaluates how specific tones and fabrics interact with your unique skin undertones and body structure."
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
              title: "Confidence Score",
              desc: "Get an objective AI rating on how well an outfit suits you before making an expensive purchase."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-8 rounded-3xl group hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
          <div>© 2026 Fitcheck Intelligence. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Editorial</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
