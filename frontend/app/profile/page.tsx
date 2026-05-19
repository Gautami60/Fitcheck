"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Sparkles, SlidersHorizontal, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const [formData, setFormData] = useState({
    bodyType: 'Athletic / V-Taper',
    preferredStyle: 'Minimalist'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) {
          setLoading(false);
          return;
        }
        const res = await api.get(`/user/profile?userId=${user.id}`);
        if (res.data.preferences) {
          setFormData({
            bodyType: res.data.preferences.bodyType || 'Athletic / V-Taper',
            preferredStyle: res.data.preferences.preferredStyle || 'Minimalist'
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await api.put('/user/preferences', {
        userId: user.id,
        ...formData
      });
      setMessage({ type: 'success', text: 'Protocol updated successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update preferences.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] p-6 md:p-12 relative overflow-hidden font-sans selection:bg-violet-500/30">
      
      {/* PREMIUM BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[150px] opacity-70" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        <header className="mb-16">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-medium mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
              <Settings className="w-4 h-4 text-violet-400" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-violet-400 font-bold">Configuration</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-light tracking-tight mb-4"
          >
            Style <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">Preferences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-zinc-400 font-light text-base md:text-lg max-w-xl leading-relaxed"
          >
            Fine-tune your physical archetype and aesthetic inclinations for more accurate AI synthesis and style intelligence.
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative bg-zinc-900/30 border border-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle card inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {loading ? (
            <div className="flex flex-col justify-center items-center py-24 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Loading Configuration...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-10">
              
              {message && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-5 rounded-2xl text-sm backdrop-blur-md flex items-center gap-3 font-medium border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
                >
                  {message.type === 'success' ? <Sparkles className="w-4 h-4" /> : null}
                  {message.text}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Body Archetype */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                    <SlidersHorizontal className="w-3 h-3" /> Body Archetype
                  </label>
                  <div className="relative group">
                    <select 
                      value={formData.bodyType}
                      onChange={e => setFormData({...formData, bodyType: e.target.value})}
                      className="w-full p-5 bg-[#0a0a0a]/50 border border-white/10 group-hover:border-violet-500/30 focus:border-violet-500/50 rounded-2xl text-white outline-none focus:bg-white/5 transition-all appearance-none cursor-pointer text-sm font-light tracking-wide shadow-inner"
                    >
                      <option className="bg-[#111]">Athletic / V-Taper</option>
                      <option className="bg-[#111]">Slim / Ectomorph</option>
                      <option className="bg-[#111]">Curvy / Hourglass</option>
                      <option className="bg-[#111]">Average / Proportionate</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-2 h-2 border-r border-b border-zinc-500 rotate-45 group-hover:border-violet-400 transition-colors" />
                    </div>
                  </div>
                </div>
                
                {/* Primary Aesthetic */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                    <Sparkles className="w-3 h-3" /> Primary Aesthetic
                  </label>
                  <div className="relative group">
                    <select 
                      value={formData.preferredStyle}
                      onChange={e => setFormData({...formData, preferredStyle: e.target.value})}
                      className="w-full p-5 bg-[#0a0a0a]/50 border border-white/10 group-hover:border-violet-500/30 focus:border-violet-500/50 rounded-2xl text-white outline-none focus:bg-white/5 transition-all appearance-none cursor-pointer text-sm font-light tracking-wide shadow-inner"
                    >
                      <option className="bg-[#111]">Minimalist</option>
                      <option className="bg-[#111]">Streetwear Vanguard</option>
                      <option className="bg-[#111]">Tailored / Formal</option>
                      <option className="bg-[#111]">Avant-Garde</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-2 h-2 border-r border-b border-zinc-500 rotate-45 group-hover:border-violet-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-2 border-t border-white/5 flex justify-end">
                <button 
                  disabled={saving} 
                  type="submit" 
                  className="relative group px-10 py-5 bg-white text-black rounded-full font-medium text-sm overflow-hidden flex items-center justify-center gap-3 disabled:opacity-50 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Updating Protocol...' : 'Update Protocol'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-zinc-100 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                </button>
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </main>
  );
}
