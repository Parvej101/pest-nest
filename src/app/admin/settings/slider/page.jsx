"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiEdit, FiLink, FiPlusCircle, FiTrash2, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const SliderManagerPage = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // A single state for the form data, used for both creating and editing
  const [formData, setFormData] = useState({ image: null, link: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to track which slide is being edited
  const [editingId, setEditingId] = useState(null);

  // Function to fetch all slides from the API
  const fetchSlides = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/sliders");
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSlides(data.data);
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch slides when the component mounts
  useEffect(() => {
    fetchSlides();
  }, []);

  // Handlers for form input and image upload
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleUploadSuccess = (result) =>
    setFormData({ ...formData, image: result.info.secure_url });
  const handleRemoveImage = () => setFormData({ ...formData, image: null });

  // Function to reset the form and exit edit mode
  const resetForm = () => {
    setFormData({ image: null, link: "" });
    setEditingId(null);
  };

  // Main submit handler for both creating and updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      Swal.fire("Error!", "Please upload an image for the slide.", "error");
      return;
    }
    setIsSubmitting(true);

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/sliders/${editingId}` : "/api/sliders";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      resetForm();
      await fetchSlides();
      Swal.fire(
        "Success!",
        `Slide successfully ${editingId ? "updated" : "added"}.`,
        "success"
      );
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler to delete a slide
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/sliders/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error((await res.json()).error);
        await fetchSlides();
        Swal.fire("Deleted!", "The slide has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  // Handler to activate edit mode
  const handleEdit = (slide) => {
    setEditingId(slide._id);
    setFormData({ image: slide.image, link: slide.link });
    // Scroll to the top to focus on the edit form on larger screens
    if (window.innerWidth >= 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Homepage Slider</h1>

      {/* Add/Edit Slide Form */}
      <div className="bg-base-100 p-4 md:p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Slide" : "Add New Slide"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            No slides found. Add one to get started.
          </p>
        ) : (
          slides.map((slide) => (
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
