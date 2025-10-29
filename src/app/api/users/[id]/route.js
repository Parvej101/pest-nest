import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect.js";
import User from "../../../../../models/User.js";

// --- ইউজারের Role আপডেট করার জন্য PUT ফাংশন ---
export async function PUT(request, { params }) {
  // নিরাপত্তা চেক: শুধুমাত্র অ্যাডমিনরাই role পরিবর্তন করতে পারবে
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: "Unauthorized: Access Denied" }, { status: 403 });
  }
  
  const { id } = params;
  const { role } = await request.json();

  // নিজের Role পরিবর্তন করা থেকে বিরত রাখা
  if (session.user.id === id) {
    return NextResponse.json({ success: false, error: "You cannot change your own role." }, { status: 400 });
  }

  await dbConnect();
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!updatedUser) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}