"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import {
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import Swal from "sweetalert2";

const ProductInfo = ({ product }) => {
  const { addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    // এখানে আমরা একটি একটি করে quantity সংখ্যক প্রোডাক্ট যোগ করব
    for (let i = 0; i < quantity; i++) {
      addToCart(product._id, product);
    }

    // সুন্দর নোটিফিকেশন
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${quantity} x ${product.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  return (
    <div className="lg:sticky lg:top-24">
      {/* প্রোডাক্টের নাম */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-base-content">
        {product.name}
      </h1>

      {/* দাম */}
      <div className="mt-3 flex items-center gap-4">
        <p className="text-3xl text-primary font-bold">৳{product.price}</p>
        {product.oldPrice && (
          <p className="text-xl line-through text-base-content/40">
            ৳{product.oldPrice}
          </p>
        )}
      </div>

      {/* Quantity এবং Add to Cart বাটন */}
      <div className="mt-8">
        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="font-medium">
            Quantity:
          </label>
          <div className="join">
            <button className="btn join-item" onClick={handleAddToCart}>
              <HiOutlineMinus />
            </button>
            <input
              type="text"
              id="quantity"
              value={quantity}
              readOnly
              className="input input-bordered join-item w-16 text-center"
            />
            <button
              className="btn join-item"
              onClick={() => setQuantity(quantity + 1)}
            >
              <HiOutlinePlus />
            </button>
          </div>
        </div>
        <button className="btn btn-primary btn-lg w-full mt-8">
          <HiOutlineShoppingCart className="h-6 w-6" /> Add to Cart
        </button>
      </div>

      {product.description && (
        <div className="mt-10">
          <h3 className="text-lg font-bold text-base-content/90 mb-2">
            Description
          </h3>
          <p className="text-base text-base-content/80">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
