"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: {
    url: string;
    alt: string;
  }[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex];

  if (!selectedImage) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-16 h-16 bg-gray-100 overflow-hidden border transition-colors ${
                index === selectedIndex
                  ? "border-black"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
