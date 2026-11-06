"use client";

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, RefreshCw, AlertCircle } from 'lucide-react';

interface ImageDropzoneProps {
  label: string;
  stepNumber: string;
  subtitle: string;
  file?: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File | null) => void;
  onUrlSelect?: (url: string | null) => void;
  accept?: string;
  maxSizeMb?: number;
}

export default function ImageDropzone({
  label,
  stepNumber,
  subtitle,
  previewUrl,
  onFileSelect,
  onUrlSelect,
  accept = 'image/jpeg,image/png,image/webp,image/jpg',
  maxSizeMb = 10,
}: ImageDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = (selectedFile: File) => {
    setError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a valid JPG, PNG, or WebP image.');
      return;
    }

    if (selectedFile.size > maxSizeMb * 1024 * 1024) {
      setError(`Image size exceeds the ${maxSizeMb}MB maximum limit.`);
      return;
    }

    onFileSelect(selectedFile);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      validateAndSet(selected);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSet(droppedFile);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (onUrlSelect) onUrlSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setError(null);
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Zone Header */}
      <div className="flex items-center justify-between">
        <span className="editorial-subheading text-[#66625C]">
          {stepNumber} &bull; {label}
        </span>
        <span className="text-[10px] text-[#66625C] uppercase tracking-wider">
          Up to {maxSizeMb}MB
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !previewUrl && fileInputRef.current?.click()}
        className={`relative border flex-1 min-h-[380px] md:min-h-[440px] flex flex-col items-center justify-center p-6 text-center transition-all duration-200 ${
          previewUrl
            ? 'border-[#C8C8C8] bg-white'
            : isDragOver
            ? 'border-[#0E0E0E] bg-[#F7F7F6]'
            : 'border-[#DFDFDF] hover:border-[#151413] bg-[#FBFBFA] cursor-pointer'
        }`}
      >
        {previewUrl ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
            {/* Image Preview */}
            <img
              src={previewUrl}
              alt={label}
              className="max-h-[360px] md:max-h-[400px] w-auto object-contain mx-auto"
            />

            {/* Overlay Action Buttons */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 bg-white/95 border border-[#C8C8C8] hover:border-[#151413] text-[#151413] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-white/95 border border-[#C8C8C8] hover:border-red-600 hover:text-red-600 text-[#151413] shadow-sm"
                aria-label={`Remove ${label}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-xs space-y-4">
            <div className="w-14 h-14 border border-[#DFDFDF] flex items-center justify-center bg-white text-[#151413]">
              <Upload className="w-5 h-5 stroke-[1.5]" />
            </div>

            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-[#151413] mb-1">
                Drag & Drop or Click to Browse
              </h4>
              <p className="text-xs text-[#66625C] font-light leading-relaxed">
                {subtitle}
              </p>
            </div>

            <span className="text-[10px] text-[#66625C] tracking-widest uppercase border-t border-[#DFDFDF] pt-3 w-full">
              JPG &bull; PNG &bull; WEBP
            </span>
          </div>
        )}
      </div>

      {/* Validation Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-red-600 pt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
