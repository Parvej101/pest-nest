import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Setting from "../../../../models/Setting.js";

// --- বর্তমান সেটিংস পাওয়ার জন্য GET ফাংশন ---
export async function GET() {
  await dbConnect();
  try {
    // findOneAndUpdate ব্যবহার করে সেটিংস খুঁজে বের করা বা তৈরি করা
    const settings = await Setting.findOneAndUpdate(
      { key: 'site-settings' },
      { $setOnInsert: { key: 'site-settings' } }, // যদি না থাকে, তাহলে তৈরি করবে
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- সেটিংস আপডেট করার জন্য POST ফাংশন ---
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const updatedSettings = await Setting.findOneAndUpdate(
      { key: 'site-settings' },
      body,
      { new: true, upsert: true, runValidators: true }
    );
    return NextResponse.json({ success: true, data: updatedSettings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}