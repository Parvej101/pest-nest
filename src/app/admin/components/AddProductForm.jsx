"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");

  // পরিবর্তন: imageSrc-এর state এখন null দিয়ে শুরু হবে
  const [imageSrc, setImageSrc] = useState(null);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();

  const handleNameChange = (e) => {
    const productName = e.target.value;
    setName(productName);
    setSlug(
      productName
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
    );
  };

  // Cloudinary থেকে আপলোড সফল হলে এই ফাংশনটি চলবে
  const handleUploadSuccess = (result) => {
    // result.info.secure_url-এর ভেতরে ছবির URL-টি থাকে
    setImageSrc(result.info.secure_url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ছবি আপলোড করা হয়েছে কিনা তা চেক করা হচ্ছে
    if (!imageSrc) {
      setError("Please upload a product image.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const productData = {
      name,
      slug,
      price: Number(price),
      imageSrc,
      category,
      description,
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong");

      setSuccess("Product added successfully!");
      // ফর্ম রিসেট করা
      setName("");
      setSlug("");
      setPrice("");
      setImageSrc(null);
      setCategory("");
      setDescription("");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-base-200 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* পরিবর্তন: Image URL ইনপুটের জায়গায় এখন Upload সেকশন */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Product Image</span>
        </label>
        <div className="flex items-center gap-4">
          <CldUploadButton
            options={{ maxFiles: 1, folder: "pet-nest" }} // Cloudinary-তে 'pet-nest' ফোল্ডারে ছবি সেভ হবে
            onSuccess={handleUploadSuccess}
            uploadPreset="pet-nest-preset"
            className="btn btn-outline"
          >
            Upload Image
          </CldUploadButton>

          {/* ছবি আপলোড হওয়ার পর তার একটি প্রিভিউ দেখানো হবে */}
          {imageSrc && (
            <div className="relative w-24 h-24 rounded-md overflow-hidden">
              <Image
                src={imageSrc}
                alt="Uploaded product"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Slug</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="input input-bordered bg-base-100/50 "
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered h-32 md:h-40 w-full"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};

export default AddProductForm;
