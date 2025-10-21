import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Product from "../../../../models/Product";
export async function GET(request) {
  // ধাপ ১: ডেটাবেসের সাথে সংযোগ স্থাপন করা
  await dbConnect();

  try {
    // ধাপ ২: Product মডেল ব্যবহার করে ডেটাবেস থেকে সব প্রোডাক্ট খুঁজে বের করা
    // Product.find({}) মানে হলো, "Product কালেকশনের সব ডকুমেন্ট খুঁজে বের করো"
    const products = await Product.find({});

    // ধাপ ৩: সফলভাবে পাওয়া প্রোডাক্টগুলোকে JSON ফরম্যাটে রিটার্ন করা
    // NextResponse.json() Next.js-এর নতুন API response helper
    return NextResponse.json({ success: true, data: products });

  } catch (error) {
    // যদি কোনো error হয়, তাহলে একটি error মেসেজসহ JSON রিটার্ন করা
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// আমরা পরে এখানে POST, PUT, DELETE ফাংশনগুলোও যোগ করতে পারব