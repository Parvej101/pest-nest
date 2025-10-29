import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Order from "../../../../models/Order.js";

// --- সব অর্ডার পাওয়ার জন্য GET ফাংশন ---
export async function GET() {
  // নিরাপত্তা চেক: শুধুমাত্র অ্যাডমিনরাই সব অর্ডার দেখতে পারবে
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }); // নতুন অর্ডার আগে দেখাবে
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// নতুন অর্ডার তৈরি করার জন্য POST ফাংশন
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const order = await Order.create(body);
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error("API Order Create Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

