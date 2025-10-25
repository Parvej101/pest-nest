import AddProductForm from "../../../components/AddProductForm";

// --- ডেটা আনার জন্য Helper ফাংশন ---
async function getProductById(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Failed to fetch product for editing:", error);
    return null;
  }
}

async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
}

async function getVariations() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/variations`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
}
// ------------------------------------

const EditProductPage = async ({ params }) => {
  const { id } = params;

  // Promise.all দিয়ে একসাথে তিনটি API কল করা হচ্ছে
  const [productToEdit, categories, variations] = await Promise.all([
    getProductById(id),
    getCategories(),
    getVariations(),
  ]);

  if (!productToEdit) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-error">Product Not Found</h1>
        <p>Could not find the product with ID: {id}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      {/* AddProductForm-কে "Edit Mode"-এ রেন্ডার করা হচ্ছে */}
      <AddProductForm
        productToEdit={productToEdit}
        categories={categories}
        variations={variations}
      />
    </div>
  );
};

export default EditProductPage;
