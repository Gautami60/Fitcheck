"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Sparkles,
  Compass,
  Bookmark,
  User,
  Settings,
  Layers,
} from 'lucide-react';
import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';
import api from '../../services/api';
import { getSavedLooks } from '../../utils/savedLooks';
import { SavedLookItem } from '../../types/runway';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id?: string; name?: string; email?: string } | null>(null);
  const [preferences, setPreferences] = useState<{
    bodyType?: string;
    skinTone?: string;
    preferredStyle?: string;
    comfortLevel?: string;
  }>({});
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [savedCollection, setSavedCollection] = useState<SavedLookItem[]>([]);

  useEffect(() => {
    // 1. Check logged in user
    const rawUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!rawUser || !token) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(rawUser);
      setUser(parsedUser);

      // 2. Load preferences & history from backend
      const fetchData = async () => {
        try {
          if (parsedUser.id) {
            // Profile & Preferences
            const profRes = await api.get(`/user/profile?userId=${parsedUser.id}`);
            if (profRes.data?.preferences) {
              setPreferences(profRes.data.preferences);
            }

            // History
            const histRes = await api.get(`/history?userId=${parsedUser.id}`);
            if (Array.isArray(histRes.data)) {
              setRecentAnalyses(histRes.data);
            }
          }
        } catch (e) {
          console.error('Failed to load user backend data', e);
        }
      };

      fetchData();
    } catch {
      router.push('/login');
    }

    // 3. Load saved looks
    const updateSaved = () => setSavedCollection(getSavedLooks());
    updateSaved();
    window.addEventListener('fitcheck_saved_looks_updated', updateSaved);
    window.addEventListener('fitcheck_styling_bag_updated', updateSaved);
    return () => {
      window.removeEventListener('fitcheck_saved_looks_updated', updateSaved);
      window.removeEventListener('fitcheck_styling_bag_updated', updateSaved);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-[#151413] flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16">
          
          {/* Welcome Header */}
          <div className="border-b border-[#C8C8C8] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="editorial-subheading text-[#66625C] block mb-2">
                Style Workspace &bull; Overview
              </span>
              <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#151413]">
                Welcome, {user?.name || 'Client'}.
              </h1>
              <p className="text-sm text-[#66625C] font-light max-w-xl mt-2 leading-relaxed">
                Your personal fashion intelligence center. Access your style archetype, review recent analyses, and explore runway silhouettes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="px-4 py-2.5 border border-[#C8C8C8] text-xs uppercase tracking-widest font-medium text-[#151413] hover:border-[#151413] transition-colors flex items-center gap-2"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Edit Preferences</span>
              </Link>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Action 1: Upload & Style Analysis */}
            <div className="border border-[#C8C8C8] p-8 md:p-10 bg-white flex flex-col justify-between hover:border-[#151413] transition-colors group">
              <div className="space-y-4">
                <div className="w-12 h-12 border border-[#DFDFDF] flex items-center justify-center bg-[#F7F7F6]">
                  <Sparkles className="w-5 h-5 text-[#0E0E0E]" />
                </div>
                <h3 className="text-2xl font-light text-[#151413] tracking-tight">
                  Initiate Style Analysis
                </h3>
                <p className="text-xs text-[#66625C] font-light leading-relaxed max-w-md">
                  Upload your personal photograph and a target outfit to generate an objective compatibility breakdown across fit, color, and silhouette.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#DFDFDF]">
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#151413] group-hover:underline"
                >
                  <span>Launch Analysis Studio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Action 2: Explore Runway */}
            <div className="border border-[#C8C8C8] p-8 md:p-10 bg-white flex flex-col justify-between hover:border-[#151413] transition-colors group">
              <div className="space-y-4">
                <div className="w-12 h-12 border border-[#DFDFDF] flex items-center justify-center bg-[#F7F7F6]">
                  <Compass className="w-5 h-5 text-[#0E0E0E]" />
                </div>
                <h3 className="text-2xl font-light text-[#151413] tracking-tight">
                  Explore 3D Runway
                </h3>
                <p className="text-xs text-[#66625C] font-light leading-relaxed max-w-md">
                  Browse six curated runway looks on our interactive 3D rotating stage. Inspect garment breakdowns, fabrics, dominant palettes, and suitability insights.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#DFDFDF]">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#151413] group-hover:underline"
                >
                  <span>Enter Runway Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

          {/* Style Profile Summary & Recommendation Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left (6/12): Personal Style Profile Summary */}
            <div className="lg:col-span-6 border border-[#C8C8C8] p-8 bg-white space-y-6">
              <div className="flex items-center justify-between border-b border-[#DFDFDF] pb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0E0E0E]" />
                  <span className="editorial-subheading text-[#151413]">
                    Personal Style Profile
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="text-[11px] uppercase tracking-wider text-[#66625C] hover:text-[#151413]"
                >
                  Update &rarr;
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2.5 border-b border-[#DFDFDF]">
                  <span className="text-xs text-[#66625C]">Body Archetype</span>
                  <span className="text-xs font-medium text-[#151413]">
                    {preferences.bodyType || 'Athletic / V-Taper'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-[#DFDFDF]">
                  <span className="text-xs text-[#66625C]">Primary Aesthetic</span>
                  <span className="text-xs font-medium text-[#151413]">
                    {preferences.preferredStyle || 'Minimalist Luxury'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-[#DFDFDF]">
                  <span className="text-xs text-[#66625C]">Skin Undertone</span>
                  <span className="text-xs font-medium text-[#151413]">
                    {preferences.skinTone || 'Cool / Neutral'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-[#DFDFDF]">
                  <span className="text-xs text-[#66625C]">Comfort & Fit Mode</span>
                  <span className="text-xs font-medium text-[#151413]">
                    {preferences.comfortLevel || 'Tailored & Balanced'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#66625C] font-light pt-2">
                These preferences actively calibrate the recommendations engine during each evaluation.
              </p>
            </div>

            {/* Right (6/12): Recommendation Highlights */}
            <div className="lg:col-span-6 border border-[#C8C8C8] p-8 bg-white space-y-6">
              <div className="flex items-center justify-between border-b border-[#DFDFDF] pb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0E0E0E]" />
                  <span className="editorial-subheading text-[#151413]">
                    Aesthetic Highlights
                  </span>
                </div>
                <Link
                  href="/recommendations"
                  className="text-[11px] uppercase tracking-wider text-[#66625C] hover:text-[#151413]"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF] space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold">
                    Optimal Palette
                  </span>
                  <p className="text-xs text-[#151413] font-light">
                    Deep Charcoal, Oatmeal Melange, and Midnight Navy establish clean chromatic contrast.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF] space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold">
                    Silhouette Prescription
                  </span>
                  <p className="text-xs text-[#151413] font-light">
                    High-rise wide-leg trousers paired with structured shoulder blazers ensure continuous vertical lineation.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F7F6] border border-[#DFDFDF] space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold">
                    Key Avoidance
                  </span>
                  <p className="text-xs text-[#66625C] font-light">
                    Low-rise skinny hems and bulky horizontal down padding disrupt natural proportion balance.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Saved Looks Collection */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#DFDFDF] pb-4">
              <div>
                <span className="editorial-subheading text-[#66625C] block mb-1">
                  Saved Looks
                </span>
                <h3 className="text-xl font-light text-[#151413]">
                  Your Style Collection ({savedCollection.length})
                </h3>
              </div>

              <Link
                href="/explore"
                className="text-xs uppercase tracking-wider text-[#151413] hover:underline"
              >
                Add Runway Looks &rarr;
              </Link>
            </div>

            {savedCollection.length === 0 ? (
              <div className="border border-[#DFDFDF] p-12 text-center bg-[#FBFBFA]">
                <Bookmark className="w-6 h-6 mx-auto text-[#66625C] mb-3 stroke-[1.5]" />
                <h4 className="text-sm font-medium text-[#151413] uppercase tracking-wider mb-1">
                  No Saved Looks Yet
                </h4>
                <p className="text-xs text-[#66625C] font-light mb-6">
                  Save outfits from the Runway or bookmark style intelligence analyses to review them here.
                </p>
                <Link
                  href="/explore"
                  className="px-6 py-3 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-medium"
                >
                  Explore The Runway
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {savedCollection.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#C8C8C8] p-4 bg-white group hover:border-[#151413] transition-colors"
                  >
                    <div className="aspect-[3/4] bg-[#F7F7F6] overflow-hidden mb-3 border border-[#DFDFDF]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#66625C] block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-normal text-[#151413] truncate mb-3">
                      {item.name}
                    </h4>
                    <Link
                      href="/upload"
                      onClick={() => sessionStorage.setItem('selectedRunwayLook', JSON.stringify(item))}
                      className="text-[11px] font-medium uppercase tracking-wider text-[#151413] hover:underline flex items-center gap-1"
                    >
                      Analyze &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Analyses Archive */}
          {recentAnalyses.length > 0 && (
            <section className="space-y-6">
              <div className="border-b border-[#DFDFDF] pb-4 flex items-center justify-between">
                <div>
                  <span className="editorial-subheading text-[#66625C] block mb-1">
                    Historical Log
                  </span>
                  <h3 className="text-xl font-light text-[#151413]">
                    Recent Analyses ({recentAnalyses.length})
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentAnalyses.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-[#C8C8C8] p-5 bg-white space-y-4 hover:border-[#151413] transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-20 bg-[#F7F7F6] border border-[#DFDFDF] overflow-hidden shrink-0">
                        <img
                          src={item.originalUserImageUrl}
                          alt="Subject"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-16 h-20 bg-[#F7F7F6] border border-[#DFDFDF] overflow-hidden shrink-0">
                        <img
                          src={item.outfitImageUrl}
                          alt="Garment"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <span className="text-[10px] text-[#66625C] font-mono">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <div className="text-sm font-semibold text-[#151413]">
                          {item.outfitAnalysisId?.analysis?.suitabilityScore || 85}% Match
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
