import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import OrderStatusChanger from "../../components/OrderStatusChanger";

async function getOrderById(id) {
  try {
    const dbConnect = require("../../../../../lib/dbConnect.js").default;
    const Order = require("../../../../../models/Order.js").default;
    const mongoose = require("mongoose");

    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: "Invalid Order ID format" };
    }

    const order = await Order.findById(id).lean();

    if (!order) {
      return { error: `Order not found with ID: ${id}` };
    }

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.error("Failed to fetch order details:", error);
    return { error: error.message };
  }
}

const OrderDetailsPage = async ({ params }) => {
  const { id } = params;
  const order = await getOrderById(id);

  if (order.error) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-error">Error</h1>
        <p>{order.error}</p>
        <Link href="/admin/orders" className="btn btn-primary mt-4">
          Back to Orders
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "accepted":
        return "badge-info";
      case "in_progress":
        return "badge-primary";
      case "completed":
        return "badge-success";
      case "canceled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/orders" className="btn btn-ghost btn-circle">
          <FiArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-sm text-base-content/70">
            Order ID: #{order._id.slice(-6)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* --- বাম কলাম: আইটেম এবং মোট হিসাব --- */}
        <div className="lg:col-span-2 bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div
                key={item._id || item.productId}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-base-content/70">
                      ৳{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  ৳{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="divider mt-6"></div>

          {/* পরিবর্তন: মোট হিসাবের সেকশনটি এখন ডিসকাউন্ট দেখাবে */}
          <div className="space-y-2 w-full sm:w-1/2 ml-auto text-right">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p className="font-semibold">৳{order.subTotal.toFixed(2)}</p>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-success">
                <p>Discount:</p>
                <p className="font-semibold">- ৳{order.discount.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p className="font-semibold">
                ৳{order.shippingCharge.toFixed(2)}
              </p>
            </div>
            <div className="divider my-1"></div>
            <div className="flex justify-between text-lg font-bold">
              <p>Grand Total:</p>
              <p className="text-primary">৳{order.grandTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* --- ডান কলাম: কাস্টমার এবং স্ট্যাটাস --- */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Customer Details</h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {order.customerName}
              </p>
              <p>
                <strong>Phone:</strong> {order.customerPhone}
              </p>
              <p>
                <strong>Email:</strong> {order.customerEmail || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress}
              </p>
              <p className="capitalize">
                <strong>Area:</strong> {order.shippingArea.replace("_", " ")}
              </p>
            </div>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Manage Order</h2>
            <div className="mb-4">
              <span className="font-semibold">Current Status: </span>
              <span
                className={`badge ${getStatusBadge(order.status)} capitalize`}
              >
                {order.status.replace("_", " ")}
              </span>
            </div>
            <OrderStatusChanger
              orderId={order._id}
              currentStatus={order.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
