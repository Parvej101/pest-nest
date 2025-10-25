import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect.js";
import Product from "../../../../../models/Product.js";



export async function GET(request, { params }) {
  // identifier এখন একটি অ্যারে, যার প্রথম আইটেমটি হলো id বা slug
  const identifier = params.identifier[0];
  await dbConnect();

  try {
    let product;
    // identifier-টি ভ্যালিড ObjectId কিনা তা চেক করা হচ্ছে
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier);
    } else {
      // যদি ObjectId না হয়, তাহলে এটিকে slug হিসেবে গণ্য করা হবে
      product = await Product.findOne({ slug: identifier });
    }

    if (!product) {
      return NextResponse.json({ success: false, error: `Product not found with identifier: ${identifier}` }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const id = params.identifier[0]; // PUT সবসময় id দিয়েই হবে
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid product ID for update" }, { status: 400 });
  }
  try {
    const body = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedProduct) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) { return NextResponse.json({ success: false, error: error.message }, { status: 400 }); }
}

export async function DELETE(request, { params }) {
  const id = params.identifier[0]; // DELETE সবসময় id দিয়েই হবে
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid product ID for delete" }, { status: 400 });
  }
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) { return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 }); }
}