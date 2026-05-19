"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, UserCircle, Shirt, Loader2, X, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '../../services/api';

export default function UploadPage() {
  const router = useRouter();

  const [userImage, setUserImage] = useState<File | null>(null);
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
  
  const [outfitImage, setOutfitImage] = useState<File | null>(null);
  const [outfitImagePreview, setOutfitImagePreview] = useState<string | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<{title: string, desc: string} | null>(null);

  const userFileInputRef = useRef<HTMLInputElement>(null);
  const outfitFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'user' | 'outfit') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError({title: 'Invalid File', desc: 'Please upload a valid image file.'});
      return;
    }
    
    setError(null);
    const previewUrl = URL.createObjectURL(file);
    
    if (type === 'user') {
      setUserImage(file);
      setUserImagePreview(previewUrl);
    } else {
      setOutfitImage(file);
      setOutfitImagePreview(previewUrl);
    }
  };

  const removeImage = (type: 'user' | 'outfit', e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'user') {
      setUserImage(null);
      setUserImagePreview(null);
      if (userFileInputRef.current) userFileInputRef.current.value = '';
    } else {
      setOutfitImage(null);
      setOutfitImagePreview(null);
      if (outfitFileInputRef.current) outfitFileInputRef.current.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!userImage || !outfitImage) {
      setError({title: 'Missing Assets', desc: 'Please upload both a subject photograph and a target garment.'});
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // 1. Upload User Image
      const userFormData = new FormData();
      userFormData.append('image', userImage);
      const userRes = await api.post('/upload', userFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const userImageUrl = userRes.data.url;

      // 2. Upload Outfit Image
      const outfitFormData = new FormData();
      outfitFormData.append('image', outfitImage);
      const outfitRes = await api.post('/upload', outfitFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const outfitImageUrl = outfitRes.data.url;

      // 3. Generate Try-On
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const tryonRes = await api.post('/tryon/generate', {
        userImageUrl,
        outfitImageUrl,
        userId: user.id || null
      });

      // Save result to session storage
      sessionStorage.setItem('tryonResult', JSON.stringify(tryonRes.data));
      
      router.push('/try-on');
      
    } catch (err: any) {
      console.error(err);
      // Premium Error Handling (No red banners)
      setError({
        title: 'Service Temporarily Unavailable',
        desc: 'Preview temporarily unavailable. Please retry. ' + (err.response?.data?.message || '')
      });
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070707] text-[#ededed] p-8 md:p-12 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors uppercase tracking-widest font-medium">
            ← Back to Dashboard
          </Link>
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Step 1 of 2</div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-light tracking-tight mb-4">
            Upload <span className="font-bold">Assets</span>
          </h1>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            Provide a clear, full-body photograph and an image of the target outfit to generate your AI Style Preview.
          </p>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md max-w-xl mx-auto flex items-start gap-4 text-left"
            >
              <div className="p-2 bg-white/10 rounded-lg shrink-0">
                <Info className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{error.title}</h3>
                <p className="text-zinc-400 text-sm font-light">{error.desc}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <input type="file" accept="image/*" className="hidden" ref={userFileInputRef} onChange={(e) => handleFileChange(e, 'user')} />
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-2 rounded-3xl"
          >
            <div 
              onClick={() => !userImagePreview && userFileInputRef.current?.click()}
              className={`border border-dashed rounded-2xl h-80 flex flex-col items-center justify-center transition-all relative overflow-hidden ${userImagePreview ? 'border-white/10' : 'border-white/10 hover:border-violet-500/50 hover:bg-violet-500/5 cursor-pointer group'}`}
            >
              {userImagePreview ? (
                <>
                  <img src={userImagePreview} alt="User" className="w-full h-full object-cover rounded-xl" />
                  <button onClick={(e) => removeImage('user', e)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UserCircle className="w-8 h-8 text-zinc-400 group-hover:text-violet-400 transition-colors" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Subject Photograph</h3>
                  <p className="text-zinc-500 text-sm font-light">Click to browse files</p>
                </>
              )}
            </div>
          </motion.div>

          <input type="file" accept="image/*" className="hidden" ref={outfitFileInputRef} onChange={(e) => handleFileChange(e, 'outfit')} />
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-2 rounded-3xl"
          >
            <div 
              onClick={() => !outfitImagePreview && outfitFileInputRef.current?.click()}
              className={`border border-dashed rounded-2xl h-80 flex flex-col items-center justify-center transition-all relative overflow-hidden ${outfitImagePreview ? 'border-white/10' : 'border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 cursor-pointer group'}`}
            >
              {outfitImagePreview ? (
                <>
                  <img src={outfitImagePreview} alt="Outfit" className="w-full h-full object-cover rounded-xl" />
                  <button onClick={(e) => removeImage('outfit', e)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shirt className="w-8 h-8 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Target Garment</h3>
                  <p className="text-zinc-500 text-sm font-light">Click to browse files</p>
                </>
              )}
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <button 
            onClick={handleGenerate}
            disabled={isUploading || !userImage || !outfitImage}
            className="px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Style Data...
              </>
            ) : (
              <>
                Generate Style Preview
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>

      </div>
    </main>
  );
}
