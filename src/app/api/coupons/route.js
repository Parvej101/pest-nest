import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Coupon from "../../../../models/Coupon.js";
import { authOptions } from "../../api/auth/[...nextauth]/route.js";

// --- সব কুপন পাওয়ার জন্য GET ফাংশন (শুধুমাত্র অ্যাডমিন) ---
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: "Unauthorized: Access Denied" }, { status: 401 });
  }
  await dbConnect();
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: coupons });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- নতুন কুপন যোগ করার জন্য POST ফাংশন (শুধুমাত্র অ্যাডমিন) ---
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: "Unauthorized: Access Denied" }, { status: 401 });
  }
  await dbConnect();
  try {
    const body = await request.json();
    const coupon = await Coupon.create(body);
    return NextResponse.json({ success: true, data: coupon }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "This coupon code already exists." }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}