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
  // galleryImages একটি অ্যারে না হলে যেন error না আসে, তার জন্য একটি চেক যোগ করা হলো
  if (Array.isArray(galleryImages)) {
    allImages.push(...galleryImages);
  }

  if (!selectedImage) {
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

      {/* পরিবর্তন: এই কন্ডিশনটি নিশ্চিত করে যে, ১টির বেশি ছবি থাকলেই কেবল নিচের প্রিভিউ দেখানো হবে */}
      {allImages.length > 1 && (
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mt-6">
          {allImages.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`w-14 h-14 sm:w-20 sm:h-20 relative rounded-lg overflow-hidden border-2 transition-all duration-200
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
