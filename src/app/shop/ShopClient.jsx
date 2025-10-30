"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ProductGrid from "./ProductGrid";

const ITEMS_PER_PAGE = 9;

// --- ফিল্টার সাইডবার কম্পונেন্ট ---
const FilterSidebar = ({
  allCategories,
  onPriceChange,
  selectedPrice,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="space-y-8">
      {allCategories.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-lg">Categories</h3>
          <div className="space-y-2">
            {/* পরিবর্তন ১: "All" ক্যাটাগরির জন্য একটি স্ট্যাটিক চেকবক্স যোগ করা হয়েছে */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={selectedCategories.includes("all")}
                  onChange={() => onCategoryChange("all")}
                />
                <span className="label-text">All</span>
              </label>
            </div>
            {/* ডাটাবেস থেকে আসা বাকি ক্যাটাগরিগুলো ম্যাপ করা হচ্ছে */}
            {allCategories.map((cat) => (
              <div className="form-control" key={cat._id}>
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => onCategoryChange(cat.name)}
                  />
                  <span className="label-text">{cat.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <h3 className="font-semibold mb-3 text-lg">Price Range</h3>
        <input
          type="range"
          min={100}
          max={5000}
          value={selectedPrice}
          onChange={(e) => onPriceChange(parseInt(e.target.value))}
          className="range range-primary"
        />
        <div className="flex justify-between text-xs px-1 mt-2">
          <span>৳100</span>
          <span className="font-bold text-primary">
            Up to: ৳{selectedPrice}
          </span>
          <span>৳5000</span>
        </div>
      </div>
    </div>
  );
};

// --- শপ পেইজের মূল ক্লায়েন্ট কম্পונেন্ট ---
const ShopClient = ({ initialProducts, initialCategories }) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(5000);
  const [sortOption, setSortOption] = useState("newest");

  // পরিবর্তন ২: ডিফল্ট ক্যাটাগরি হিসেবে 'all' সেট করা হয়েছে
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  // পরিবর্তন ৩: handleCategoryChange ফাংশনে "All" এর জন্য বিশেষ লজিক যোগ করা হয়েছে
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
    let products = initialProducts;

    // পরিবর্তন ৪: ক্যাটাগরি ফিল্টারিং লজিক আপডেট করা হয়েছে
    if (!selectedCategories.includes("all")) {
      products = products.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Price filter
    products = products.filter((p) => p.price <= price);

    // Search term filter
    products = products.filter((p) =>
      searchTerm
        ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

    // Sorting
    switch (sortOption) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }, [searchTerm, price, sortOption, selectedCategories, initialProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, price, sortOption, selectedCategories]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const showingText = `Showing ${
    currentProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0
  }-${Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredAndSortedProducts.length
  )} of ${filteredAndSortedProducts.length}`;

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 lg:mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <div>
              {searchTerm ? (
                <h1 className="text-3xl font-bold">Search: "{searchTerm}"</h1>
              ) : (
                <h1 className="lg:text-3xl text-xl font-bold tracking-tight">
                  Shop All
                </h1>
              )}
            </div>
            <p className="text-sm text-base-content/70 lg:hidden">
              {showingText}
            </p>
          </div>
          <div className="flex justify-between items-center lg:hidden">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-outline btn-sm m-1 flex items-center gap-1"
              >
                {sortOption === "newest" && "Sort by: Newest"}
                {sortOption === "price-asc" && "Price (Low-High)"}
                {sortOption === "price-desc" && "Price (High-Low)"}
                <FiChevronDown />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-1 menu p-2 shadow bg-base-200 rounded-box w-52"
              >
                <li>
                  <a onClick={() => setSortOption("newest")}>Newest</a>
                </li>
                <li>
                  <a onClick={() => setSortOption("price-asc")}>
                    Price (Low to High)
                  </a>
                </li>
                <li>
                  <a onClick={() => setSortOption("price-desc")}>
                    Price (High to Low)
                  </a>
                </li>
              </ul>
            </div>
            <label
              htmlFor="mobile-filter-drawer"
              className="btn btn-ghost btn-circle"
            >
              <FaFilter />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          <aside className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              allCategories={initialCategories}
              onPriceChange={setPrice}
              selectedPrice={price}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </aside>
          <main className="lg:col-span-3">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-sm text-base-content/70">{showingText}</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-outline btn-sm m-1 flex items-center gap-2"
                >
                  {sortOption === "newest" && "Sort by: Newest"}
                  {sortOption === "price-asc" && "Sort by: Price (Low to High)"}
                  {sortOption === "price-desc" &&
                    "Sort by: Price (High to Low)"}
                  <FiChevronDown />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-11 menu p-2 shadow bg-base-200 rounded-box w-52"
                >
                  <li>
                    <a onClick={() => setSortOption("newest")}>Newest</a>
                  </li>
                  <li>
                    <a onClick={() => setSortOption("price-asc")}>
                      Price (Low to High)
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSortOption("price-desc")}>
                      Price (High to Low)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ProductGrid products={currentProducts} />
            {totalPages > 1 && (
              <div className="join mt-12 flex justify-center">
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <IoChevronBack />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`join-item btn ${
                        currentPage === page ? "btn-primary" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  className="join-item btn"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <IoChevronForward />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <div className="drawer drawer-end">
        <input
          id="mobile-filter-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-filter-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="p-4 w-60 min-h-full bg-base-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filter Products</h2>
              <label
                htmlFor="mobile-filter-drawer"
                className="btn btn-ghost btn-circle"
              >
                X
              </label>
            </div>
            <FilterSidebar
              allCategories={initialCategories}
              onPriceChange={setPrice}
              selectedPrice={price}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopClient;
