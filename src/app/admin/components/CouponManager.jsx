"use client";
import { useEffect, useState } from "react";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    expiryDate: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/coupons");
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setCoupons(data.data);
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: "",
      expiryDate: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/coupons/${editingId}` : "/api/coupons";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      resetForm();
      await fetchCoupons();
      Swal.fire(
        "Success!",
        `Coupon successfully ${editingId ? "updated" : "added"}.`,
        "success"
      );
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/coupons/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error((await res.json()).error);
        await fetchCoupons();
        Swal.fire("Deleted!", "The coupon has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      expiryDate: new Date(coupon.expiryDate).toISOString().slice(0, 10), // Date format for input[type=date]
    });
  };

  return (
    <div>
      <div className="bg-base-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Coupon" : "Add New Coupon"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon Code</span>
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="input input-bordered uppercase"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Expiry Date</span>
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Discount Type</span>
              </label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleInputChange}
                className="select select-bordered"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Discount Value</span>
              </label>
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : editingId ? (
                "Update Coupon"
              ) : (
                <>
                  <FiPlusCircle /> Add Coupon
                </>
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-ghost"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Expires On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  <span className="loading loading-spinner"></span>
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>
                    <kbd className="kbd">{coupon.code}</kbd>
                  </td>
                  <td className="capitalize">{coupon.discountType}</td>
                  <td>
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `৳${coupon.discountValue}`}
                  </td>
                  <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        new Date(coupon.expiryDate) < new Date()
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {new Date(coupon.expiryDate) < new Date()
                        ? "Expired"
                        : "Active"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="btn btn-xs btn-ghost"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="btn btn-xs btn-ghost"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CouponManager;
