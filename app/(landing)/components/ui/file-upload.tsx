"use client";

import React, { useRef, useState } from "react";
import { FiImage, FiTrash2, FiUploadCloud } from "react-icons/fi";

type TFileUploadProps = {
  onFileSelect?: (file: File | null) => void;
};

const FileUpload = ({ onFileSelect }: TFileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (selectedFile?: File) => {
    if (!selectedFile) return; // "return early", langsung return, jadi logika selanjutnya tidak dieksekusi

    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  };

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFileChange(e.dataTransfer.files?.[0]);
      }}
      className={`flex flex-col justify-center items-center w-full py-6 border border-dashed border-primary bg-primary/10 ${
        file ? "" : "cursor-pointer"
      }`}
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
        disabled={file ? true : false}
      />
      {!file ? (
        <div className="text-center py-8">
          <FiUploadCloud className="text-primary mx-auto" />
          <p className="text-xs">Upload Your Payment Receipt here</p>
        </div>
      ) : (
        <div className="text-center">
          <FiImage className="text-primary mx-auto" size={28} />
          <p className="text-sm text-primary">{file.name}</p>
          <p className="text-sm text-gray-400">
            {(file.size / 1024).toFixed(1)} KB
          </p>
          <button
            onClick={removeFile}
            className={`flex gap-2 bg-primary/90 text-white mx-auto mt-4 px-2 ${
              file && "cursor-pointer"
            }`}
          >
            <FiTrash2 size={14} className="self-center" /> Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
