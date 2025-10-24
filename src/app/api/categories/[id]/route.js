import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  await dbConnect();
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedCategory) return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error) { return NextResponse.json({ success: false, error: error.message }, { status: 400 }); }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await dbConnect();
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) { return NextResponse.json({ success: false, error: error.message }, { status: 400 }); }
}