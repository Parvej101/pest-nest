// src/components/home/FeaturedProducts.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";

// --- আপনার দেওয়া নতুন ডেমো ডেটা ---
const productsData = [
  {
    id: 1,
    name: "Cat Food",
    imageSrc: "/images/products/pet food 1.jpg",
    price: 250,
    oldPrice: 300,
    slug: "Catfood",
  },
  {
    id: 2,
    name: "Purina Friskies Indoor",
    imageSrc: "/images/products/pet food 2.jpg",
    price: 1200,
    slug: "purina-friskies-indoor",
  },
  {
    id: 3,
    name: "Premium Cat Food",
    imageSrc: "/images/products/catfood2.jpg",
    price: 950,
    slug: "meo-cat-food-tuna",
  },
  {
    id: 4,
    name: "SmartHeart Puppy Pack",
    imageSrc: "/images/products/cat food3.jpg",
    price: 1500,
    oldPrice: 1650,
    slug: "smartheart-power-pack",
  },
  {
    id: 5,
    name: "Cozy Cat Bed",
    imageSrc: "/images/products/bed.jpg",
    price: 1500,
    oldPrice: 1650,
    slug: "bed",
  },
  {
    id: 6,
    name: "Airline Approved Carrier",
    imageSrc: "/images/products/carrier.jpg",
    price: 1500,
    oldPrice: 1650,
    slug: "bag",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 md:py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Top Selling Products
          </h2>
          <p className="text-base-content/70 mt-2">
            Handpicked selection of our best products
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {productsData.map((product) => (
            <div key={product.id} className="group">
              <div className="card card-compact bg-transparent p-0">
                {/* ছবির অংশ (3:4 অনুপাত) */}
                <Link href={`/product/${product.slug}`}>
                  <figure className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-base-200 group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </figure>
                </Link>
                {/* কন্টেন্টের অংশ */}
                <div className="mt-3 text-left">
                  <h3 className="text-sm md:text-base font-semibold truncate">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-baseline gap-2">
                      <p className="font-bold text-primary text-base md:text-lg">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
