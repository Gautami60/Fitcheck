"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2, AlertCircle, Sparkles, Check } from 'lucide-react';
import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';
import ImageDropzone from '../../components/upload/ImageDropzone';
import api from '../../services/api';
import { RUNWAY_LOOKS } from '../../data/runwayLooks';

export default function UploadPage() {
  const router = useRouter();

  const [userImage, setUserImage] = useState<File | null>(null);
  const [userPreviewUrl, setUserPreviewUrl] = useState<string | null>(null);

  const [outfitImage, setOutfitImage] = useState<File | null>(null);
  const [outfitPreviewUrl, setOutfitPreviewUrl] = useState<string | null>(null);
  const [preselectedLookName, setPreselectedLookName] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStepText, setUploadStepText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check for pre-selected look from Runway or Saved collection
  useEffect(() => {
    const rawLook = sessionStorage.getItem('selectedRunwayLook');
    if (rawLook) {
      try {
        const lookData = JSON.parse(rawLook);
        if (lookData.image) {
          setOutfitPreviewUrl(lookData.image);
          setPreselectedLookName(lookData.name || 'Selected Runway Look');
        }
      } catch (e) {
        console.error('Failed to parse selected runway look', e);
      }
    }
  }, []);

  // Update previews on file change
  const handleUserFileChange = (file: File | null) => {
    setUserImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setUserPreviewUrl(url);
    } else {
      setUserPreviewUrl(null);
    }
  };

  const handleOutfitFileChange = (file: File | null) => {
    setOutfitImage(file);
    setPreselectedLookName(null);
    if (file) {
      const url = URL.createObjectURL(file);
      setOutfitPreviewUrl(url);
    } else {
      setOutfitPreviewUrl(null);
    }
  };

  const handleSelectQuickLook = (look: typeof RUNWAY_LOOKS[0]) => {
    setOutfitImage(null);
    setOutfitPreviewUrl(look.image);
    setPreselectedLookName(look.name);
    sessionStorage.setItem(
      'selectedRunwayLook',
      JSON.stringify({
        id: look.id,
        name: look.name,
        image: look.image,
        category: look.outfitCategory,
      })
    );
  };

  const handleAnalyze = async () => {
    if (!userPreviewUrl || !outfitPreviewUrl) {
      setErrorMessage('Please provide both your photograph and a target outfit to begin analysis.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      let finalUserUrl = '';
      let finalOutfitUrl = '';

      // 1. Upload User Image
      setUploadStepText('Digitizing personal silhouette...');
      if (userImage) {
        const userFormData = new FormData();
        userFormData.append('image', userImage);
        const userRes = await api.post('/upload', userFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        finalUserUrl = userRes.data.url;
      } else {
        finalUserUrl = userPreviewUrl;
      }

      // 2. Upload Outfit Image or use existing remote URL
      setUploadStepText('Analyzing garment proportions and fabric...');
      if (outfitImage) {
        const outfitFormData = new FormData();
        outfitFormData.append('image', outfitImage);
        const outfitRes = await api.post('/upload', outfitFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        finalOutfitUrl = outfitRes.data.url;
      } else {
        finalOutfitUrl = outfitPreviewUrl;
      }

      // 3. Request Style Intelligence Report
      setUploadStepText('Synthesizing fashion compatibility intelligence...');
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const tryonRes = await api.post('/tryon/generate', {
        userImageUrl: finalUserUrl,
        outfitImageUrl: finalOutfitUrl,
        userId: storedUser.id || null,
      });

      // Save to sessionStorage
      sessionStorage.setItem('tryonResult', JSON.stringify(tryonRes.data));

      // Continue to results
      router.push('/try-on');
    } catch (err: any) {
      console.error('Upload & analysis error:', err);
      setErrorMessage(
        err.response?.data?.message ||
          'Style analysis service is currently synchronizing. Please retry in a moment.'
      );
      setIsUploading(false);
      setUploadStepText('');
    }
  };

  const canSubmit = Boolean(userPreviewUrl && outfitPreviewUrl && !isUploading);

  return (
    <div className="min-h-screen bg-white text-[#151413] flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="border-b border-[#C8C8C8] pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="editorial-subheading text-[#66625C] block mb-2">
                Step 01 &bull; Asset Digitization
              </span>
              <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#151413]">
                Style Analysis Studio
              </h1>
              <p className="text-sm text-[#66625C] font-light max-w-xl mt-2 leading-relaxed">
                Provide a clear photograph of your silhouette and the outfit you wish to evaluate. Our intelligence engine analyzes physical proportions, color undertones, and drape harmony.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/explore"
                className="px-4 py-2.5 border border-[#C8C8C8] text-xs uppercase tracking-widest font-medium text-[#151413] hover:border-[#151413] transition-colors"
              >
                Browse Runway Looks
              </Link>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-8 p-4 bg-[#FFF8F8] border border-[#F0D0D0] text-xs text-[#8A2525] flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold uppercase tracking-wider block mb-0.5">
                  Input Verification
                </span>
                <p className="font-light">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Two Upload Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Zone 1: Your Photo */}
            <div className="border border-[#C8C8C8] p-6 md:p-8 bg-white flex flex-col justify-between">
              <ImageDropzone
                stepNumber="01"
                label="Your Photo"
                subtitle="Full-length portrait with neutral lighting and minimal obstruction."
                file={userImage}
                previewUrl={userPreviewUrl}
                onFileSelect={handleUserFileChange}
              />
            </div>

            {/* Zone 2: Outfit Inspiration */}
            <div className="border border-[#C8C8C8] p-6 md:p-8 bg-white flex flex-col justify-between">
              <div>
                <ImageDropzone
                  stepNumber="02"
                  label="Outfit Inspiration"
                  subtitle="Flat-lay or model photograph of the target garment."
                  file={outfitImage}
                  previewUrl={outfitPreviewUrl}
                  onFileSelect={handleOutfitFileChange}
                  onUrlSelect={setOutfitPreviewUrl}
                />

                {preselectedLookName && (
                  <div className="mt-3 p-3 bg-[#F7F7F6] border border-[#DFDFDF] flex items-center justify-between text-xs">
                    <span className="text-[#66625C]">Active Selection:</span>
                    <span className="font-medium text-[#151413] truncate max-w-[200px]">
                      {preselectedLookName}
                    </span>
                  </div>
                )}
              </div>

              {/* Quick-Pick From Runway Looks */}
              <div className="mt-6 pt-6 border-t border-[#DFDFDF]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-semibold">
                    Or Select From Runway Catalog
                  </span>
                  <Link
                    href="/explore"
                    className="text-[10px] uppercase tracking-wider text-[#151413] hover:underline"
                  >
                    View All (06) &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {RUNWAY_LOOKS.map((look) => {
                    const isSelected = outfitPreviewUrl === look.image;
                    return (
                      <button
                        key={look.id}
                        type="button"
                        onClick={() => handleSelectQuickLook(look)}
                        title={look.name}
                        className={`relative aspect-[3/4] border overflow-hidden transition-all ${
                          isSelected
                            ? 'border-[#0E0E0E] ring-2 ring-[#0E0E0E]'
                            : 'border-[#DFDFDF] hover:border-[#C8C8C8]'
                        }`}
                      >
                        <img
                          src={look.image}
                          alt={look.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-[#0E0E0E] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Action Trigger Bar */}
          <div className="border border-[#C8C8C8] p-8 bg-[#FBFBFA] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="editorial-subheading text-[#151413] flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#0E0E0E]" />
                Ready For Fashion Intelligence
              </span>
              <p className="text-xs text-[#66625C] font-light">
                {uploadStepText || 'Both assets will be evaluated through our local silhouette and chromatic engine.'}
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!canSubmit}
              className="w-full md:w-auto px-10 py-5 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2927] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-sm"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{uploadStepText || 'Processing Analysis...'}</span>
                </>
              ) : (
                <>
                  <span>Analyze Compatibility</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
