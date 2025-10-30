"use client";

import ProductCard from "@/components/shared/ProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 9;

const ProductGrid = ({ allProducts, allCategories }) => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory === "all" ? ["all"] : [initialCategory]
  );
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (categoryName) => {
    if (categoryName === "all") {
      setSelectedCategories(["all"]);
      return;
    }
    let newSelection = selectedCategories.filter((c) => c !== "all");
    if (newSelection.includes(categoryName)) {
      newSelection = newSelection.filter((c) => c !== categoryName);
    } else {
      newSelection.push(categoryName);
    }
    if (newSelection.length === 0) {
      setSelectedCategories(["all"]);
    } else {
      setSelectedCategories(newSelection);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];
    if (!selectedCategories.includes("all")) {
      products = products.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }
    if (sortOption === "price-low-to-high") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-to-low") {
      products.sort((a, b) => b.price - a.price);
    }
    return products;
  }, [allProducts, selectedCategories, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, sortOption]);

  // পেজিনেশনের হিসাব -- এই অংশটি যোগ করতে হবে
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* --- Left Sidebar: Filters --- */}
      <aside className="lg:col-span-1 bg-base-200 p-6 rounded-lg h-fit lg:sticky lg:top-24">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="space-y-2">
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={selectedCategories.includes("all")}
                onChange={() => handleCategoryChange("all")}
              />
              <span className="label-text">All</span>
            </label>
          </div>
          {allCategories.map((cat) => (
            <div key={cat._id} className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => handleCategoryChange(cat.name)}
                />
                <span className="label-text">{cat.name}</span>
              </label>
            </div>
          ))}
        </div>
      </aside>

      {/* --- Right Side: Products Grid --- */}
      <div className="lg:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <p>
            Showing {currentProducts.length} of{" "}
            {filteredAndSortedProducts.length} products
          </p>
          <select
            className="select select-bordered select-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductGrid;
