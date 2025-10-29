import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Order from "../../../../models/Order.js";

export async function POST(request) {
  await dbConnect();
  try {
    const { orderIds } = await request.json();
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }
    const validOrderIds = orderIds.filter(id => mongoose.Types.ObjectId.isValid(id));
    const orders = await Order.find({ '_id': { $in: validOrderIds } }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}