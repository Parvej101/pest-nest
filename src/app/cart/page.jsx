"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

const CartPage = () => {
  // Context থেকে coupon এবং applyCoupon ফাংশনসহ সব প্রয়োজনীয় জিনিস নেওয়া হচ্ছে
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    coupon,
    applyCoupon,
  } = useCart();

  // এই state-টি শুধুমাত্র ইনপুট ফিল্ডের মান রাখার জন্য
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // discount এবং grandTotal এখন সরাসরি Context-এর coupon state থেকে আসছে
  const discount = coupon.discount || 0;
  const grandTotal = subTotal - discount;

  const handleApplyCoupon = async () => {
    setCouponError("");
    const result = await applyCoupon(couponCodeInput);
    if (!result.success) {
      setCouponError(result.error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 max-w-lg mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-base-content/70 mb-8">
          Let's add some items to make your pet happy!
        </p>
        <Link href="/shop" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {/* --- ডেস্কটপের জন্য টেবিল লেআউট (lg স্ক্রিন থেকে বড়) --- */}
          <div className="hidden lg:block overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-1/2">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-20 h-20 rounded-md">
                            <Image
                              src={item.imageSrc}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>৳{item.price}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="btn btn-xs btn-outline"
                        >
                          <HiOutlineMinus />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="btn btn-xs btn-outline"
                        >
                          <HiOutlinePlus />
                        </button>
                      </div>
                    </td>
                    <td>৳{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <FiTrash2 className="text-error" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- মোবাইলের জন্য কার্ড লেআউট (lg স্ক্রিনের নিচে) --- */}
          <div className="lg:hidden space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-base-100 rounded-lg shadow p-4">
                <div className="flex gap-4">
                  <div className="relative shrink-0">
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="btn btn-xs btn-circle btn-error absolute -top-2 -left-2"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                  <div className="grow">
                    <p className="font-semibold text-base sm:text-lg leading-tight line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-sm mt-1 text-base-content/70">
                      ৳{item.price}
                    </p>
                  </div>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="btn btn-sm btn-outline join-item"
                    >
                      <HiOutlineMinus />
                    </button>
                    <span className="w-8 text-center font-bold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="btn btn-sm btn-outline join-item"
                    >
                      <HiOutlinePlus />
                    </button>
                  </div>
                  <p className="font-bold text-lg">
                    ৳{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <Link href="/shop" className="btn btn-outline">
              Continue Shopping
            </Link>
            <button onClick={clearCart} className="btn btn-error btn-outline">
              Clear Cart
            </button>
          </div>
        </div>

        {/* --- Order Summary --- */}
        <div className="bg-base-100 p-6 rounded-lg shadow lg:sticky lg:top-24 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>৳{subTotal.toFixed(2)}</p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <p>Discount ({coupon.code}):</p>
                <p>- ৳{discount.toFixed(2)}</p>
              </div>
            )}
            <div className="divider my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <p>Grand Total:</p>
              <p>৳{grandTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-6">
            <label className="label">
              <span className="label-text font-semibold">Have a coupon?</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value)}
                placeholder="Enter coupon code"
                className="input input-bordered w-full"
              />
              <button onClick={handleApplyCoupon} className="btn btn-secondary">
                Apply
              </button>
            </div>
            {couponError && (
              <p className="text-error text-sm mt-2">{couponError}</p>
            )}
          </div>
          <div className="mt-6">
            <Link href="/checkout" className="btn btn-primary w-full">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
