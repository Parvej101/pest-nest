// src/app/api/profile/route.js

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import User from "../../../../models/User.js";

// --- লগইন করা ইউজারের প্রোফাইল ডাটা পাওয়ার জন্য GET ফাংশন ---
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbConnect();
  try {
    const user = await User.findById(session.user.id).select("-password"); // পাসওয়ার্ড ছাড়া বাকি সব তথ্য
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// --- ইউজারের প্রোফাইল (নাম, ঠিকানা) আপডেট করার জন্য PUT ফাংশন ---
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { name, addresses } = await request.json();

  await dbConnect();
  try {
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { name, addresses },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
