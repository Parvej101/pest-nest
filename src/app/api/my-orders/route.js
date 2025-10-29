import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Order from "../../../../models/Order.js";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}