import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";

async function getProductBySlug(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null; // প্রোডাক্ট খুঁজে না পাওয়া গেলে null রিটার্ন করা হবে
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch single product:", error);
    return null;
  }
}

async function getRelatedProducts(category, currentSlug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data
      .filter((p) => p.category === category && p.slug !== currentSlug)
      .slice(0, 5);
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
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Product with slug '{slug}' not found!
        </h1>
      </div>
    );
  }

  // Related Products-ও API থেকে আনা হচ্ছে
  const relatedProducts = await getRelatedProducts(
    product.category,
    product.slug
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
                    <HiOutlineChevronRight className="ml-2 h-4 w-4 flex-shrink-0" />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Server Component ডেটা পাস করছে Client Component-কে */}
          <ProductImageGallery
            thumbnailSrc={product.imageSrc}
            galleryImages={product.galleryImages}
            productName={product.name}
          />
          <div className="mt-10 lg:mt-0">
            {/* Server Component ডেটা পাস করছে Client Component-কে */}
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
