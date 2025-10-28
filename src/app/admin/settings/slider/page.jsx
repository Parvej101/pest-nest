"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiEdit, FiLink, FiPlusCircle, FiTrash2, FiX } from "react-icons/fi";

const SliderManagerPage = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({ image: null, link: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const fetchSlides = async () => {
    /* ... fetchSlides logic remains the same ... */
  };
  useEffect(() => {
    fetchSlides();
  }, []);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleUploadSuccess = (result) =>
    setFormData({ ...formData, image: result.info.secure_url });
  const handleRemoveImage = () => setFormData({ ...formData, image: null });

  const resetForm = () => {
    setFormData({ image: null, link: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    /* ... handleSubmit logic remains the same ... */
  };
  const handleDelete = async (id) => {
    /* ... handleDelete logic remains the same ... */
  };

  const handleEdit = (slide) => {
    setEditingId(slide._id);
    setFormData({ image: slide.image, link: slide.link });
    // শুধুমাত্র ডেস্কটপে স্মুথ স্ক্রল করা হবে
    if (window.innerWidth >= 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1 className="lg:text-3xl text-xl font-bold mb-6">
        Manage Homepage Slider
      </h1>

      {/* Add/Edit Slide Form */}
      <div className="bg-base-100 p-4 md:p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Slide" : "Add New Slide"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* পরিবর্তন: আপলোড সেকশন এখন রেসপন্সিভ */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Slide Image *</span>
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <CldUploadButton
                options={{ maxFiles: 1, folder: "pet-nest/sliders" }}
                onSuccess={handleUploadSuccess}
                uploadPreset="pet-nest-preset"
                className="btn btn-outline btn-sm"
              />
              {formData.image && (
                <div className="relative w-full sm:w-48 h-24">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn btn-xs btn-circle btn-error absolute -top-1 -right-1"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Link (CTA)</span>
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="/shop"
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : editingId ? (
                "Update Slide"
              ) : (
                <>
                  <FiPlusCircle /> Add Slide
                </>
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-ghost"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Slides List */}
      <h2 className="text-xl font-bold mb-4">Current Slides</h2>
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <span className="loading loading-spinner"></span>
          </div>
        ) : slides.length === 0 ? (
          <p className="text-center py-8 text-base-content/70">
            No slides found.
          </p>
        ) : (
          slides.map((slide) => (
            // পরিবর্তন: স্লাইড আইটেমের গঠন এখন মোবাইলের জন্য অপ্টিমাইজড
            <div
              key={slide._id}
              className={`p-4 rounded-lg shadow transition-all ${
                editingId === slide._id
                  ? "bg-primary/20 ring-2 ring-primary"
                  : "bg-base-100"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                  <Image
                    src={slide.image}
                    alt={"Slide image"}
                    width={128}
                    height={72}
                    className="rounded-md object-cover aspect-video"
                  />
                  <div className="grow">
                    <p className="font-semibold text-sm sm:hidden mb-2">
                      Link:
                    </p>
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <FiLink className="hidden sm:block" />
                      <a
                        href={slide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-hover break-all"
                      >
                        {slide.link || "(No link)"}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <FiEdit className="text-info" />
                  </button>
                  <button
                    onClick={() => handleDelete(slide._id)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <FiTrash2 className="text-error" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SliderManagerPage;
