"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const ProductActions = ({ productId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
        if (!res.ok)
          throw new Error((await res.json()).error || "Failed to delete");
        Swal.fire("Deleted!", "The product has been deleted.", "success");
        router.refresh();
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      <Link
        href={`/admin/products/edit/${productId}`}
        className="btn btn-ghost btn-sm btn-circle"
      >
        <FiEdit className="text-info" size={18} />
      </Link>
      <button
        onClick={handleDelete}
        className="btn btn-ghost btn-sm btn-circle"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <FiTrash2 className="text-error" size={18} />
        )}
      </button>
    </div>
  );
};

export default ProductActions;
