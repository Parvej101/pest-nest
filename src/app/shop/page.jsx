import ShopClient from "./ShopClient";

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
    console.error("Error fetching products:", error);
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
    console.error("Error fetching categories:", error);
    return [];
  }
}

// মূল পেজ কম্পোনেন্ট (এটি একটি সার্ভার কম্পোনেন্ট)
export default async function ShopPage() {
  // ডাটা ফেচিং এখানে await দিয়ে করা হচ্ছে
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // ক্লায়েন্ট কম্পোনেন্টকে ডাটা পাস করা হচ্ছে
  return (
    <ShopClient initialProducts={products} initialCategories={categories} />
  );
}
