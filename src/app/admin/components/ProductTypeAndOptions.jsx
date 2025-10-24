// src/app/admin/components/ProductTypeAndOptions.jsx
"use client";

export const ProductTypeAndOptions = ({
  type,
  setType,
  variationType,
  setVariationType,
  variations,
  isFeatured,
  setIsFeatured,
  isTrending,
  setIsTrending,
}) => {
  return (
    <div className="p-4 border border-dashed border-base-300 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="form-control">
          <label className="label py-0">
            <span className="label-text font-semibold">Product Type</span>
          </label>
          <div className="join mt-2">
            <button
              type="button"
              onClick={() => setType("single")}
              className={`btn btn-sm join-item w-1/2 ${
                type === "single" ? "btn-primary" : ""
              }`}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => setType("variation")}
              className={`btn btn-sm join-item w-1/2 ${
                type === "variation" ? "btn-primary" : ""
              }`}
            >
              Variation
            </button>
          </div>
        </div>
        <div className="form-control">
          <label className="label py-0">
            <span className="label-text font-semibold">Variation Type</span>
          </label>
          <select
            value={variationType}
            onChange={(e) => setVariationType(e.target.value)}
            className="select select-bordered select-sm mt-2"
            disabled={type !== "variation"}
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
      <div className="divider my-4"></div>
      <div className="flex flex-wrap gap-4 pt-2">
        <label className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="label-text font-semibold">Featured</span>
        </label>
        <label className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            checked={isTrending}
            onChange={(e) => setIsTrending(e.target.checked)}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="label-text font-semibold">Trending</span>
        </label>
      </div>
    </div>
  );
};
