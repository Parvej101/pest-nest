"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

const CartSlider = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        {/* Drawer বন্ধ করার জন্য Label */}
        <label
          htmlFor="cart-drawer"
          aria-label="close sidebar"
          className="btn btn-ghost btn-circle"
        >
          ✕
        </label>
      </div>

      {cartItems.length === 0 ? (
        <div className="grow flex flex-col items-center justify-center">
          <p className="text-lg text-base-content/70">Your cart is empty.</p>
          <label htmlFor="cart-drawer" className="btn btn-primary mt-4">
            Continue Shopping
          </label>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="grow overflow-y-auto -mr-4 pr-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">৳{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="btn btn-xs btn-outline"
                      >
                        <HiOutlineMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="btn btn-xs btn-outline"
                      >
                        <HiOutlinePlus />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn btn-ghost btn-sm btn-circle self-start"
                  >
                    <FiTrash2 className="text-error" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Footer */}
          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between font-bold text-lg">
              <p>Sub Total:</p>
              <p>৳{subTotal.toFixed(2)}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Link href="/cart" className="btn btn-outline btn-primary">
                View Cart
              </Link>
              <Link href="/checkout" className="btn btn-primary">
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSlider;
