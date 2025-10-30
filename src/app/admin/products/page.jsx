// src/app/admin/products/page.js

// পরিবর্তন ১: অ্যাডমিন পেজগুলোকে ডাইনামিক হিসেবে চিহ্নিত করা
export const dynamic = "force-dynamic";

import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import ProductTable from "./components/ProductTable";

// --- ডাটাবেস এবং মডেল ইম্পোর্ট ---
import dbConnect from "../../../../lib/dbConnect";
import Category from "../../../../models/Category";
import Product from "../../../../models/Product";

async function getAllProducts() {
  try {
    await dbConnect();

    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching all products for admin:", error);
    return [];
  }
}

async function getAllCategories() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching all categories for admin:", error);
    return [];
  }
}

const ProductsPage = async () => {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="lg:text-3xl text-lg font-bold">Manage Products</h1>
        <Link
          href="/admin/products/new"
          className="btn btn-primary btn-sm lg:btn-md"
        >
          <FiPlusCircle /> Add New Product
        </Link>
      </div>

      {/* ProductTable কম্পোনেন্টকে ডেটা পাস করে দেওয়া হচ্ছে */}
      <ProductTable initialProducts={products} initialCategories={categories} />
    </div>
  );
};

export default ProductsPage;
