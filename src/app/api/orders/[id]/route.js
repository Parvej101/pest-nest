import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from 'mongoose';
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect.js";
import Order from "../../../../../models/Order.js";

// --- একটি নির্দিষ্ট অর্ডার তার ID দিয়ে খুঁজে বের করার জন্য GET ফাংশন ---
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  
  const { id } = params;
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid Order ID format" }, { status: 400 });
  }

  try {
    // পরিবর্তন: ইউজার এবং অ্যাডমিন উভয়ের জন্যই এই API কাজ করবে
    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    
    // নিরাপত্তা চেক: যদি ইউজার অ্যাডমিন না হয়, তাহলে সে শুধু নিজের অর্ডারই দেখতে পারবে
    if (session.user.role !== 'admin' && order.userId.toString() !== session.user.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    
    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// --- অর্ডারের স্ট্যাটাস আপডেট করার জন্য PUT ফাংশন ---
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = params;
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid Order ID format" }, { status: 400 });
  }
  try {
    const { status } = await request.json();
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!updatedOrder) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// --- একটি নির্দিষ্ট অর্ডার ডিলিট করার জন্য DELETE ফাংশন ---
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = params;
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid Order ID format" }, { status: 400 });
  }
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}