// src/app/shop/page.js

"use client";

import { allProducts } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const ITEMS_PER_PAGE = 12; // প্রতি পেইজে ১২টি প্রোডাক্ট দেখাবে

// --- ফিল্টার সাইডবার কম্পונেন্ট ---
const FilterSidebar = ({ products, onPriceChange, selectedPrice }) => {
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  return (
    <div className="space-y-8">
      {/* Category Filter */}
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

      {/* Price Range Filter */}
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

      {/* Brand Filter */}
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

      {/* Stock Filter */}
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

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesPrice = product.price <= price;
      return matchesSearch && matchesPrice;
    });
  }, [searchTerm, price]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, price]);

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          {searchTerm ? (
            <div>
              <h1 className="text-3xl font-bold">
                Search Results for: "{searchTerm}"
              </h1>
              <p className="mt-2 text-base-content/70">
                {filteredProducts.length} products found
              </p>
            </div>
          ) : (
            <h1 className="text-4xl font-bold tracking-tight">Shop All</h1>
          )}
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
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-base-content/70">
                Showing{" "}
                {currentProducts.length > 0
                  ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                  : 0}
                -
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredProducts.length
                )}{" "}
                of {filteredProducts.length}
              </p>
              <div className="flex items-center gap-2">
                <select className="select select-bordered select-sm">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Price (Low to High)</option>
                </select>
                <label
                  htmlFor="mobile-filter-drawer"
                  className="btn btn-ghost btn-circle lg:hidden"
                >
                  <FaFilter />
                </label>
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
          <div className="p-4 w-80 min-h-full bg-base-100">
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
