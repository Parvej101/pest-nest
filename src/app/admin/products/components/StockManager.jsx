"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiSave } from "react-icons/fi";
import Swal from "sweetalert2";

const StockManager = ({ initialProducts, categories }) => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSaving, setIsSaving] = useState({});

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleStockChange = (productId, newStock, variantValue = null) => {
    const updatedProducts = products.map((p) => {
      if (p._id === productId) {
        if (p.type === "single" || !variantValue) {
          return { ...p, stock: Number(newStock) };
        } else {
          const updatedVariants = p.variants.map((v) =>
            v.value === variantValue ? { ...v, stock: Number(newStock) } : v
          );
          return { ...p, variants: updatedVariants };
        }
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const handleSave = async (productId) => {
    const productToUpdate = products.find((p) => p._id === productId);
    if (!productToUpdate) return;
    setIsSaving((prev) => ({ ...prev, [productId]: true }));

    const updateData = {
      stock: productToUpdate.stock,
      variants: productToUpdate.variants,
    };

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to update stock");
      Swal.fire("Success!", "Stock updated successfully.", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      setIsSaving((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-base-200 rounded-lg">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:grow"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered w-full md:w-1/3"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* পরিবর্তন: টেবিলের পরিবর্তে এখন কার্ড লেআউট (মোবাইলের জন্য) এবং টেবিল লেআউট (ডেস্কটপের জন্য) */}
      <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
        {/* ডেস্কটপের জন্য টেবিল (md স্ক্রিন থেকে বড়) */}
        <div className="overflow-x-auto hidden md:block">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock Details</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover">
                  <td className="w-1/2">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-md">
                          <Image
                            src={product.imageSrc}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{product.name}</p>
                        <p className="text-sm opacity-50 capitalize">
                          Type: {product.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/3 align-top pt-4">
                    {product.type === "single" ? (
                      <div className="form-control">
                        <input
                          type="number"
                          value={product.stock || 0}
                          onChange={(e) =>
                            handleStockChange(product._id, e.target.value)
                          }
                          className="input input-bordered input-sm w-32"
                        />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {product.variants.map((variant) => (
                          <div
                            key={variant.value}
                            className="flex items-center gap-2"
                          >
                            <span
                              className="font-semibold w-24 truncate"
                              title={variant.value}
                            >
                              {variant.value}:
                            </span>
                            <input
                              type="number"
                              value={variant.stock || 0}
                              onChange={(e) =>
                                handleStockChange(
                                  product._id,
                                  e.target.value,
                                  variant.value
                                )
                              }
                              className="input input-bordered input-sm w-24"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSave(product._id)}
                      disabled={isSaving[product._id]}
                    >
                      {isSaving[product._id] ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <FiSave />
                      )}{" "}
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* মোবাইলের জন্য কার্ড লেআউট (md স্ক্রিনের নিচে) */}
        <div className="divide-y divide-base-200 md:hidden">
          {filteredProducts.map((product) => (
            <div key={product._id} className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-md shrink-0">
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold">{product.name}</p>
                  {/* পরিবর্তন: Type এখন নামের পাশে */}
                  <p className="text-sm opacity-50 capitalize">
                    Type:{" "}
                    <span className="badge badge-xs badge-ghost">
                      {product.type}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2 text-sm">Stock Details:</p>
                {product.type === "single" ? (
                  <div className="form-control">
                    <input
                      type="number"
                      value={product.stock || 0}
                      onChange={(e) =>
                        handleStockChange(product._id, e.target.value)
                      }
                      className="input input-bordered input-sm w-full max-w-xs"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.value}
                        className="flex items-center justify-between"
                      >
                        <span
                          className="font-semibold w-24 truncate"
                          title={variant.value}
                        >
                          {variant.value}:
                        </span>
                        <input
                          type="number"
                          value={variant.stock || 0}
                          onChange={(e) =>
                            handleStockChange(
                              product._id,
                              e.target.value,
                              variant.value
                            )
                          }
                          className="input input-bordered input-sm w-28"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSave(product._id)}
                  disabled={isSaving[product._id]}
                >
                  {isSaving[product._id] ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <FiSave />
                  )}{" "}
                  Save Stock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockManager;
