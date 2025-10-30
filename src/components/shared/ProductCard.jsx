"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();

  if (!product || !product.imageSrc) {
    return null;
  }

  // কার্টে এই প্রোডাক্টটির বর্তমান পরিমাণ কত, তা বের করা হচ্ছে
  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // প্রোডাক্টটির মোট স্টক কত এবং স্টকে আছে কিনা
  const availableStock = product.stock || 0;
  const isOutOfStock = availableStock <= quantityInCart;

  const handleAddToCart = () => {
    //  addToCart কল করার আগেই এখানে স্টক চেক করা হচ্ছে
    if (isOutOfStock) {
      Swal.fire({
        icon: "error",
        title: "Stock Limit Reached!",
        text: `You have already added the maximum available stock for "${product.name}".`,
      });
      return;
    }

    addToCart(product._id, product);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({ icon: "success", title: `Added to cart` });
  };

  return (
    <div className="group">
      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-base-200 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="badge badge-error text-white">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="mt-3 text-left">
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

          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm btn-circle"
            disabled={isOutOfStock}
          >
            <HiOutlineShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
