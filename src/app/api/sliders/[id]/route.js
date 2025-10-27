import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect.js";
import Slider from "../../../../../models/Slider.js";

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  await dbConnect();
  try {
    const updatedSlider = await Slider.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedSlider) return NextResponse.json({ success: false, error: "Slide not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updatedSlider });
  } catch (error) { return NextResponse.json({ success: false, error: error.message }, { status: 400 }); }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await dbConnect();
  try {
    const deletedSlider = await Slider.findByIdAndDelete(id);
    if (!deletedSlider) return NextResponse.json({ success: false, error: "Slide not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) { return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 }); }
}