export const dynamic = "force-dynamic";

import AddProductForm from "../../../../admin/components/AddProductForm";

import dbConnect from "../../../../../../lib/dbConnect";
import Category from "../../../../../../models/Category";
import Product from "../../../../../../models/Product";
import Variation from "../../../../../../models/Variation";

async function getProductById(id) {
  try {
    await dbConnect();
    const product = await Product.findById(id);
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch (error) {
    console.error("Failed to fetch product for editing:", error);
    return null;
  }
}

// সব ক্যাটাগরি আনার ফাংশন
async function getCategories() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories for edit page:", error);
    return [];
  }
}

// সব ভ্যারিয়েশন আনার ফাংশন
async function getVariations() {
  try {
    await dbConnect();
    const variations = await Variation.find({}).sort({ name: 1 });
    return JSON.parse(JSON.stringify(variations));
  } catch (error) {
    console.error("Error fetching variations for edit page:", error);
    return [];
  }
}

const EditProductPage = async ({ params }) => {
  const { id } = params;

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

      <AddProductForm
        productToEdit={productToEdit}
        categories={categories}
        variations={variations}
      />
    </div>
  );
};

export default EditProductPage;
