import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Product from "../../../../models/Product";

export async function GET(request) {
  await dbConnect();
  try {
    // পরিবর্তন ২: ডেটাবেস থেকেই নতুন থেকে পুরনো অনুযায়ী সাজিয়ে আনা হচ্ছে
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// --- নতুন প্রোডাক্ট যোগ করার জন্য POST ফাংশন ---
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error); // সার্ভার-সাইড লগিং-এর জন্য
    
    // পরিবর্তন ৩: ডুপ্লিকেট slug-এর জন্য একটি সুনির্দিষ্ট error মেসেজ
    if (error.code === 11000 && error.keyPattern?.slug) {
      return NextResponse.json({ success: false, error: "A product with this slug already exists. Please use a unique slug." }, { status: 409 }); // 409 Conflict
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