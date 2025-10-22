import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Product from "../../../../../models/Product";

// request object-টি প্রথম প্যারামিটার, এবং { params } দ্বিতীয় প্যারামিটার হিসেবে আসে
export async function GET(request, { params }) {
  // URL থেকে ডাইনামিক slug-টি পাওয়া যাচ্ছে
  const { slug } = params;

  await dbConnect();

  try {
    // Product মডেল ব্যবহার করে ডেটাবেস থেকে slug অনুযায়ী একটি মাত্র প্রোডাক্ট খুঁজে বের করা
    // Mongoose-এর findOne() ফাংশনটি শর্ত অনুযায়ী প্রথম যে ডকুমেন্টটি পায়, সেটি রিটার্ন করে
    const product = await Product.findOne({ slug: slug });

    // যদি কোনো প্রোডাক্ট খুঁজে না পাওয়া যায়
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // যদি প্রোডাক্ট পাওয়া যায়
    return NextResponse.json({ success: true, data: product });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}