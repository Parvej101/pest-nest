// src/app/admin/components/ProductImageUpload.jsx
"use client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { FiUploadCloud, FiX } from "react-icons/fi";

export const ProductImageUpload = ({
  thumbnail,
  gallery,
  handleThumbnailUpload,
  handleGalleryUpload,
  handleRemoveThumbnail,
  handleRemoveGalleryImage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="form-control space-y-2">
        <label className="label">
          <span className="label-text font-semibold">Thumbnail *</span>
        </label>
        {thumbnail ? (
          <div className="relative w-32 h-32 rounded-md border-2 border-base-300">
            {" "}
            <Image
              src={thumbnail}
              alt="Thumbnail Preview"
              fill
              className="object-cover rounded-md"
            />{" "}
            <button
              type="button"
              onClick={handleRemoveThumbnail}
              className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2"
            >
              <FiX />
            </button>{" "}
          </div>
        ) : (
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onSuccess={handleThumbnailUpload}
            uploadPreset="pet-nest-preset"
            className="btn btn-outline btn-sm w-32"
          >
            <FiUploadCloud /> Upload
          </CldUploadButton>
        )}
      </div>
      <div className="form-control space-y-2">
        <label className="label">
          <span className="label-text font-semibold">Gallery Images</span>
        </label>
        <CldUploadButton
          options={{ folder: "pet-nest/gallery" }}
          onSuccess={handleGalleryUpload}
          uploadPreset="pet-nest-preset"
          className="btn btn-outline btn-sm w-32"
        >
          <FiUploadCloud /> Upload
        </CldUploadButton>
        <div className="flex flex-wrap gap-2 mt-2">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="relative w-20 h-20 rounded-md border-2 border-base-300"
            >
              {" "}
              <Image
                src={img.src}
                alt="Gallery Preview"
                fill
                className="object-cover rounded-md"
              />{" "}
              <button
                type="button"
                onClick={() => handleRemoveGalleryImage(img.id)}
                className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2"
              >
                <FiX />
              </button>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
