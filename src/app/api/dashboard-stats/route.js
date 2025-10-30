import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import Order from "../../../../models/Order.js";
import Product from "../../../../models/Product";
import User from "../../../../models/User";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalSales = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$grandTotal' } } }
    ]);

    const todaysSales = await Order.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: '$grandTotal' } } }
    ]);
    
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({});

    const stats = {
      totalSales: totalSales[0]?.total || 0,
      todaysSales: todaysSales[0]?.total || 0,
      pendingOrders,
      totalProducts,
      totalUsers,
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}