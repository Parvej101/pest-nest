import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import ProductTable from "./components/ProductTable"; // আমাদের নতুন Client Component

// সার্ভারেই সব প্রোডাক্ট fetch করা হচ্ছে
async function getAllProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?status=all`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// সার্ভারেই সব ক্যাটাগরি fetch করা হচ্ছে
async function getAllCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ProductsPage = async () => {
  // Promise.all দিয়ে একসাথে দুটি API কল করা হচ্ছে
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
      <ProductTable products={products} categories={categories} />
    </div>
  );
};

export default ProductsPage;
