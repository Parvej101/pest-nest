"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiEye } from "react-icons/fi";

const OrderManager = ({ initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const orderStatuses = [
    "all",
    "pending",
    "accepted",
    "in_progress",
    "completed",
    "canceled",
  ];

  // সার্চ এবং ফিল্টারের উপর ভিত্তি করে অর্ডারের তালিকা তৈরি করা
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchLower) ||
        order.customerPhone.includes(searchTerm);

      const matchesStatus =
        selectedStatus === "all" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning"; // হলুদ
      case "accepted":
        return "badge-info"; // নীল
      case "in_progress":
        return "badge-primary"; // প্রাইমারি রঙ
      case "completed":
        return "badge-success"; // সবুজ
      case "canceled":
        return "badge-error"; // লাল
      default:
        return "badge-ghost"; // ডিফল্ট
    }
  };

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-base-200 rounded-lg">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:grow"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="select select-bordered w-full md:w-1/3 capitalize"
        >
          {orderStatuses.map((status) => (
            <option key={status} value={status} className="capitalize">
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
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
                <td colSpan="6" className="text-center py-10">
                  No orders match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;
