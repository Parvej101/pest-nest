"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ProductActions from "./ProductActions";
import ProductStatusToggle from "./ProductStatusToggle";

const ProductTable = ({ products, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-base-200 rounded-lg">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered w-full md:w-1/2"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
        <table className="table w-full">
          <thead className="text-base">
            <tr>
              <th>S.N.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Status</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
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
                  </td>
                  <td className="font-semibold">{product.name}</td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {product.category}
                    </span>
                  </td>
                  <td>
                    <span className="capitalize">{product.type}</span>
                  </td>
                  <td>
                    <ProductStatusToggle
                      productId={product._id}
                      initialStatus={product.status}
                    />
                  </td>
                  <td>৳{product.price}</td>
                  <td className="text-center">
                    {/* পরিবর্তন: এখানে ProductActions কম্পোনেন্ট ব্যবহার করা হচ্ছে */}
                    <ProductActions productId={product._id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-10">
                  No products match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
