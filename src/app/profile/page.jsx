"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiEdit, FiHome, FiPlus, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

// --- ঠিকানা যোগ বা এডিট করার জন্য একটি আলাদা Modal কম্পোনেন্ট ---
const AddressModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [address, setAddress] = useState(
    initialData || {
      addressLine1: "",
      city: "",
      postalCode: "",
      phone: "",
      isDefault: false,
    }
  );

  // initialData পরিবর্তন হলে state রিসেট করার জন্য
  useEffect(() => {
    setAddress(
      initialData || {
        addressLine1: "",
        city: "",
        postalCode: "",
        phone: "",
        isDefault: false,
      }
    );
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {initialData ? "Edit Address" : "Add New Address"}
        </h3>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <input
            type="text"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleChange}
            placeholder="Address Line"
            className="input input-bordered w-full"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="input input-bordered w-full"
              required
            />
          </div>
          <input
            type="tel"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input input-bordered w-full"
            required
          />
          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4">
              <input
                type="checkbox"
                name="isDefault"
                checked={address.isDefault}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Set as default address</span>
            </label>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

// --- মূল প্রোফাইল পেজ কম্পোনেন্ট ---
export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
    }
    if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setUserData(data.data);
    } catch (err) {
      Swal.fire("Error!", "Failed to load profile data.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      // UI স্টেট আপডেট করা
      setUserData(data.data);

      // সেশন আপডেট করা (যদি নাম পরিবর্তন হয়)
      if (updatedData.name) {
        await updateSession({
          user: { ...session.user, name: updatedData.name },
        });
      }
      return true;
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
      return false;
    }
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    const newName = e.target.elements.name.value;
    const success = await handleUpdateProfile({ name: newName });
    if (success) {
      Swal.fire("Success!", "Your name has been updated.", "success");
    }
  };

  const handleSaveAddress = async (addressData) => {
    let updatedAddresses = [...(userData.addresses || [])];

    // নতুন ঠিকানা হলে _id ছাড়া যোগ করা, এডিট হলে _id সহ
    const newAddress = { ...addressData };
    if (!editingAddress) delete newAddress._id;

    if (editingAddress) {
      updatedAddresses = updatedAddresses.map((addr) =>
        addr._id === editingAddress._id ? newAddress : addr
      );
    } else {
      updatedAddresses.push(newAddress);
    }

    if (newAddress.isDefault) {
      updatedAddresses.forEach((addr) => {
        if (addr !== newAddress) addr.isDefault = false;
      });
    }

    const success = await handleUpdateProfile({ addresses: updatedAddresses });
    if (success) {
      Swal.fire(
        "Success!",
        `Address ${editingAddress ? "updated" : "saved"}.`,
        "success"
      );
      setIsModalOpen(false);
    }
  };

  const handleDeleteAddress = (addressId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedAddresses = userData.addresses.filter(
          (addr) => addr._id !== addressId
        );
        const success = await handleUpdateProfile({
          addresses: updatedAddresses,
        });
        if (success) {
          Swal.fire("Deleted!", "Your address has been deleted.", "success");
        }
      }
    });
  };

  const handleSetDefault = async (addressId) => {
    const updatedAddresses = userData.addresses.map((addr) => ({
      ...addr,
      isDefault: addr._id === addressId,
    }));
    await handleUpdateProfile({ addresses: updatedAddresses });
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-20">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    // --- নতুন ডিজাইন: সেন্ট্রাল কার্ড লেআউট ---
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        My Account
      </h1>

      {/* Personal Information Card */}
      <div className="bg-base-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <form onSubmit={handleNameUpdate} className="max-w-md space-y-4">
          <div className="form-control">
            <label className="label flex mb-2">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={userData?.name}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label flex mb-2">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              value={userData?.email}
              className="input input-bordered"
              disabled
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>

      {/* Address Management Card */}
      <div className="bg-base-100 p-6 md:p-8 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Manage Addresses</h2>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditingAddress(null);
              setIsModalOpen(true);
            }}
          >
            <FiPlus /> Add New Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userData?.addresses?.map((address) => (
            <div
              key={address._id}
              className={`card bg-base-200 shadow-md ${
                address.isDefault
                  ? "border-2 border-primary"
                  : "border border-transparent"
              }`}
            >
              <div className="card-body p-5">
                {address.isDefault && (
                  <div className="badge badge-primary absolute top-3 right-3 gap-2">
                    <FiHome size={12} /> Default
                  </div>
                )}
                <p className="font-semibold">{address.addressLine1}</p>
                <p>
                  {address.city}, {address.postalCode}
                </p>
                <p className="text-sm opacity-70">Phone: {address.phone}</p>
                <div className="card-actions justify-end mt-4">
                  {!address.isDefault && (
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleSetDefault(address._id)}
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-ghost btn-circle"
                    onClick={() => {
                      setEditingAddress(address);
                      setIsModalOpen(true);
                    }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-ghost btn-circle text-error"
                    onClick={() => handleDeleteAddress(address._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!userData?.addresses || userData.addresses.length === 0) && (
          <div className="text-center text-base-content/60 py-10">
            <p>You have no saved addresses.</p>
            <p className="text-sm">Click 'Add New Address' to get started.</p>
          </div>
        )}
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />
    </div>
  );
}
