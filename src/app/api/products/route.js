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

export async function POST(request) {
  await dbConnect();

  try {
    // রিকোয়েস্টের বডি থেকে JSON ডেটা গ্রহণ করা
    const body = await request.json();
    
    // Product মডেল ব্যবহার করে ডেটাবেসে নতুন প্রোডাক্ট তৈরি করা
    // Product.create() Mongoose-এর একটি ফাংশন যা স্কিমা অনুযায়ী ডেটা ভ্যালিডেট করে
    const product = await Product.create(body);

    // সফলভাবে তৈরি হওয়ার পর একটি success মেসেজসহ নতুন প্রোডাক্টটি রিটার্ন করা
    return NextResponse.json({ success: true, data: product }, { status: 201 }); // 201 মানে "Created"
  
  } catch (error) {
    // Mongoose-এর ভ্যালিডেশন error হলে সেটি সুন্দরভাবে দেখানো হবে
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}