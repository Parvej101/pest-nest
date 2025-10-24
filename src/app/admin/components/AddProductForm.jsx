"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductBasicInfo } from "./ProductBasicInfo";
import { ProductDescription } from "./ProductDescription";
import { ProductImageUpload } from "./ProductImageUpload";
import { ProductTypeAndOptions } from "./ProductTypeAndOptions";
import { SingleProductFields } from "./SingleProductFields";
import { VariationProductFields } from "./VariationProductFields";

const AddProductForm = ({
  categories = [],
  variations = [],
  productToEdit = null,
}) => {
  const router = useRouter();
  const isEditMode = !!productToEdit;

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
            ? productToEdit.variants
            : [{ value: "", price: "", stock: "", image: null }],
      });
    }
  }, [isEditMode, productToEdit]);

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

  // Handlers for variations
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (Your handleSubmit logic remains the same, just use formData properties)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-base-100 p-6 md:p-8 rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <ProductBasicInfo
        name={formData.name}
        slug={formData.slug}
        category={formData.category}
        categories={categories}
        productCode={formData.productCode}
        unitType={formData.unitType}
        handleInputChange={handleInputChange}
        handleNameChange={handleNameChange}
      />

      <ProductImageUpload
        thumbnail={formData.thumbnail}
        gallery={formData.gallery}
        handleThumbnailUpload={handleThumbnailUpload}
        handleGalleryUpload={handleGalleryUpload}
        handleRemoveThumbnail={handleRemoveThumbnail}
        handleRemoveGalleryImage={handleRemoveGalleryImage}
      />

      <ProductTypeAndOptions
        type={formData.type}
        setType={(value) => setFormData((prev) => ({ ...prev, type: value }))}
        variationType={formData.variationType}
        setVariationType={(value) =>
          setFormData((prev) => ({ ...prev, variationType: value }))
        }
        variations={variations}
        isFeatured={formData.isFeatured}
        setIsFeatured={(value) =>
          setFormData((prev) => ({ ...prev, isFeatured: value }))
        }
        isTrending={formData.isTrending}
        setIsTrending={(value) =>
          setFormData((prev) => ({ ...prev, isTrending: value }))
        }
      />

      {formData.type === "single" && (
        <SingleProductFields
          price={formData.price}
          stock={formData.stock}
          handleInputChange={handleInputChange}
        />
      )}

      {formData.type === "variation" && (
        <VariationProductFields
          variants={formData.variants}
          variationType={formData.variationType}
          handleVariantChange={handleVariantChange}
          addVariant={addVariant}
          removeVariant={removeVariant}
          handleVariantImageUpload={handleVariantImageUpload}
          removeVariantImage={removeVariantImage}
        />
      )}

      <ProductDescription
        description={formData.description}
        handleInputChange={handleInputChange}
      />

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
