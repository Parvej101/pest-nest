"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSave, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const OrderStatusChanger = ({ orderId, currentStatus }) => {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isSaving, setIsSaving] = useState(false);

  const orderStatuses = [
    "pending",
    "accepted",
    "in_progress",
    "completed",
    "canceled",
  ];

  const handleStatusUpdate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to update status");
      Swal.fire("Success!", "Order status updated successfully.", "success");
      router.refresh(); // পেজের ডেটা রিফ্রেশ করা
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteOrder = async () => {
    const result = await Swal.fire({
      title: "Delete this order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
        if (!res.ok)
          throw new Error((await res.json()).error || "Failed to delete order");
        await Swal.fire("Deleted!", "The order has been deleted.", "success");
        router.push("/admin/orders"); // অর্ডার লিস্ট পেজে ফিরে যাওয়া
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Change Status</span>
        </label>
        <div className="flex gap-2">
          <select
            className="select select-bordered grow"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {orderStatuses.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={handleStatusUpdate}
            disabled={isSaving || status === currentStatus}
          >
            {isSaving ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FiSave />
            )}
          </button>
        </div>
      </div>

      <div className="divider">Or</div>

      <button
        className="btn btn-error btn-outline w-full"
        onClick={handleDeleteOrder}
      >
        <FiTrash2 /> Delete This Order
      </button>
    </div>
  );
};

export default OrderStatusChanger;
