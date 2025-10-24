"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { IoClose, IoPencil } from "react-icons/io5";
import Swal from "sweetalert2";

const CategoryManager = () => {
  // State for creating a new category
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  // State for displaying categories
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for editing a category
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const modalRef = useRef(null);

  // Function to fetch all categories from the API
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setCategories(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUploadSuccess = (result) => setImage(result.info.secure_url);
  const handleEditUploadSuccess = (result) =>
    setEditedImage(result.info.secure_url);

  // Handler to add a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload an image for the category.");
      return;
    }
    setError(null);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setName("");
      setImage(null);
      await fetchCategories();
      Swal.fire("Success!", "Category added successfully.", "success");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handler to delete a category
  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error((await res.json()).error);
        await fetchCategories();
        Swal.fire("Deleted!", "The category has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  // Handler to open the edit modal
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setEditedName(category.name);
    setEditedImage(category.image);
    modalRef.current?.showModal();
  };

  // Handler to update a category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      const res = await fetch(`/api/categories/${editingCategory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName, image: editedImage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      modalRef.current?.close();
      setEditingCategory(null);
      await fetchCategories();
      Swal.fire("Updated!", "Category updated successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <>
      <div className="bg-base-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

        {error && (
          <div
            className="alert alert-error mb-4"
            onClick={() => setError(null)}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleAddCategory}
          className="space-y-4 mb-8 border-b border-base-300 pb-8"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category Name *</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New category name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category Image *</span>
            </label>
            <div className="flex items-center gap-4">
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onSuccess={handleUploadSuccess}
                uploadPreset="pet-nest-preset"
                className="btn btn-outline btn-sm"
              >
                <FiUploadCloud /> Upload
              </CldUploadButton>
              {image && (
                <div className="relative w-20 h-20">
                  <Image
                    src={image}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="btn btn-xs btn-circle btn-error absolute -top-1 -right-1"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>

        <h3 className="font-bold mb-4 mt-6">Existing Categories</h3>
        {isLoading ? (
          <div className="text-center py-8">
            <span className="loading loading-spinner"></span>
          </div>
        ) : categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-20">Image</th>
                  <th>Name</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover">
                    <td>
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-md">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{cat.name}</td>
                    <td className="text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(cat)}
                          className="btn btn-ghost btn-sm btn-circle"
                        >
                          <IoPencil className="text-info" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="btn btn-ghost btn-sm btn-circle"
                        >
                          <IoClose className="text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-base-content/70 py-8 text-center">
            No categories found. Start by adding a new one.
          </p>
        )}
      </div>

      {/* --- Edit Category Modal --- */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Category</h3>
          <form onSubmit={handleUpdateCategory} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Image</span>
              </label>
              <div className="flex items-center gap-4">
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onSuccess={handleEditUploadSuccess}
                  uploadPreset="pet-nest-preset"
                  className="btn btn-outline btn-sm"
                >
                  <FiUploadCloud /> Change
                </CldUploadButton>
                {editedImage && (
                  <div className="relative w-20 h-20">
                    <Image
                      src={editedImage}
                      alt="Preview"
                      fill
                      className="object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setEditedImage(null)}
                      className="btn btn-xs btn-circle btn-error absolute -top-1 -right-1"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current?.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setEditingCategory(null)}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CategoryManager;
