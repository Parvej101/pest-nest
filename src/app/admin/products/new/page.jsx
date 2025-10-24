import AddProductForm from "../../components/AddProductForm";

async function getCategories() {
  /* ... */
}
async function getVariations() {
  /* ... */
}

const NewProductPage = async () => {
  const categories = await getCategories();
  const variations = await getVariations();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create a New Product</h1>
      <AddProductForm categories={categories} variations={variations} />
    </div>
  );
};

export default NewProductPage;
