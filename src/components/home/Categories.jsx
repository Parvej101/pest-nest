"use client";

import Image from "next/image";
import Link from "next/link";

const categoryData = [
  {
    id: 1,
    name: "Cat Food",
    imageSrc: "/images/categories/cat-food.jpg",
    href: "/category/cat-food",
  },
  {
    id: 2,
    name: "Dog Food",
    imageSrc: "/images/categories/dog-food.jpg",
    href: "/category/dog-food",
  },
  {
    id: 3,
    name: "Pet Toys",
    imageSrc: "/images/categories/pet-toys.jpg",
    href: "/category/toys",
  },
  {
    id: 4,
    name: "Treats",
    imageSrc: "/images/categories/treats.jpg",
    href: "/category/treats",
  },
  {
    id: 5,
    name: "Litter",
    imageSrc: "/images/categories/litter.jpg",
    href: "/category/litter",
  },
  {
    id: 6,
    name: "Accessories",
    imageSrc: "/images/categories/accessories.jpg",
    href: "/category/accessories",
  },
];

const Categories = () => {
  return (
    <section className="py-12 md:py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="lg:text-3xl text-xl  font-bold mb-8">
          Explore Our Collections
        </h2>

        {/* --- হরিজন্টাল স্ক্রলিং কন্টেইনার --- */}
        <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {categoryData.map((category) => (
            <Link
              href={category.imageSrc}
              key={category.id}
              className="group block flex-shrink-0 w-40 md:w-48"
            >
              <div className="relative rounded-lg overflow-hidden h-56 md:h-64 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={category.imageSrc}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 30vw, 15vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                {/* আবরণের (Overlay) জন্য div */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* ক্যাটাগরির নাম */}
                <div className="absolute bottom-0 left-0 p-3 md:p-4">
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
