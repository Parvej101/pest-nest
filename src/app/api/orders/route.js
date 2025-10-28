import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Order from "../../../../models/Order.js";

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