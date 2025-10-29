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
  const { cartItems, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;

  // কার্টে এই প্রোডাক্টটির বর্তমান পরিমাণ কত
  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const remainingStock = (product.stock || 0) - quantityInCart;

  const handleAddToCart = () => {
    // যোগ করার চেষ্টা করা পরিমাণটি কি স্টকের চেয়ে বেশি?
    if (quantity > remainingStock) {
      Swal.fire(
        "Stock Limit!",
        `You can only add ${remainingStock} more item(s) to the cart.`,
        "warning"
      );
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product._id, product);
    }
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${quantity} x ${product.name} has been added.`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleQuantityIncrease = () => {
    // কোয়ান্টিটি remainingStock-এর চেয়ে বেশি হতে দেওয়া হবে না
    if (quantity < remainingStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="lg:sticky lg:top-24">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-base-content">
        {product.name}
      </h1>
      {/* পরিবর্তন: স্টকের তথ্য দেখানো হচ্ছে */}
      <div className="mt-2">
        {isOutOfStock ? (
          <span className="badge badge-lg badge-error text-white">
            Out of Stock
          </span>
        ) : (
          <span className="badge badge-lg badge-success text-white">
            {remainingStock} in stock
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-4">
        <p className="text-3xl text-primary font-bold">৳{product.price}</p>
        {product.oldPrice && (
          <p className="text-xl line-through text-base-content/40">
            ৳{product.oldPrice}
          </p>
        )}
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="font-medium">
            Quantity:
          </label>
          <div className="join">
            <button
              className="btn join-item"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isOutOfStock}
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
            {/* পরিবর্তন: '+' বাটনটিও এখন স্টক অনুযায়ী নিষ্ক্রিয় হবে */}
            <button
              className="btn join-item"
              onClick={handleQuantityIncrease}
              disabled={isOutOfStock || quantity >= remainingStock}
            >
              <HiOutlinePlus />
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="btn btn-primary btn-lg w-full mt-8"
          disabled={isOutOfStock}
        >
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
