import ProductCard from "@/components/shared/ProductCard";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";

import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";
import dbConnect from "../../../../lib/dbConnect";
import Product from "../../../../models/Product";

async function getProductBySlug(slug) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug });
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch (error) {
    console.error(`Failed to fetch product for slug: ${slug}`, error);
    return null;
  }
}

async function getRelatedProducts(category, currentProductId) {
  try {
    await dbConnect();
    // একই ক্যাটাগরির অন্য প্রোডাক্ট খোঁজা হচ্ছে
    const products = await Product.find({
      category: category,
      _id: { $ne: currentProductId },
    }).limit(5); // সর্বোচ্চ ৫টি প্রোডাক্ট

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}

const ProductDetailsPage = async ({ params }) => {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">
          Product with slug '{slug}' not found!
        </h1>
      </div>
    );
  }

  // Related Products আনা হচ্ছে
  const relatedProducts = await getRelatedProducts(
    product.category,
    product._id
  );

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: product.name, href: `/product/${slug}` },
  ];

  return (
    <section className="pt-4 pb-12 md:pt-8 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-4 md:mb-8">
          <ol
            role="list"
            className="flex items-center space-x-2 text-xs sm:text-sm truncate"
          >
            {breadcrumbs.map((breadcrumb, i) => (
              <li key={breadcrumb.name} className="truncate">
                <div className="flex items-center">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-base-content/70 hover:text-primary truncate"
                  >
                    {breadcrumb.name}
                  </Link>
                  {i < breadcrumbs.length - 1 && (
                    <HiOutlineChevronRight className="ml-2 h-4 w-4 shrink-0" />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>

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

        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-24">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center">
              You Might Also Like
            </h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related._id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;

// ===================================================================
//  স্ট্যাটিক পাথ জেনারেট করা (পারফরম্যান্সের জন্য খুবই ভালো)
// ===================================================================

export async function generateStaticParams() {
  try {
    await dbConnect();
    const products = await Product.find({}, "slug");

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [];
  }
}
