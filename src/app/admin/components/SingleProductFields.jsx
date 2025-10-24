// src/app/admin/components/SingleProductFields.jsx
"use client";

export const SingleProductFields = ({ price, stock, handleInputChange }) => {
  return (
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
            value={price}
            onChange={handleInputChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Stock *</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={handleInputChange}
            className="input input-bordered"
            required
          />
        </div>
      </div>
    </div>
  );
};
