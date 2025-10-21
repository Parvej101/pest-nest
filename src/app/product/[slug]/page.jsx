"use client";

import { allProducts } from "@/data/products";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";

// আমাদের বানানো ছোট ছোট কম্পোনেন্টগুলো ইম্পোর্ট করা হচ্ছে
import ProductCard from "@/components/shared/ProductCard";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";

const ProductDetailsPage = ({ params }) => {
  const { slug } = params;
  const product = allProducts.find((p) => p.slug === slug);

  // সবচেয়ে গুরুত্বপূর্ণ: product আছে কিনা তা প্রথমেই চেক করা হচ্ছে
  // এটি একটি "গেটকিপার"-এর মতো কাজ করে
  if (!product) {
    // যদি কোনো প্রোডাক্ট খুঁজে না পাওয়া যায়, তাহলে এখান থেকেই একটি মেসেজ দেখিয়ে কোড শেষ হয়ে যাবে
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Product with slug '{slug}' not found!
        </h1>
      </div>
    );
  }

  // যদি ওপরের if-check পাস হয়, তার মানে product নিশ্চিতভাবে পাওয়া গেছে
  // এখন আমরা নিরাপদে বাকি কাজগুলো করতে পারি
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 5);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: product.name, href: `/product/${slug}` }, // এখন এটি নিরাপদ
  ];

  return (
    <section className="pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol role="list" className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((breadcrumb, i) => (
              <li key={breadcrumb.name}>
                <div className="flex items-center">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-base-content/70 hover:text-primary"
                  >
                    {breadcrumb.name}
                  </Link>
                  {i < breadcrumbs.length - 1 && (
                    <HiOutlineChevronRight className="ml-2 h-4 w-4" />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          <ProductImageGallery
            thumbnailSrc={product.imageSrc}
            galleryImages={product.galleryImages}
            productName={product.name}
          />
          <div className="mt-10 lg:mt-0">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center">
              You Might Also Like
            </h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;
