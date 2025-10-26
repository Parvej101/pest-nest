import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect.js";
import Page from "../../../../../models/Page.js";

// slug দিয়ে একটি পেজের কন্টেন্ট পাওয়ার জন্য GET ফাংশন
export async function GET(request, { params }) {
  const { slug } = params;
  await dbConnect();
  try {
    const page = await Page.findOne({ slug });
    // যদি পেজটি ডেটাবেসে না থাকে, তাহলে একটি খালি কন্টেন্টসহ নতুন অবজেক্ট পাঠানো হবে
    if (!page) {
      return NextResponse.json({ success: true, data: { slug, content: '' } });
    }
    return NextResponse.json({ success: true, data: page });
  } catch (error) { 
    return NextResponse.json({ success: false, error: error.message }, { status: 500 }); 
  }
}

// একটি পেজের কন্টেন্ট তৈরি বা আপডেট করার জন্য POST ফাংশন
export async function POST(request, { params }) {
  const { slug } = params;
  await dbConnect();
  try {
    const { title, content } = await request.json();
    // findOneAndUpdate এবং upsert: true ব্যবহার করে আপডেট বা ক্রিয়েট করা হচ্ছে
    const updatedPage = await Page.findOneAndUpdate(
      { slug },
      { title, content, slug },
      { upsert: true, new: true, runValidators: true }
    );
    return NextResponse.json({ success: true, data: updatedPage });
  } catch (error) { 
    return NextResponse.json({ success: false, error: error.message }, { status: 400 }); 
  }
}