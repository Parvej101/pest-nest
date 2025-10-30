import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";

// --- ডাটাবেস এবং মডেল ইম্পোর্ট ---
import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";

async function getFeaturedProducts() {
  try {
    await dbConnect();

    const products = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(8);

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

const FeaturedProducts = async () => {
  const featuredProducts = await getFeaturedProducts();

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

        {featuredProducts.length === 0 ? (
          <p className="text-center text-base-content/70">
            No featured products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
