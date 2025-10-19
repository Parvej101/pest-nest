// src/components/home/PromoBanners.jsx

"use client";

import Image from "next/image";
import Link from "next/link";

// --- অ্যাডমিন প্যানেল থেকে ডেটা যেভাবে আসবে (এখনকার জন্য ডেমো ডেটা) ---
// ভবিষ্যতে, এই অবজেক্টটি API থেকে আসবে
const bannerData = {
  bannerLeft: {
    imageSrc: "/images/promo/toys.jpg", // অ্যাডমিন প্যানেল থেকে আপলোড করা ছবি
    href: "/deals/himalaya-offer", // ব্যানারে ক্লিক করলে কোথায় যাবে
  },
  bannerRight: {
    imageSrc: "/images/promo/cat food.jpg", // অ্যাডমিন প্যানেল থেকে আপলোড করা ছবি
    href: "/category/cat-food", // ব্যানারে ক্লিক করলে কোথায় যাবে
  },
};

const PromoBanners = () => {
  return (
    <section className="lg:py-5 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ব্যানারগুলোর জন্য রেসপন্সিভ গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* --- ব্যানার ১: বাম দিকের স্লট --- */}
          <Link href={bannerData.bannerLeft.href}>
            <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={bannerData.bannerLeft.imageSrc}
                alt="Promotional Banner 1"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>

          {/* --- ব্যানার ২: ডান দিকের স্লট --- */}
          <Link href={bannerData.bannerRight.href}>
            <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={bannerData.bannerRight.imageSrc}
                alt="Promotional Banner 2"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
