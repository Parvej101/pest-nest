import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from 'mongoose';
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect.js";
import Coupon from "../../../../../models/Coupon.js";

// --- code বা id দিয়ে একটি কুপন খোঁজার জন্য GET ফাংশন ---
export async function GET(request, { params }) {
  const { identifier } = params;
  await dbConnect();
  try {
    let coupon;
    // identifier-টি ভ্যালিড ObjectId কিনা তা চেক করা হচ্ছে
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      coupon = await Coupon.findById(identifier);
    } else {
      // যদি ObjectId না হয়, তাহলে এটিকে code হিসেবে গণ্য করা হবে
      coupon = await Coupon.findOne({ code: identifier.toUpperCase() });
    }

    if (!coupon || !coupon.isActive || new Date(coupon.expiryDate) < new Date()) {
      return NextResponse.json({ success: false, error: "Invalid or expired coupon code" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: coupon });
  } catch (error) { return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 }); }
}

// --- id দিয়ে একটি কুপন আপডেট করার জন্য PUT ফাংশন ---
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  
  const id = params.identifier; // PUT সবসময় id দিয়েই হবে
  const body = await request.json();
  await dbConnect();
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedCoupon) return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updatedCoupon });
  } catch (error) { return NextResponse.json({ success: false, error: error.message }, { status: 400 }); }
}

// --- id দিয়ে একটি কুপন ডিলিট করার জন্য DELETE ফাংশন ---
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const id = params.identifier; // DELETE সবসময় id দিয়েই হবে
  await dbConnect();
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) { return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 }); }
}