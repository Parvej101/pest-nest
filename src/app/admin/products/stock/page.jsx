import StockManager from "../components/StockManager";

// সার্ভারেই সব প্রোডাক্ট fetch করা হচ্ছে
async function getAllProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store",
    });
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

const StockPage = async () => {
  // Promise.all দিয়ে একসাথে দুটি API কল করা হচ্ছে
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
      <StockManager initialProducts={products} categories={categories} />
    </div>
  );
};

export default StockPage;
