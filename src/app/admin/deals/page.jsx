"use client";

import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import Select from "react-select"; // react-select ইম্পোর্ট করা হচ্ছে
import Swal from "sweetalert2";

const DealManagerPage = () => {
  // State for the form
  const [title, setTitle] = useState("Special Flash Deal");
  const [expiryDate, setExpiryDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]); // নির্বাচিত প্রোডাক্টের আইডিগুলো রাখার জন্য

  // State for loading data
  const [allProducts, setAllProducts] = useState([]); // সব প্রোডাক্টের তালিকা (ড্রপডাউনের জন্য)
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // প্রাথমিক ডেটা (সব প্রোডাক্ট এবং বর্তমান ডিল) লোড করা
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, dealRes] = await Promise.all([
          fetch("/api/products?status=all"), // সব প্রোডাক্ট (active/inactive) আনা হচ্ছে
          fetch("/api/deals"),
        ]);

        const productsData = await productsRes.json();
        if (productsData.success) {
          setAllProducts(productsData.data);
        }

        if (dealRes.ok) {
          const dealData = await dealRes.json();
          if (dealData.success) {
            setTitle(dealData.data.title);
            setExpiryDate(
              new Date(dealData.data.expiryDate).toISOString().slice(0, 16)
            );
            // .populate() থেকে আসা প্রোডাক্ট অবজেক্টগুলোকে react-select-এর ফরম্যাটে আনা হচ্ছে
            setSelectedProducts(
              dealData.data.productIds.map((p) => ({
                value: p._id,
                label: p.name,
              }))
            );
          }
        }
      } catch (err) {
        console.error("Failed to load initial data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ডিল সেভ করার হ্যান্ডলার
  const handleSaveDeal = async () => {
    setIsSaving(true);
    try {
      const dealData = {
        title,
        expiryDate: new Date(expiryDate).toISOString(),
        productIds: selectedProducts.map((p) => p.value), // শুধু প্রোডাক্টের আইডিগুলো পাঠানো হচ্ছে
      };

      const res = await fetch("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dealData),
      });

      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to save deal.");

      Swal.fire("Success!", "Deal has been saved successfully!", "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // react-select-এর জন্য প্রোডাক্টের তালিকা ফরম্যাট করা
  const productOptions = allProducts.map((p) => ({
    value: p._id,
    label: p.name,
  }));

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="lg:text-3xl text-xl font-bold">Manage Deal</h1>
        <button
          className="btn btn-primary"
          onClick={handleSaveDeal}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <FiSave />
          )}
          Save Deal
        </button>
      </div>

      <div className="bg-base-100 p-6 rounded-lg shadow-md space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Deal Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Expiry Date & Time</span>
          </label>
          <input
            type="datetime-local"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Select Products for Deal
            </span>
          </label>
          <Select
            isMulti
            options={productOptions}
            value={selectedProducts}
            onChange={setSelectedProducts}
            className="text-black" // react-select-এর ডিফল্ট স্টাইল ওভাররাইড করার জন্য
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor:
                  "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity,1)))",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DealManagerPage;
