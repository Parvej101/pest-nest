// src/app/shop/page.js

"use client";

import { allProducts } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const ITEMS_PER_PAGE = 12;

// --- ফিল্টার সাইডবার কম্পונেন্ট (এই ফাইলের ভেতরেই রাখা হয়েছে) ---
const FilterSidebar = ({ products, onPriceChange, selectedPrice }) => {
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  return (
    <div className="space-y-8">
      {categories.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-lg">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div className="form-control" key={cat}>
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text">{cat}</span>
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
      {brands.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-lg">Brands</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div className="form-control" key={brand}>
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text">{brand}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="toggle toggle-primary" />
            <span className="label-text font-medium">In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

// --- শপ পেইজের মূল কম্পונেন্ট ---
const ShopPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(5000);
  const [sortOption, setSortOption] = useState("newest");

  const filteredAndSortedProducts = useMemo(() => {
    let products = allProducts
      .filter((p) => p.price <= price)
      .filter((p) =>
        searchTerm
          ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      );
    switch (sortOption) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return [...products].sort((a, b) => b.id - a.id);
    }
  }, [searchTerm, price, sortOption]);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, price, sortOption]);

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* --- মূল পরিবর্তন: রেসপন্সিভ শিরোনাম এবং কন্ট্রোল বার --- */}
        <div className="mb-8 lg:mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <div>
              {searchTerm ? (
                <h1 className="text-3xl font-bold">Search: "{searchTerm}"</h1>
              ) : (
                <h1 className="text-4xl font-bold tracking-tight">Shop All</h1>
              )}
            </div>
            {/* "Showing..." লেখাটি শুধুমাত্র মোবাইলে এখানে দেখা যাবে */}
            <p className="text-sm text-base-content/70 lg:hidden">
              {showingText}
            </p>
          </div>

          {/* কন্ট্রোল বার (শুধুমাত্র মোবাইলে এখানে দেখা যাবে) */}
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
                className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
              >
                <li>
                  <a
                    onClick={() => setSortOption("newest")}
                    className={sortOption === "newest" ? "font-bold" : ""}
                  >
                    Newest
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setSortOption("price-asc")}
                    className={sortOption === "price-asc" ? "font-bold" : ""}
                  >
                    Price (Low to High)
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setSortOption("price-desc")}
                    className={sortOption === "price-desc" ? "font-bold" : ""}
                  >
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
              products={allProducts}
              onPriceChange={setPrice}
              selectedPrice={price}
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
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
                >
                  <li>
                    <a
                      onClick={() => setSortOption("newest")}
                      className={sortOption === "newest" ? "font-bold" : ""}
                    >
                      Newest
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setSortOption("price-asc")}
                      className={sortOption === "price-asc" ? "font-bold" : ""}
                    >
                      Price (Low to High)
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setSortOption("price-desc")}
                      className={sortOption === "price-desc" ? "font-bold" : ""}
                    >
                      Price (High to Low)
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
                {currentProducts.map((product, index) => (
                  <div key={product.id} className="group">
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-base-200 shadow-sm hover:shadow-xl transition-shadow">
                        <Image
                          src={product.imageSrc}
                          alt={product.name}
                          fill
                          sizes="50vw"
                          className="object-cover"
                          priority={index < 4}
                        />
                      </div>
                    </Link>
                    <div className="mt-3">
                      <h3 className="text-sm font-medium text-base-content truncate">
                        <Link href={`/product/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="font-bold text-primary text-lg">
                          ৳{product.price}
                        </p>
                        <button className="btn btn-primary btn-sm btn-circle">
                          <HiOutlineShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold">No Products Found</h2>
                <p className="mt-2 text-base-content/70">
                  Sorry, we couldn't find any products matching your search.
                </p>
                <Link href="/shop">
                  <button className="btn btn-primary mt-6">Back to Shop</button>
                </Link>
              </div>
            )}

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
              products={allProducts}
              onPriceChange={setPrice}
              selectedPrice={price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
