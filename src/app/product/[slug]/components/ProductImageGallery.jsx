// src/app/product/[slug]/components/ProductImageGallery.jsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ProductImageGallery = ({
  thumbnailSrc,
  galleryImages = [],
  productName,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // এই কোডটি নিরাপদে প্রথম ছবিটি সেট করে
    if (thumbnailSrc) {
      setSelectedImage({
        id: "thumbnail",
        src: thumbnailSrc,
        alt: `${productName} main image`,
      });
    } else if (galleryImages.length > 0) {
      setSelectedImage(galleryImages[0]);
    } else {
      setSelectedImage(null);
    }
  }, [thumbnailSrc, galleryImages, productName]);

  const allImages = [];
  if (thumbnailSrc) {
    allImages.push({
      id: "thumbnail",
      src: thumbnailSrc,
      alt: `${productName} main image`,
    });
  }
  allImages.push(...galleryImages);

  if (!selectedImage) {
    // যদি কোনো ছবিই না থাকে, তাহলে একটি ফলব্যাক মেসেজ দেখানো হবে
    return (
      <div className="w-full max-w-2xl mx-auto aspect-square relative rounded-2xl flex items-center justify-center bg-base-200">
        <p className="text-base-content/70">No image available.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image Display */}
      <div className="w-full max-w-2xl mx-auto aspect-square relative rounded-2xl overflow-hidden bg-base-100/30 shadow-lg">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt || productName}
          fill
          className="object-contain"
          key={selectedImage.id}
          priority
        />
      </div>

      {/* Thumbnail Previews (যদি একাধিক ছবি থাকে) */}
      {allImages.length > 1 && (
        <div className="flex justify-center flex-wrap gap-4 mt-6">
          {allImages.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`w-20 h-20 relative rounded-lg overflow-hidden border-2 transition-all duration-200
                ${
                  selectedImage.id === image.id
                    ? "border-primary shadow-md"
                    : "border-transparent hover:border-base-content/20"
                }`}
            >
              <Image
                src={image.src}
                alt={image.alt || "Product thumbnail"}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
