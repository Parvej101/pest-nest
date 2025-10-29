"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      setError(null);
      let fetchedOrders = [];
      try {
        if (status === "authenticated") {
          const res = await fetch("/api/my-orders");
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          fetchedOrders = data.data;
        } else if (status === "unauthenticated") {
          const guestOrderIds =
            JSON.parse(localStorage.getItem("guest_orders")) || [];
          if (guestOrderIds.length > 0) {
            const res = await fetch("/api/guest-orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderIds: guestOrderIds }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            fetchedOrders = data.data;
          }
        }
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (status !== "loading") {
      loadOrders();
    }
  }, [status]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "badge-warning",
      accepted: "badge-info",
      in_progress: "badge-primary",
      completed: "badge-success",
      canceled: "badge-error",
    };
    return statusClasses[status] || "badge-ghost";
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-4xl mx-auto">Error: {error}</div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-bold">No Orders Found</h1>
        <p className="mt-2 text-base-content/70">
          You haven't placed any orders yet.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
          {status === "unauthenticated" && (
            <button
              onClick={() => signIn("google")}
              className="btn btn-outline"
            >
              Login
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="lg:text-3xl text-xl font-bold lg:mb-8 mb-4">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-base-100 rounded-lg shadow p-4 sm:p-6"
          >
            {/* --- অর্ডারের হেডার --- */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-base-300 pb-3 mb-4 gap-2">
              <div>
                <p className="font-bold text-sm sm:text-base">
                  Order ID:{" "}
                  <span className="font-normal text-base-content/70">
                    #{order._id.slice(-6)}
                  </span>
                </p>
                <p className="text-sm text-base-content/70">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`badge ${getStatusBadge(order.status)} capitalize`}
              >
                {order.status.replace("_", " ")}
              </span>
            </div>

            {/* --- পরিবর্তন: অর্ডারের আইটেমগুলো এখন এখানে দেখানো হচ্ছে --- */}
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div
                  key={item._id || item.productId}
                  className="flex items-center gap-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="grow">
                    <p className="font-semibold line-clamp-2">{item.name}</p>
                    <p className="text-sm text-base-content/70">
                      ৳{item.price} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ৳{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* --- অর্ডারের ফুটার --- */}
            <div className="border-t border-base-300 pt-3 mt-4 text-right">
              <p className="text-right font-bold text-lg">
                Total: ৳{order.grandTotal.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
