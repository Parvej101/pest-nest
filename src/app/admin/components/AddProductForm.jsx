"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";

// পরিবর্তন ১: productToEdit নামে একটি নতুন prop গ্রহণ করা হচ্ছে
const AddProductForm = ({
  categories = [],
  variations = [],
  productToEdit = null,
}) => {
  const router = useRouter();
  const isEditMode = !!productToEdit;

  // পরিবর্তন ২: সব state-গুলোকে এখন একটিমাত্র formData অবজেক্টে রাখা হয়েছে
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    unitType: "Piece",
    productCode: "",
    category: "",
    thumbnail: null,
    gallery: [],
    type: "single",
    price: "",
    stock: "",
    isFeatured: false,
    isTrending: false,
    description: "",
    variationType: "",
    variants: [{ value: "", price: "", stock: "", image: null }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // পরিবর্তন ৩: useEffect ব্যবহার করে Edit Mode-এর জন্য state সেট করা হচ্ছে
  useEffect(() => {
    if (isEditMode && productToEdit) {
      setFormData({
        name: productToEdit.name || "",
        slug: productToEdit.slug || "",
        unitType: productToEdit.unitType || "Piece",
        productCode: productToEdit.productCode || "",
        category: productToEdit.category || "",
        thumbnail: productToEdit.imageSrc || null,
        gallery: productToEdit.galleryImages || [],
        type: productToEdit.type || "single",
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        isFeatured: productToEdit.isFeatured || false,
        isTrending: productToEdit.isTrending || false,
        description: productToEdit.description || "",
        variationType: productToEdit.variationType || "",
        variants:
          productToEdit.variants?.length > 0
            ? productToEdit.variants.map((v) => ({
                ...v,
                image: v.image || null,
              }))
            : [{ value: "", price: "", stock: "", image: null }],
      });
    }
  }, [isEditMode, productToEdit]);

  // Generic handler for most text inputs, selects, and checkboxes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNameChange = (e) => {
    const productName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: productName,
      slug: isEditMode
        ? prev.slug
        : productName
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, ""),
    }));
  };

  const handleThumbnailUpload = (result) =>
    setFormData((prev) => ({ ...prev, thumbnail: result.info.secure_url }));
  const handleGalleryUpload = (result) =>
    setFormData((prev) => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        {
          id: result.info.public_id,
          src: result.info.secure_url,
          alt: prev.name,
        },
      ],
    }));
  const handleRemoveThumbnail = () =>
    setFormData((prev) => ({ ...prev, thumbnail: null }));
  const handleRemoveGalleryImage = (id) =>
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((img) => img.id !== id),
    }));

  const handleVariantChange = (index, event) => {
    const newVariants = [...formData.variants];
    newVariants[index][event.target.name] = event.target.value;
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };
  const addVariant = () =>
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        { value: "", price: "", stock: "", image: null },
      ],
    }));
  const removeVariant = (index) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  const handleVariantImageUpload = (index, result) => {
    const newVariants = [...formData.variants];
    newVariants[index].image = result.info.secure_url;
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };
  const removeVariantImage = (index) => {
    const newVariants = [...formData.variants];
    newVariants[index].image = null;
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

  // Main submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.thumbnail) {
      setError("Please upload a thumbnail image.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `/api/products/${productToEdit._id}`
      : "/api/products";

    let productData = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      category: formData.category,
      unitType: formData.unitType,
      productCode: formData.productCode,
      imageSrc: formData.thumbnail,
      galleryImages: formData.gallery,
      type: formData.type,
      isFeatured: formData.isFeatured,
      isTrending: formData.isTrending,
    };
    if (formData.type === "single") {
      productData = {
        ...productData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
    } else {
      productData = {
        ...productData,
        variationType: formData.variationType,
        variants: formData.variants.map((v) => ({
          ...v,
          price: Number(v.price),
          stock: Number(v.stock),
        })),
      };
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            `Failed to ${isEditMode ? "update" : "create"} product`
        );

      setSuccess(`Product ${isEditMode ? "updated" : "added"} successfully!`);
      router.refresh();
      if (isEditMode) {
        router.push("/admin/products");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-base-100 p-6 md:p-8 rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? `Edit Product: ${productToEdit.name}` : "Add New Product"}
      </h2>

      {error && (
        <div className="alert alert-error" onClick={() => setError(null)}>
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" onClick={() => setSuccess(null)}>
          {success}
        </div>
      )}

      {/* -- Row 1: Title + Slug -- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Title *</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Slug</span>
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>

      {/* -- Row 2: Category + Featured/Trending -- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Category *</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="select select-bordered"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 pt-4 md:pt-8">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text font-semibold">Featured</span>
          </label>
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleInputChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text font-semibold">Trending</span>
          </label>
        </div>
      </div>

      {/* -- Row 3: Product Code + Unit Type -- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Product Code (SKU)</span>
          </label>
          <input
            type="text"
            name="productCode"
            value={formData.productCode}
            onChange={handleInputChange}
            placeholder="Auto-generated if empty"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Unit Type *</span>
          </label>
          <input
            type="text"
            name="unitType"
            value={formData.unitType}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>

      {/* -- Row 4: Thumbnail + Gallery -- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="form-control space-y-2">
          <label className="label">
            <span className="label-text font-semibold">Thumbnail *</span>
          </label>
          {formData.thumbnail ? (
            <div className="relative w-32 h-32 rounded-md border-2 border-base-300">
              <Image
                src={formData.thumbnail}
                alt="Thumbnail Preview"
                fill
                className="object-cover rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveThumbnail}
                className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2"
              >
                <FiX />
              </button>
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
            {formData.gallery.map((img) => (
              <div
                key={img.id}
                className="relative w-20 h-20 rounded-md border-2 border-base-300"
              >
                <Image
                  src={img.src}
                  alt="Gallery Preview"
                  fill
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(img.id)}
                  className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -- Row 5: Product Type + Variation Type -- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label py-0">
            <span className="label-text font-semibold">Product Type</span>
          </label>
          <div className="join mt-2">
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, type: "single" }))}
              className={`btn btn-sm join-item w-1/2 ${
                formData.type === "single" ? "btn-primary" : ""
              }`}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, type: "variation" }))}
              className={`btn btn-sm join-item w-1/2 ${
                formData.type === "variation" ? "btn-primary" : ""
              }`}
            >
              Variation
            </button>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Variation Type</span>
          </label>
          <select
            name="variationType"
            value={formData.variationType}
            onChange={handleInputChange}
            className="select select-bordered"
            disabled={formData.type !== "variation"}
          >
            <option value="" disabled>
              Select a variation type
            </option>
            {variations.map((v) => (
              <option key={v._id} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* -- Conditional Section for Single Product -- */}
      {formData.type === "single" && (
        <div className="p-6 border border-base-300 rounded-lg space-y-4 animate-fadeIn">
          <h3 className="font-bold text-lg">Single Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Price *</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="input input-bordered"
                required={formData.type === "single"}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Stock *</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="input input-bordered"
                required={formData.type === "single"}
              />
            </div>
          </div>
        </div>
      )}

      {/* -- Conditional Section for Variation Product -- */}
      {formData.type === "variation" && (
        <div className="p-6 border border-base-300 rounded-lg space-y-6 animate-fadeIn">
          <h3 className="font-bold text-lg">Product Variations</h3>
          {formData.variants.map((variant, index) => (
            <div
              key={index}
              className="p-4 border border-dashed border-base-300 rounded-md relative pt-6"
            >
              <p className="font-semibold mb-2 absolute -top-3 bg-base-100 px-2">
                Variant #{index + 1}
              </p>
              {formData.variants.length > 1 && (
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
                    <span className="label-text">
                      {formData.variationType || "Value"} *
                    </span>
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
      )}

      {/* -- Description -- */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">Description *</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="textarea textarea-bordered h-48 w-full"
          required
        ></textarea>
      </div>

      {/* -- Submit Button -- */}
      <div className="text-center pt-4">
        <button
          type="submit"
          className="btn btn-primary w-full max-w-xs"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : isEditMode ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
