export const dynamic = "force-dynamic";

import StockManager from "../components/StockManager";

import dbConnect from "../../../../../lib/dbConnect";
import Category from "../../../../../models/Category";
import Product from "../../../../../models/Product";

async function getAllProducts() {
  try {
    await dbConnect();

    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching all products for stock page:", error);
    return [];
  }
}

// সার্ভারেই সব ক্যাটাগরি fetch করা হচ্ছে
async function getAllCategories() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching all categories for stock page:", error);
    return [];
  }
}

// ===================================================================

const StockPage = async () => {
  // Promise.all দিয়ে একসাথে দুটি ডেটা ফেচিং ফাংশন চালানো হচ্ছে
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Current Stock Info</h1>
      </div>

      {/* StockManager কম্পোনেন্টকে ডেটা পাস করে দেওয়া হচ্ছে */}
      <StockManager initialProducts={products} initialCategories={categories} />
    </div>
  );
};

export default StockPage;
