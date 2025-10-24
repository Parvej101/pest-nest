// src/app/admin/components/ProductBasicInfo.jsx
"use client";

export const ProductBasicInfo = ({
  name,
  slug,
  category,
  categories,
  productCode,
  unitType,
  handleInputChange,
  handleNameChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Title *</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
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
            value={slug}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Category *</span>
          </label>
          <select
            name="category"
            value={category}
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
        {/* Placeholder for Brand */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Brand</span>
          </label>
          <select className="select select-bordered" disabled>
            <option>Select a brand</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Product Code (SKU)</span>
          </label>
          <input
            type="text"
            name="productCode"
            value={productCode}
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
            value={unitType}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>
    </>
  );
};
