import Link from "next/link";
import { FiEye } from "react-icons/fi";

// পরিবর্তন ১: আমরা এখন সরাসরি ডেটাবেস কম্পোনেন্টগুলো ইম্পোর্ট করছি
import dbConnect from "../../../../lib/dbConnect.js";
import Order from "../../../../models/Order.js";

// পরিবর্তন ২: getAllOrders ফাংশনটি এখন সরাসরি ডেটাবেস থেকে ডেটা আনবে
async function getAllOrders() {
  try {
    await dbConnect(); // ডেটাবেস সংযোগ স্থাপন
    const orders = await Order.find({}).sort({ createdAt: -1 });
    // Mongoose ডকুমেন্টগুলোকে প্লেইন JavaScript অবজেক্টে রূপান্তর করা হচ্ছে
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Error fetching orders directly from DB:", error);
    return { error: error.message };
  }
}

const OrdersPage = async () => {
  const ordersData = await getAllOrders();

  if (ordersData.error) {
    return <div className="alert alert-error">Error: {ordersData.error}</div>;
  }

  const orders = ordersData;

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover">
                  <th className="text-xs">#{order._id.slice(-6)}</th>
                  <td>
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-sm opacity-70">{order.customerPhone}</p>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("en-US")}
                  </td>
                  <td className="font-bold">৳{order.grandTotal.toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge ${getStatusBadge(
                        order.status
                      )} capitalize`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="text-center">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="btn btn-ghost btn-sm btn-circle"
                    >
                      <FiEye className="text-info" size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-base-content/60"
                >
                  No orders found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
