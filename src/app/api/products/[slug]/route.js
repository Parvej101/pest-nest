import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Product from "../../../../../models/Product";

// --- slug দিয়ে একটি নির্দিষ্ট প্রোডাক্ট খোঁজার জন্য GET ফাংশন ---
export async function GET(request, { params }) {
  const { slug } = params;
  await dbConnect();
  try {
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}