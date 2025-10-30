"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Swal from "sweetalert2";

const ProductGrid = ({ products }) => {
  const { cartItems, addToCart } = useCart();

  const handleAddToCart = (product) => {
    const cartItem = cartItems.find((item) => item._id === product._id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;
    const availableStock = product.stock || 0;

    if (quantityInCart >= availableStock) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock!",
        text: `You have already added all available stock for ${product.name}.`,
      });
      return;
    }

    addToCart(product._id, product);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  if (!products || products.length === 0) {
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
      {products.map((product, index) => {
        const cartItem = cartItems.find((item) => item._id === product._id);
        const quantityInCart = cartItem ? cartItem.quantity : 0;
        const availableStock = product.stock || 0;
        const isOutOfStock = availableStock <= quantityInCart;

        return (
          <div key={product._id} className="group">
            <Link href={`/product/${product.slug}`}>
              <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-base-200 shadow-sm hover:shadow-xl transition-shadow">
                <Image
                  src={product.imageSrc || "/placeholder.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 4}
                />
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="badge badge-error text-white p-3 text-sm">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </Link>
            <div className="mt-3">
              <h3 className="text-sm font-medium text-base-content truncate">
                <Link href={`/product/${product.slug}`}>{product.name}</Link>
              </h3>
              <div className="mt-2 flex justify-between items-center">
                <p className="font-bold text-primary text-lg">
                  ৳{product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary btn-sm btn-circle"
                  aria-label={`Add ${product.name} to cart`}
                  disabled={isOutOfStock}
                >
                  <HiOutlineShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
