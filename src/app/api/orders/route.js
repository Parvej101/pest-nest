import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Order from "../../../../models/Order.js";

// --- সব অর্ডার পাওয়ার জন্য GET ফাংশন ---
export async function GET() {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    // পরিবর্তন: এখন 'user.email'-এর বদলে 'userId' দিয়ে খোঁজা হচ্ছে
    const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });
    
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

