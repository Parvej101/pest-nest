import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Deal from "../../../../models/Deal.js";
import Product from "../../../../models/Product.js";

// --- অ্যাক্টিভ ডিল এবং তার প্রোডাক্টগুলো পাওয়ার জন্য GET ফাংশন ---
export async function GET() {
  await dbConnect();
  try {
    // একটি মাত্র অ্যাক্টিভ ডিল খুঁজে বের করা হচ্ছে
    const deal = await Deal.findOne({ key: 'active-deal' }).populate({
      path: 'productIds',
      model: Product, // 'productIds' ফিল্ডটিকে Product-এর সম্পূর্ণ ডেটা দিয়ে ভর্তি করা হচ্ছে
      match: { status: 'active' } // শুধুমাত্র অ্যাক্টিভ প্রোডাক্টগুলোই দেখানো হবে
    });
    
    if (!deal) {
      return NextResponse.json({ success: false, error: "No active deal found" }, { status: 404 });
    }

    // ডিলটি মেয়াদোত্তীর্ণ কিনা তা চেক করা হচ্ছে
    if (new Date(deal.expiryDate) < new Date()) {
      return NextResponse.json({ success: false, error: "The deal has expired" }, { status: 410 }); // 410 Gone
    }

    return NextResponse.json({ success: true, data: deal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- ডিল তৈরি বা আপডেট করার জন্য POST ফাংশন (অ্যাডমিনদের জন্য) ---
export async function POST(request) {
  // এখানে অ্যাডমিন অথেনটিকেশন চেক যোগ করা উচিত
  await dbConnect();
  try {
    const body = await request.json();
    // findOneAndUpdate এবং upsert: true ব্যবহার করে একটি মাত্র ডিল তৈরি বা আপডেট করা হচ্ছে
    const updatedDeal = await Deal.findOneAndUpdate(
      { key: 'active-deal' },
      body,
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json({ success: true, data: updatedDeal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}