"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product || !product.imageSrc) {
    return null;
  }
  const handleAddToCart = () => {
    addToCart(product._id, product);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: `${product.name} added to cart`,
    });
  };

  return (
    <div className="group">
      {/* ছবির অংশ */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-base-200 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* কন্টেন্টের অংশ  */}
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
          >
            <HiOutlineShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
