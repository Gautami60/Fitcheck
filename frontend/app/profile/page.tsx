"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Check, SlidersHorizontal, Sparkles, User, Palette } from 'lucide-react';
import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';
import api from '../../services/api';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [formData, setFormData] = useState({
    bodyType: 'Athletic / V-Taper',
    skinTone: 'Cool / Neutral',
    preferredStyle: 'Minimal Luxury',
    comfortLevel: 'Balanced Everyday',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const stored = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!stored || !token) {
          router.push('/login');
          return;
        }

        const user = JSON.parse(stored);
        setUserName(user.name || '');
        setUserEmail(user.email || '');

        if (user.id) {
          const res = await api.get(`/user/profile?userId=${user.id}`);
          if (res.data?.preferences) {
            setFormData({
              bodyType: res.data.preferences.bodyType || 'Athletic / V-Taper',
              skinTone: res.data.preferences.skinTone || 'Cool / Neutral',
              preferredStyle: res.data.preferences.preferredStyle || 'Minimal Luxury',
              comfortLevel: res.data.preferences.comfortLevel || 'Balanced Everyday',
            });
          }
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const stored = localStorage.getItem('user');
      const user = stored ? JSON.parse(stored) : {};
      
      await api.put('/user/preferences', {
        userId: user.id,
        ...formData,
      });

      setMessage({ type: 'success', text: 'Personal style preferences updated successfully.' });
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update preferences. Please retry.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#151413] flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
          
          {/* Header */}
          <div className="border-b border-[#C8C8C8] pb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#66625C] hover:text-[#151413] transition-colors font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <span className="editorial-subheading text-[#66625C] block mb-2">
              Configuration &bull; Client Settings
            </span>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#151413]">
              Personal Style Profile
            </h1>
            <p className="text-sm text-[#66625C] font-light max-w-xl mt-2 leading-relaxed">
              Calibrate your physical archetype, undertone spectrum, and silhouette inclinations to tailor AI compatibility scoring to your body.
            </p>
          </div>

          {/* Account Details Banner */}
          <div className="border border-[#DFDFDF] p-6 bg-[#FBFBFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-[#C8C8C8] flex items-center justify-center bg-white text-[#151413]">
                <User className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#151413] uppercase tracking-wide">
                  {userName || 'Client Member'}
                </h3>
                <p className="text-xs text-[#66625C] font-mono">
                  {userEmail || 'client@fitcheck.com'}
                </p>
              </div>
            </div>

            <div className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 bg-white border border-[#C8C8C8] text-[#151413] w-fit">
              Active Member
            </div>
          </div>

          {/* Form */}
          {loading ? (
            <div className="py-20 text-center text-xs uppercase tracking-widest text-[#66625C] flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading Preferences...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-[#C8C8C8] p-8 md:p-12 bg-white space-y-10">
              
              {/* Feedback Message */}
              {message && (
                <div
                  className={`p-4 border text-xs flex items-center gap-3 ${
                    message.type === 'success'
                      ? 'border-[#0E0E0E] bg-[#F7F7F6] text-[#151413]'
                      : 'border-red-400 bg-red-50 text-red-700'
                  }`}
                >
                  {message.type === 'success' ? (
                    <Check className="w-4 h-4 text-[#0E0E0E] shrink-0" />
                  ) : null}
                  <span>{message.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* 1. Body Archetype */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#151413] flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#0E0E0E]" />
                    <span>Body Archetype</span>
                  </label>
                  <p className="text-[11px] text-[#66625C] font-light mb-2">
                    Defines baseline silhouette geometry and vertical ratios.
                  </p>
                  <select
                    value={formData.bodyType}
                    onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                    className="w-full p-4 bg-white border border-[#C8C8C8] text-[#151413] text-xs font-light tracking-wide outline-none focus:border-[#151413] transition-colors appearance-none cursor-pointer"
                  >
                    <option>Athletic / V-Taper</option>
                    <option>Slim / Ectomorph</option>
                    <option>Curvy / Hourglass</option>
                    <option>Average / Proportionate</option>
                    <option>Tall & Lean</option>
                  </select>
                </div>

                {/* 2. Primary Aesthetic */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#151413] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0E0E0E]" />
                    <span>Primary Aesthetic</span>
                  </label>
                  <p className="text-[11px] text-[#66625C] font-light mb-2">
                    Influences styling recommendations and look suggestions.
                  </p>
                  <select
                    value={formData.preferredStyle}
                    onChange={(e) => setFormData({ ...formData, preferredStyle: e.target.value })}
                    className="w-full p-4 bg-white border border-[#C8C8C8] text-[#151413] text-xs font-light tracking-wide outline-none focus:border-[#151413] transition-colors appearance-none cursor-pointer"
                  >
                    <option>Minimal Luxury</option>
                    <option>Modern Streetwear</option>
                    <option>Contemporary Formal</option>
                    <option>Soft Elegance</option>
                    <option>Everyday Classic</option>
                    <option>Weekend Casual</option>
                    <option>Avant-Garde</option>
                  </select>
                </div>

                {/* 3. Skin Undertone */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#151413] flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5 text-[#0E0E0E]" />
                    <span>Skin Undertone Spectrum</span>
                  </label>
                  <p className="text-[11px] text-[#66625C] font-light mb-2">
                    Guides chromatic compatibility and seasonal contrast filters.
                  </p>
                  <select
                    value={formData.skinTone}
                    onChange={(e) => setFormData({ ...formData, skinTone: e.target.value })}
                    className="w-full p-4 bg-white border border-[#C8C8C8] text-[#151413] text-xs font-light tracking-wide outline-none focus:border-[#151413] transition-colors appearance-none cursor-pointer"
                  >
                    <option>Cool / Rosy</option>
                    <option>Warm / Golden</option>
                    <option>Neutral / Olive</option>
                    <option>Deep Rich</option>
                  </select>
                </div>

                {/* 4. Comfort & Fit Preference */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#151413] flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#0E0E0E]" />
                    <span>Comfort & Fit Dynamics</span>
                  </label>
                  <p className="text-[11px] text-[#66625C] font-light mb-2">
                    Balances structural tightness versus fluidity in recommendations.
                  </p>
                  <select
                    value={formData.comfortLevel}
                    onChange={(e) => setFormData({ ...formData, comfortLevel: e.target.value })}
                    className="w-full p-4 bg-white border border-[#C8C8C8] text-[#151413] text-xs font-light tracking-wide outline-none focus:border-[#151413] transition-colors appearance-none cursor-pointer"
                  >
                    <option>Balanced Everyday</option>
                    <option>Tailored & Structured</option>
                    <option>Relaxed & Volumetric</option>
                    <option>Fluid & Unstructured</option>
                  </select>
                </div>

              </div>

              {/* Submit CTA */}
              <div className="pt-8 border-t border-[#DFDFDF] flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-10 py-5 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2927] transition-all disabled:opacity-50 flex items-center gap-2.5 shadow-sm"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating Protocol...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Preferences</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
