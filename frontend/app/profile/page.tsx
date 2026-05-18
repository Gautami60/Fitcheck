"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
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
    <main className="min-h-screen bg-[#070707] text-[#ededed] p-8 md:p-12 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        <header className="mb-12">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors uppercase tracking-widest font-medium mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-light tracking-tight mb-4"
          >
            Style <span className="font-bold">Preferences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 font-light"
          >
            Fine-tune your physical archetype and aesthetic inclinations for more accurate AI synthesis.
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-10 rounded-[2rem]"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {message && (
                <div className={`p-4 border rounded-xl text-sm backdrop-blur-md ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {message.text}
                </div>
              )}

              <div>
                <label className="block mb-3 text-sm font-medium uppercase tracking-widest text-zinc-400">Body Archetype</label>
                <select 
                  value={formData.bodyType}
                  onChange={e => setFormData({...formData, bodyType: e.target.value})}
                  className="w-full p-4 bg-white/5 border border-white/10 focus:border-violet-500/50 rounded-xl text-white outline-none focus:bg-white/10 transition-all appearance-none cursor-pointer"
                >
                  <option className="bg-[#111]">Athletic / V-Taper</option>
                  <option className="bg-[#111]">Slim / Ectomorph</option>
                  <option className="bg-[#111]">Curvy / Hourglass</option>
                  <option className="bg-[#111]">Average / Proportionate</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-3 text-sm font-medium uppercase tracking-widest text-zinc-400">Primary Aesthetic</label>
                <select 
                  value={formData.preferredStyle}
                  onChange={e => setFormData({...formData, preferredStyle: e.target.value})}
                  className="w-full p-4 bg-white/5 border border-white/10 focus:border-violet-500/50 rounded-xl text-white outline-none focus:bg-white/10 transition-all appearance-none cursor-pointer"
                >
                  <option className="bg-[#111]">Minimalist</option>
                  <option className="bg-[#111]">Streetwear Vanguard</option>
                  <option className="bg-[#111]">Tailored / Formal</option>
                  <option className="bg-[#111]">Avant-Garde</option>
                </select>
              </div>

              <button disabled={saving} type="submit" className="mt-4 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Updating...' : 'Update Protocol'}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </main>
  );
}
