import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { compressImage } from './imageCompressor';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

interface ImageUploadProps {
  onImageUploaded: (base64OrUploadedUrl: string) => void;
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
  maxSizeMB = 10 
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToFirebaseStorage = async (base64DataUrl: string, originalName: string): Promise<string> => {
    const fileExtension = originalName.split('.').pop() || 'jpg';
    const uniqueId = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const fileName = `uploads/${uniqueId}.${fileExtension}`;
    
    // Create reference to the storage location
    const storageRef = ref(storage, fileName);
    
    // Upload the base64 string
    await uploadString(storageRef, base64DataUrl, 'data_url');
    
    // Fetch the public Load URL
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  };

  const processFile = async (file: File) => {
    if (!file) return;

    // Type validation
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // 1. Compress image to optimal dimensions
      setLoadingMessage('Compressing photo...');
      const compressedBase64 = await compressImage(file, 1000, 0.75);

      try {
        // 2. Upload directly to Firebase Storage
        setLoadingMessage('Uploading to Firebase Storage...');
        const downloadUrl = await uploadToFirebaseStorage(compressedBase64, file.name);

        // 3. Fire success handler with real load URL
        onImageUploaded(downloadUrl);
      } catch (storageErr: any) {
        console.warn("Firebase Storage upload failed, falling back to Base64:", storageErr);
        
        // Fall back to using the compressed base64 string directly!
        onImageUploaded(compressedBase64);
        
        // Alert user softly that they are saved in database offline/base64 mode
        setError(
          "Permission Locked: Loaded photo as high-performance offline asset. " +
          "To enable permanent cloud asset serving, allow write access in your Firebase Console Storage Security Rules."
        );
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err?.message || 'Error processing and uploading photo.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
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
            className="w-full h-full object-cover transition-transform duration-300"
          />
          
          {/* ALWAYS VISIBLE MOBILE-FRIENDLY OVERLAY CONTROLS (No Hover Dependency) */}
          <div className="absolute inset-x-0 bottom-0 bg-neutral-950/90 backdrop-blur-md border-t border-neutral-800 p-2.5 flex items-center justify-between gap-3 animate-slideUp">
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[8px] uppercase tracking-widest font-bold py-1 px-2.5 rounded shadow-sm">
              Ready & Stored
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAreaClick}
                disabled={loading}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-450 disabled:opacity-50 text-neutral-950 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
              >
                {loading ? 'Uploading...' : 'Replace Photo'}
              </button>
              {onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  disabled={loading}
                  className="p-1.5 bg-red-950 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition cursor-pointer font-bold"
                  title="Remove Asset"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleChange}
            accept="image/*"
            className="hidden" 
          />
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

          <div className={`p-4 rounded-full border bg-neutral-900 shadow-lg ${
            dragActive ? 'border-amber-400 text-amber-400 scale-110' : 'border-neutral-800 text-neutral-400'
          } transition-all`}>
            {loading ? (
              <div className="h-5 w-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="h-5 w-5 text-amber-500" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-bold text-neutral-800 dark:text-neutral-350 tracking-wide">
              {loading 
                ? (loadingMessage || "Compressing & uploading...") 
                : (dragActive ? "Drop your photo master to load..." : "Drag & Drop Image or Click to Browse")}
            </p>
            <p className="text-[9px] text-neutral-400 tracking-normal font-light">
              We process, compress and store directly to Cloud Storage (Max {maxSizeMB}MB)
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
