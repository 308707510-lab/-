import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export default function ImageUploader({
  onImageSelect,
  selectedImage,
  onClear,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      {!selectedImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
            ${
              isDragging
                ? 'border-gold-accent bg-cream'
                : 'border-stone hover:border-wood-dark hover:bg-cream/50'
            }
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-wood-dark/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-wood-dark" />
              </div>
              <div>
                <p className="text-lg font-medium text-wood-dark">
                  拖拽图片到这里或点击上传
                </p>
                <p className="text-sm text-stone mt-1">
                  支持 JPG、PNG 等常见图片格式
                </p>
              </div>
            </div>
          </label>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border-2 border-stone/30">
          <button
            onClick={onClear}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedImage}
            alt="上传的图片"
            className="w-full max-h-[400px] object-contain bg-stone/10"
          />
        </div>
      )}
    </div>
  );
}
