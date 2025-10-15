"use client";

import { Trash2, Upload, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useImageInput } from "../hooks";

type ImageInputProps = {
  value: File[];
  onChange: (files: File[]) => void;
  onBlur?: () => void;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
};

export function ImageInput({
  value,
  onChange,
  onBlur,
  name,
  ref,
  disabled,
  className = "",
}: ImageInputProps) {
  const { previews, handleFiles, removeImage, removeAll } = useImageInput({
    value,
    onChange,
    onBlur,
  });

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="relative border-2 border-dashed border-gray-300 hover:border-gray-400 transition rounded-lg p-3 flex flex-col gap-3 items-center justify-between h-full">
        <div className="grid grid-cols-2 gap-2 w-full h-full overflow-auto p-1">
          {previews.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded overflow-hidden"
            >
              <Image
                src={src}
                alt={`preview-${idx}`}
                fill
                unoptimized
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Eliminar imagen"
                disabled={disabled}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md ${
              disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-gray-50"
            } transition aspect-square relative`}
          >
            <Upload className="h-5 w-5 text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">Agregar</span>

            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp"
              name={name}
              ref={ref}
              disabled={disabled}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={e => handleFiles(e.target.files)}
              onBlur={onBlur}
            />
          </div>
        </div>

        {value.length > 0 && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="w-full mt-2 cursor-pointer"
            onClick={removeAll}
            disabled={disabled}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar todas ({value.length})
          </Button>
        )}
      </div>

      <p className="text-xs text-gray-500">
        {value.length} imágenes • Formatos: JPG, JPEG, PNG, WEBP • Máx: 5 MB por
        archivo
      </p>
    </div>
  );
}
