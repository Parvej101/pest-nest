"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const ProductStatusToggle = ({ productId, initialStatus }) => {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async () => {
    setIsLoading(true);
    const newStatus = status === "active" ? "inactive" : "active";

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error((await res.json()).error || "Failed to update status");
      }

      setStatus(newStatus); // UI-তে স্ট্যাটাস আপডেট করা
      router.refresh(); // Server component রিফ্রেশ করার জন্য (ঐচ্ছিক)

      // একটি ছোট, অ-বাধাদানকারী নোটিফিকেশন
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: `Status changed to ${newStatus}`,
      });
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
      // error হলে পুরনো স্ট্যাটাসে ফিরে যাওয়া
      setStatus(initialStatus);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <input
        type="checkbox"
        className="toggle toggle-sm toggle-success"
        checked={status === "active"}
        onChange={handleStatusChange}
        disabled={isLoading}
      />
    </div>
  );
};

export default ProductStatusToggle;
