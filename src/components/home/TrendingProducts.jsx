"use client";

import { allProducts } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";

const TrendingProducts = () => {
  // শুধুমাত্র 'isTrending: true' থাকা প্রোডাক্টগুলো ফিল্টার করে বের করা হচ্ছে
  const trendingProducts = allProducts.filter((p) => p.isTrending).slice(0, 10);

  return (
    <section className="py-12 md:py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
          <Link href="/shop" className="btn btn-link btn-primary mt-2">
            Shop More <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* --- নতুন এবং আধুনিক প্রোডাক্ট কার্ডের গ্রিড --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6">
          {trendingProducts.map((product) => (
            <div key={product.id} className="group">
              {/* ছবির অংশ */}
              <Link href={`/product/${product.slug}`}>
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-base-200 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Sale বা Discount Badge */}
                  {product.saleBadge && (
                    <div className="badge badge-secondary absolute top-2 right-2">
                      {product.saleBadge}
                    </div>
                  )}
                  {product.discountBadge && (
                    <div className="badge badge-accent absolute top-2 right-2">
                      {product.discountBadge}
                    </div>
                  )}
                </div>
              </Link>

              {/* কন্টেন্টের অংশ */}
              <div className="mt-3">
                <h3
                  className="text-sm md:text-base font-medium text-base-content truncate group-hover:text-primary transition-colors"
                  title={product.name}
                >
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <p className="font-bold text-base-content text-base md:text-lg">
                      ৳{product.price}
                    </p>
                    {product.oldPrice && (
                      <p className="line-through text-base-content/50 text-xs md:text-sm">
                        ৳{product.oldPrice}
                      </p>
                    )}
                  </div>
                  <button className="btn btn-primary btn-sm btn-circle">
                    <HiOutlineShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
