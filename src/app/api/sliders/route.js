import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Slider from "../../../../models/Slider.js";

export async function GET() {
  await dbConnect();
  try {
    const sliders = await Slider.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: sliders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- নতুন স্লাইড যোগ করার জন্য POST ফাংশন ---
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const slider = await Slider.create(body);
    return NextResponse.json({ success: true, data: slider }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}