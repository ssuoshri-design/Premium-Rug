import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (base64Url: string) => void;
  onClear?: () => void;
  currentImage?: string;
  label?: string;
  maxSizeMB?: number;
}

export default function ImageUpload({ 
  onImageUploaded, 
  onClear, 
  currentImage = "", 
  label = "Upload Image Asset",
  maxSizeMB = 2 
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file) return;

    // Type validation
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    // Size check
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`Image size exceeds ${maxSizeMB}MB limit. Please compress the file.`);
      return;
    }

    setError(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImageUploaded(reader.result);
      } else {
        setError('Failed to convert image to base64 encoding.');
      }
      setLoading(false);
    };

    reader.onerror = () => {
      setError('Error reading file. Please try a different photo.');
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2 text-left font-sans">
      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">
        {label}
      </span>

      {error && (
        <div className="p-3 bg-red-950/45 border border-red-500/20 rounded flex items-start gap-2 text-red-400 text-xs leading-relaxed animate-fadeIn">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {currentImage ? (
        <div className="relative rounded-xl overflow-hidden border border-amber-500/20 bg-neutral-900 group aspect-video">
          <img 
            src={currentImage} 
            alt="Uploaded Preview" 
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleAreaClick}
              className="px-3.5 py-1.5 bg-neutral-900/90 text-amber-400 border border-amber-400/30 hover:border-amber-400 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Replace Photo
            </button>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="p-1.5 bg-red-950/90 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition cursor-pointer font-bold"
                title="Remove Asset"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <span className="absolute bottom-2.5 left-2.5 bg-black/85 border border-amber-500/30 text-amber-400 text-[8px] uppercase tracking-widest font-bold py-1 px-2.5 rounded shadow">
            Dimensions Verified
          </span>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleAreaClick}
          className={`relative border border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer transition-all duration-300 aspect-video select-none ${
            dragActive 
              ? 'border-amber-400 bg-amber-500/5 scale-[0.99] shadow-inner' 
              : 'border-neutral-200 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-950/70 hover:border-amber-500/40 hover:bg-amber-500/2'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleChange}
            accept="image/*"
            className="hidden" 
          />

          <div className={`p-4 rounded-full border bg-neutral-900 shadow ${
            dragActive ? 'border-amber-400 text-amber-400 scale-110' : 'border-neutral-800 text-neutral-400'
          } transition-all`}>
            {loading ? (
              <div className="h-5 w-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-bold text-neutral-800 dark:text-neutral-350 tracking-wide">
              {dragActive ? "Drop your photo master to load..." : "Drag & Drop Image or Click to Browse"}
            </p>
            <p className="text-[9px] text-neutral-400 tracking-normal font-light">
              Supports JPEG, PNG, WEBP (Max {maxSizeMB}MB)
            </p>
          </div>

          <div className="flex items-center gap-1.5 opacity-40">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span className="text-[8px] font-mono tracking-widest uppercase text-neutral-400">Atelier Real-Time Storage</span>
          </div>
        </div>
      )}
    </div>
  );
}
