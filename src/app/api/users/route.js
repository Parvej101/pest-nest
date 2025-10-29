import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import User from "../../../../models/User.js";

// --- সব ইউজার পাওয়ার জন্য GET ফাংশন ---
export async function GET() {
  // নিরাপত্তা চেক: শুধুমাত্র অ্যাডমিনরাই ইউজার লিস্ট দেখতে পারবে
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: "Unauthorized: Access Denied" }, { status: 403 });
  }

  await dbConnect();
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}