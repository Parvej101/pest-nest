// src/components/shop/ProductGrid.jsx

import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">No Products Found</h2>
        <p className="mt-2 text-base-content/70">
          Sorry, we couldn't find any products matching your filters.
        </p>
        <Link href="/shop">
          <button className="btn btn-primary mt-6">
            Clear Filters & Go Back
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
      {products.map((product, index) => (
        <div key={product.id} className="group">
          <Link href={`/product/${product.slug}`}>
            <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-base-200 shadow-sm hover:shadow-xl transition-shadow">
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                sizes="50vw"
                className="object-cover"
                priority={index < 4}
              />
            </div>
          </Link>
          <div className="mt-3">
            <h3 className="text-sm font-medium text-base-content truncate">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            <div className="mt-2 flex justify-between items-center">
              <p className="font-bold text-primary text-lg">৳{product.price}</p>
              <button className="btn btn-primary btn-sm btn-circle">
                <HiOutlineShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
