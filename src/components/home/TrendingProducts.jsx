import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";

// ধাপ ১: ডেটা আনার জন্য একটি async ফাংশন তৈরি করা
// এই ফাংশনটি আমাদের বানানো API-কে কল করবে
async function getTrendingProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    // ডেটাবেস থেকে পাওয়া সব প্রোডাক্টের মধ্যে থেকে isTrending: true থাকা প্রোডাক্টগুলো ফিল্টার করা
    const trendingProducts = data.data.filter((p) => p.isTrending).slice(0, 10);
    return trendingProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const TrendingProducts = async () => {
  const trendingProducts = await getTrendingProducts();

  return (
    <section className="py-12 md:py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
          <Link href="/shop" className="btn btn-link btn-primary mt-2">
            Shop More <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ---  প্রোডাক্ট কার্ডের গ্রিড --- */}
        {trendingProducts.length === 0 ? (
          <p className="text-center text-base-content/70">
            No trending products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
