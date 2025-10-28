"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const grandTotal = subTotal - discount;

  const handleApplyCoupon = () => {
    setCouponError("");
    if (couponCode.toUpperCase() === "PET10") {
      const calculatedDiscount = subTotal * 0.1;
      setDiscount(calculatedDiscount);
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon code.");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-12 py-7">
      <h1 className="lg:text-3xl text-2xl font-bold lg:mb-8 mb-4">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
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
                    <p className="font-semibold text-sm lg:text-lg leading-tight line-clamp-3">
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
            <Link href="/shop" className="btn btn-outline mr-2">
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
            {/* পরিবর্তন ৩: Shipping line-টি মুছে দেওয়া হয়েছে */}
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <p>Discount (PET10):</p>
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
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
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
