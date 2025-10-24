"use client"; // পেজটিকে Client Component হিসেবে ঘোষণা করা হচ্ছে

import { useEffect, useState } from "react";
import AddProductForm from "../../components/AddProductForm";

const NewProductPage = () => {
  // ক্যাটাগরি এবং ভ্যারিয়েশন उभয়ের জন্যই state তৈরি করা হচ্ছে
  const [categories, setCategories] = useState([]);
  const [variations, setVariations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect ব্যবহার করে ক্যাটাগরি এবং ভ্যারিয়েশন উভয়ই fetch করা হচ্ছে
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Promise.all ব্যবহার করে দুটি API রিকোয়েস্ট একসাথে চালানো হচ্ছে
        const [catRes, varRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/variations"),
        ]);

        if (!catRes.ok)
          throw new Error(`Failed to fetch categories: ${catRes.statusText}`);
        if (!varRes.ok)
          throw new Error(`Failed to fetch variations: ${varRes.statusText}`);

        const catData = await catRes.json();
        const varData = await varRes.json();

        if (!catData.success)
          throw new Error(catData.error || "Could not load category data.");
        if (!varData.success)
          throw new Error(varData.error || "Could not load variation data.");

        setCategories(catData.data);
        setVariations(varData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // [] dependency মানে হলো, এই ইফেক্টটি শুধুমাত্র একবার চলবে

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl mb-4">Loading Form Data...</h1>
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        Error loading initial data: {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create a New Product</h1>

      {/* ক্যাটাগরি এবং ভ্যারিয়েশন লিস্ট props হিসেবে AddProductForm-কে পাঠানো হচ্ছে */}
      <AddProductForm categories={categories} variations={variations} />
    </div>
  );
};

export default NewProductPage;
