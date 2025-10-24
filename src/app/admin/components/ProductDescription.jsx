// src/app/admin/components/ProductDescription.jsx
"use client";

export const ProductDescription = ({ description, handleInputChange }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">Description *</span>
      </label>
      <textarea
        name="description"
        value={description}
        onChange={handleInputChange}
        className="textarea textarea-bordered h-48 w-full"
        required
      ></textarea>
    </div>
  );
};
