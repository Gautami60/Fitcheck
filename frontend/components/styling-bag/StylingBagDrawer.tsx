"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowUpRight, ShoppingBag, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SavedLookItem, StylingBagItem } from '../../types/runway';
import {
  getSavedLooks,
  removeSavedLook,
  getStylingBag,
  removeFromStylingBag,
} from '../../utils/savedLooks';

interface StylingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StylingBagDrawer({ isOpen, onClose }: StylingBagDrawerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bag' | 'saved'>('bag');
  const [bagItems, setBagItems] = useState<StylingBagItem[]>([]);
  const [savedLooks, setSavedLooks] = useState<SavedLookItem[]>([]);

  useEffect(() => {
    const load = () => {
      setBagItems(getStylingBag());
      setSavedLooks(getSavedLooks());
    };
    load();

    window.addEventListener('fitcheck_styling_bag_updated', load);
    window.addEventListener('fitcheck_saved_looks_updated', load);
    return () => {
      window.removeEventListener('fitcheck_styling_bag_updated', load);
      window.removeEventListener('fitcheck_saved_looks_updated', load);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleAnalyzeSavedLook = (item: SavedLookItem | StylingBagItem) => {
    sessionStorage.setItem('selectedRunwayLook', JSON.stringify(item));
    onClose();
    router.push('/upload');
  };

  const totalCount = bagItems.length + savedLooks.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#C8C8C8]"
          >
            {/* Drawer Header */}
            <div className="h-[88px] px-8 border-b border-[#C8C8C8] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#151413]" />
                <span className="editorial-subheading text-[#151413] tracking-widest font-semibold">
                  Styling Collection ({totalCount})
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close styling bag"
                className="w-10 h-10 border border-[#C8C8C8] flex items-center justify-center hover:bg-[#151413] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#DFDFDF] bg-[#FBFBFA]">
              <button
                onClick={() => setActiveTab('bag')}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'bag'
                    ? 'border-[#0E0E0E] text-[#151413] bg-white'
                    : 'border-transparent text-[#66625C] hover:text-[#151413]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Bag Items ({bagItems.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'saved'
                    ? 'border-[#0E0E0E] text-[#151413] bg-white'
                    : 'border-transparent text-[#66625C] hover:text-[#151413]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Looks ({savedLooks.length})</span>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
              
              {/* TAB 1: STYLING BAG ITEMS (Garments with Sizes) */}
              {activeTab === 'bag' && (
                bagItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4">
                    <div className="w-16 h-16 border border-[#C8C8C8] flex items-center justify-center mb-6 text-[#66625C]">
                      <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-light text-xl text-[#151413] mb-2 tracking-tight">
                      Your Styling Bag is Empty
                    </h3>
                    <p className="text-[#66625C] text-xs leading-relaxed max-w-xs mb-8 font-light">
                      Click interactive hotspots on runway models to select sizes and add garments to your styling curation.
                    </p>
                    <Link
                      href="/explore"
                      onClick={onClose}
                      className="inline-block px-6 py-3.5 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2A2927] transition-colors"
                    >
                      Explore Runway
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bagItems.map((item) => (
                      <div
                        key={item.id}
                        className="group border border-[#C8C8C8] p-4 flex gap-4 bg-white hover:border-[#151413] transition-colors relative"
                      >
                        <div className="w-20 h-24 bg-[#F7F7F6] overflow-hidden shrink-0 border border-[#DFDFDF]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-medium">
                                {item.category}
                              </span>
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 border border-[#151413] bg-[#151413] text-white tracking-widest">
                                Size {item.size}
                              </span>
                            </div>
                            <h4 className="text-xs font-medium text-[#151413] line-clamp-1 tracking-tight">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[#66625C] font-light mt-0.5">
                              From: {item.lookName} &bull; {item.color}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#DFDFDF] mt-2">
                            <button
                              onClick={() => handleAnalyzeSavedLook(item)}
                              className="text-[10px] font-medium uppercase tracking-wider text-[#151413] hover:underline flex items-center gap-1"
                            >
                              Analyze Piece <ArrowUpRight className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromStylingBag(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="text-[#66625C] hover:text-red-600 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* TAB 2: SAVED LOOKS (Full Outfits & Analyses) */}
              {activeTab === 'saved' && (
                savedLooks.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4">
                    <div className="w-16 h-16 border border-[#C8C8C8] flex items-center justify-center mb-6 text-[#66625C]">
                      <Bookmark className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-light text-xl text-[#151413] mb-2 tracking-tight">
                      No Saved Looks
                    </h3>
                    <p className="text-[#66625C] text-xs leading-relaxed max-w-xs mb-8 font-light">
                      Save complete runway looks or bookmark your style compatibility analyses.
                    </p>
                    <Link
                      href="/explore"
                      onClick={onClose}
                      className="inline-block px-6 py-3.5 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2A2927] transition-colors"
                    >
                      Browse Runway Looks
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedLooks.map((item) => (
                      <div
                        key={item.id}
                        className="group border border-[#C8C8C8] p-4 flex gap-4 bg-white hover:border-[#151413] transition-colors relative"
                      >
                        <div className="w-20 h-28 bg-[#F7F7F6] overflow-hidden shrink-0 border border-[#DFDFDF]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-medium">
                                {item.category}
                              </span>
                              {item.score && (
                                <span className="text-[11px] font-semibold text-[#0E0E0E] tracking-wider">
                                  {item.score}% Match
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-normal text-[#151413] line-clamp-1 tracking-tight">
                              {item.name}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#DFDFDF] mt-2">
                            <button
                              onClick={() => handleAnalyzeSavedLook(item)}
                              className="text-[11px] font-medium uppercase tracking-wider text-[#151413] hover:underline flex items-center gap-1"
                            >
                              Analyze Look <ArrowUpRight className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeSavedLook(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="text-[#66625C] hover:text-red-600 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

            </div>

            {/* Drawer Footer */}
            {totalCount > 0 && (
              <div className="p-6 md:p-8 border-t border-[#C8C8C8] bg-[#F7F7F6] space-y-3">
                <Link
                  href="/upload"
                  onClick={onClose}
                  className="w-full block py-4 bg-[#0E0E0E] text-white text-center text-xs uppercase tracking-widest font-medium hover:bg-[#2A2927] transition-colors"
                >
                  Analyze Outfit With My Photo
                </Link>
                <p className="text-[10px] text-center text-[#66625C] tracking-wide uppercase">
                  Styling Bag &bull; Discovery &amp; Fit Intelligence
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
