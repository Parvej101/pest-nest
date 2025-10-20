"use client";

import ProductCard from "@/components/shared/ProductCard"; // ধাপ ১: ProductCard কম্পোনেন্ট ইম্পোর্ট করা হয়েছে
import { allProducts } from "@/data/products";
import Link from "next/link";

const FeaturedProducts = () => {
  const featuredProducts = allProducts.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <section className="pb-12 md:pb-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="lg:text-3xl text-xl font-bold tracking-tight">
            Top Selling Products
          </h2>
          <Link href="/shop" className="btn btn-link btn-primary mt-2">
            Shop More <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {featuredProducts.map((product) => (
            // ধাপ ২: map ফাংশনের ভেতরের পুরো কার্ডের কোডটি <ProductCard /> দিয়ে রিপ্লেস করা হয়েছে
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
