"use client";

import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
  label?: string;
  value?: string | null;
  onChange?: (file: File) => void;
  className?: string;
};
const ImageUploadPreview = ({
  label,
  value,
  onChange,
  className,
}: TImageUploadPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onChange(file);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-dark mb-2">
        {label}
      </label>
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed border-primary bg-primary/5 rounded-lg h-50 flex flex-col justify-center items-center cursor-pointer"
      >
        {value ? (
          <Image
            src={value}
            alt="preview"
            width={190}
            height={190}
            className="max-w-50 h-full object-contain"
          />
        ) : (
          <>
            <FiUploadCloud className="text-primary" size={24} />
            <span className="text-sm font-medium">Click to upload</span>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
