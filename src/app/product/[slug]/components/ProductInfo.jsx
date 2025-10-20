// src/app/product/[slug]/components/ProductInfo.jsx
"use client";

import { useState } from "react";
import {
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
} from "react-icons/hi";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="lg:sticky lg:top-24">
      {/* প্রোডাক্টের নাম */}
      <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-base-content">
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

      {/* বর্ণনা */}
      <div className="mt-6">
        <p className="text-base text-base-content/80">{product.description}</p>
      </div>

      {/* Quantity এবং Add to Cart বাটন */}
      <div className="mt-8">
        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="font-medium">
            Quantity:
          </label>
          <div className="join">
            <button
              className="btn join-item"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
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
    </div>
  );
};

export default ProductInfo;
