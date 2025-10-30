import { Suspense } from "react";
import dbConnect from "../../../lib/dbConnect.js";
import Category from "../../../models/Category.js";
import Product from "../../../models/Product.js";
import ShopClient from "./ShopClient";

async function getAllProducts() {
  try {
    await dbConnect();
    const products = await Product.find({}, null, { sort: { _id: -1 } });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products directly from DB:", error);
    return [];
  }
}

async function getAllCategories() {
  try {
    await dbConnect();
    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories directly from DB:", error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading Page...
        </div>
      }
    >
      <ShopClient initialProducts={products} initialCategories={categories} />
    </Suspense>
  );
}
