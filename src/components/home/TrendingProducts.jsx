"use client";

import ProductCard from "@/components/shared/ProductCard"; // ধাপ ১: আমাদের বানানো ProductCard ইম্পোর্ট করা হয়েছে
import { allProducts } from "@/data/products";
import Link from "next/link";

const TrendingProducts = () => {
  // শুধুমাত্র 'isTrending: true' থাকা প্রোডাক্টগুলো ফিল্টার করে বের করা হচ্ছে
  const trendingProducts = allProducts.filter((p) => p.isTrending).slice(0, 10);

  return (
    <section className=" bg-base-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
          <Link href="/shop" className="btn btn-link btn-primary mt-2">
            Shop More <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ---  প্রোডাক্ট কার্ডের গ্রিড --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6">
          {trendingProducts.map((product) => (
            // ধাপ ২: এখানে আগের পুরো কোডটি বদলে শুধু ProductCard কম্পোনেন্ট ব্যবহার করা হচ্ছে
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
