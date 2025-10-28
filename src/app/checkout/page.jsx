"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    shippingAddress: "",
  });

  const [shippingArea, setShippingArea] = useState("inside_dhaka");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        customerName: session.user.name || "",
        customerEmail: session.user.email || "",
      }));
    }
  }, [session]);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCharge = shippingArea === "inside_dhaka" ? 70 : 120;
  const grandTotal = subTotal + shippingCharge;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const orderData = {
      ...formData,
      shippingArea,
      orderItems: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.imageSrc,
      })),
      subTotal,
      shippingCharge,
      grandTotal,
      userId: session?.user?.id,
    };
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to place order.");
      await Swal.fire(
        "Thank You!",
        "Your order has been placed successfully!",
        "success"
      );
      clearCart();
      router.push("/");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start"
      >
        <div className="lg:col-span-3 bg-base-100 p-6 md:p-8 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-4">Billing Details</h2>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold ">Name *</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">Phone *</label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">Email</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>

          {/* পরিবর্তন: Delivery Location এখন একটি সুন্দর গ্রিডে সাজানো */}
          <div className="form-control ">
            <label className="label">
              <span className="label-text mb-2">Delivery Location *</span>
            </label>
            <div className="grid grid-cols-1/2 sm:grid-cols-2 gap-3">
              <label className="cursor-pointer border border-base-300 rounded-lg p-3 flex items-center gap-3">
                <input
                  type="radio"
                  name="shippingArea"
                  className="radio radio-primary"
                  value="inside_dhaka"
                  checked={shippingArea === "inside_dhaka"}
                  onChange={(e) => setShippingArea(e.target.value)}
                />
                <span className="label-text">
                  Inside Dhaka: <strong>70TK</strong>
                </span>
              </label>
              <label className="cursor-pointer border border-base-300 rounded-lg p-3 flex items-center gap-3 ">
                <input
                  type="radio"
                  name="shippingArea"
                  className="radio radio-primary"
                  value="outside_dhaka"
                  checked={shippingArea === "outside_dhaka"}
                  onChange={(e) => setShippingArea(e.target.value)}
                />
                <span className="label-text">
                  Outside Dhaka: <strong>120TK</strong>
                </span>
              </label>
            </div>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Address *</span>
            </label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              className="textarea textarea-bordered h-24 lg:h-32 w-full"
              placeholder="House number and street name"
              required
            ></textarea>
          </div>
        </div>

        {/* --- Right Column: Order Summary --- */}
        <div className="lg:col-span-2 bg-base-100 p-6 rounded-lg shadow-md lg:sticky lg:top-24">
          <h2 className="text-xl font-bold mb-4 border-b border-base-300 pb-3">
            Your Order
          </h2>
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-md">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-sm">
                      ৳{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ৳{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>৳{subTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Charge</p>
              <p>৳{shippingCharge.toFixed(2)}</p>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>৳{grandTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Select a payment option</h3>
            <div className="border border-primary bg-primary/10 rounded-lg p-4 cursor-pointer">
              <label className="label justify-start gap-4">
                <input
                  type="radio"
                  name="payment"
                  className="radio radio-primary"
                  checked
                  readOnly
                />{" "}
                <span className="label-text font-bold">Cash On Delivery</span>
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || cartItems.length === 0}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                `Place Order`
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
