// src/app/admin/components/VariationProductFields.jsx
"use client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { FiPlus, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";

export const VariationProductFields = ({
  variants,
  variationType,
  handleVariantChange,
  addVariant,
  removeVariant,
  handleVariantImageUpload,
  removeVariantImage,
}) => {
  return (
    <div className="p-6 border border-base-300 rounded-lg space-y-6 animate-fadeIn">
      <h3 className="font-bold text-lg">Product Variations</h3>
      {variants.map((variant, index) => (
        <div
          key={index}
          className="p-4 border border-dashed border-base-300 rounded-md relative pt-6"
        >
          <p className="font-semibold mb-2 absolute -top-3 bg-base-100 px-2">
            Variant #{index + 1}
          </p>
          {variants.length > 1 && (
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="btn btn-xs btn-circle btn-error absolute top-2 right-2"
            >
              <FiTrash2 />
            </button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{variationType || "Value"} *</span>
              </label>
              <input
                type="text"
                name="value"
                value={variant.value}
                onChange={(e) => handleVariantChange(index, e)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price *</span>
              </label>
              <input
                type="number"
                name="price"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, e)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stock *</span>
              </label>
              <input
                type="number"
                name="stock"
                value={variant.stock}
                onChange={(e) => handleVariantChange(index, e)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Variant Image</span>
              </label>
              {variant.image ? (
                <div className="relative w-20 h-20">
                  <Image
                    src={variant.image}
                    alt="Variant"
                    fill
                    className="object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariantImage(index)}
                    className="btn btn-xs btn-circle btn-error absolute -top-1 -right-1"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onSuccess={(result) =>
                    handleVariantImageUpload(index, result)
                  }
                  uploadPreset="pet-nest-preset"
                  className="btn btn-outline btn-xs"
                >
                  <FiUploadCloud /> Upload
                </CldUploadButton>
              )}
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addVariant}
        className="btn btn-secondary btn-sm mt-4"
      >
        <FiPlus /> Add Another Variant
      </button>
    </div>
  );
};
