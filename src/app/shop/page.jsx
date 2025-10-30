import ProductGrid from "./ProductGrid"; // আপনার বিদ্যমান ProductGrid কম্পোনেন্ট

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

const ShopPage = async () => {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Shop All</h1>
      {/* ProductGrid-কে এখন ডেটা পাস করে দেওয়া হচ্ছে */}
      <ProductGrid allProducts={products} allCategories={categories} />
    </div>
  );
};

export default ShopPage;
