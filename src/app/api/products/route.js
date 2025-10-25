import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Product from "../../../../models/Product";

// --- সব প্রোডাক্ট পাওয়ার জন্য GET ফাংশন ---
export async function GET(request) {
  await dbConnect();
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// --- নতুন প্রোডাক্ট যোগ করার জন্য POST ফাংশন (আপডেট করা) ---
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    
    // পরিবর্তন: productCode খালি থাকলে স্বয়ংক্রিয়ভাবে একটি তৈরি করা হচ্ছে
    if (!body.productCode) {
      // প্রোডাক্টের নামের প্রথম ৩ অক্ষর + একটি র‍্যান্ডম ৪-সংখ্যার নম্বর
      const namePart = body.name.substring(0, 3).toUpperCase();
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      body.productCode = `${namePart}-${randomPart}`;
    }

    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  
  } catch (error) {
    console.error("API POST Error:", error);
    
    // ডুপ্লিকেট কী (key) এর জন্য আরও উন্নত error handling
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]; // কোন ফিল্ডটি ডুপ্লিকেট হয়েছে তা বের করা
      return NextResponse.json({ success: false, error: `A product with this ${field} already exists. Please use a unique ${field}.` }, { status: 409 });
    }
    
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// --- সব প্রোডাক্ট ডিলিট করার জন্য DELETE ফাংশন (seed.js-এর জন্য) ---
export async function DELETE() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ success: false, error: "This operation is not allowed in production." }, { status: 403 });
  }
  await dbConnect();
  try {
    await Product.deleteMany({});
    return NextResponse.json({ success: true, message: "All products deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}