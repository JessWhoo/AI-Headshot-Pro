import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from './Button';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_MB } from '../constants';

interface ImageUploaderProps {
  currentImage: string | null;
  onImageSelect: (base64: string) => void;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageSelect, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (currentImage) {
    return (
      <div className="relative group w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700 shadow-2xl">
        <img 
          src={currentImage} 
          alt="Original Upload" 
          className="w-full h-full object-contain bg-black/20"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-4">
          <Button variant="outline" onClick={onClear} icon={<X className="w-4 h-4" />}>
            Remove
          </Button>
          <Button variant="primary" onClick={triggerUpload} icon={<Upload className="w-4 h-4" />}>
            Change
          </Button>
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10">
          Original
        </div>
        {/* Hidden input remains for change action */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept={ACCEPTED_IMAGE_TYPES.join(',')} 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </div>
    );
  }

  return (
    <div 
      className="w-full h-64 sm:h-80 md:h-96 border-2 border-dashed border-slate-700 rounded-2xl hover:border-indigo-500 hover:bg-slate-800/50 transition-all duration-300 flex flex-col items-center justify-center p-6 cursor-pointer group"
      onClick={triggerUpload}
    >
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-black/20">
        <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Upload your selfie</h3>
      <p className="text-sm text-slate-400 text-center max-w-xs">
        Drag & drop or click to upload. Supported formats: JPG, PNG, WebP.
      </p>
      <input 
        ref={fileInputRef}
        type="file" 
        accept={ACCEPTED_IMAGE_TYPES.join(',')} 
        className="hidden" 
        onChange={handleFileChange} 
      />
    </div>
  );
};