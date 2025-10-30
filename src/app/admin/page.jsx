// src/app/admin/page.js

export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  FiArrowRight,
  FiBox,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

// --- ডাটাবেস এবং মডেল ইম্পোর্ট ---
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import User from "../../../models/User";

const StatCard = ({ title, value, color, icon, link }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${color}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-4xl font-bold">{value}</h3>
          <p className="mt-1">{title}</p>
        </div>
        <div className="text-4xl opacity-50">{icon}</div>
      </div>
      <div className="mt-4 border-t border-white/20 pt-2 text-sm">
        <Link
          href={link || "#"}
          className="flex items-center gap-2 hover:underline"
        >
          More info <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

// --- ডেটা আনার জন্য Helper ফাংশন (অপরিবর্তিত) ---
async function getDashboardStats() {
  try {
    await dbConnect();
    const salesData = Order.aggregate([
      { $match: { status: { $regex: /^Completed$/i } } },
      { $group: { _id: null, totalSales: { $sum: "$grandTotal" } } },
    ]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todaysSalesData = Order.aggregate([
      {
        $match: {
          status: { $regex: /^Completed$/i },
          createdAt: { $gte: today, $lt: tomorrow },
        },
      },
      { $group: { _id: null, todaysSales: { $sum: "$grandTotal" } } },
    ]);
    const pendingOrdersCount = Order.countDocuments({
      status: { $regex: /^Pending$/i },
    });
    const totalProductsCount = Product.countDocuments();
    const totalUsersCount = User.countDocuments();
    const [
      salesResult,
      todaysSalesResult,
      pendingOrders,
      totalProducts,
      totalUsers,
    ] = await Promise.all([
      salesData,
      todaysSalesData,
      pendingOrdersCount,
      totalProductsCount,
      totalUsersCount,
    ]);
    const stats = {
      totalSales: salesResult[0]?.totalSales || 0,
      todaysSales: todaysSalesResult[0]?.todaysSales || 0,
      pendingOrders,
      totalProducts,
      totalUsers,
    };
    return stats;
  } catch (error) {
    console.error("Error fetching dashboard stats from DB:", error);
    return null;
  }
}

const AdminDashboardPage = async () => {
  const stats = await getDashboardStats();

  if (!stats) {
    return (
      <div className="alert alert-error">Could not load dashboard data.</div>
    );
  }

  const statCards = [
    {
      title: "Total Sales",
      value: `৳${stats.totalSales.toFixed(2)}`,
      color: "bg-green-500 text-white",
      icon: <FiDollarSign />,
      link: "/admin/orders?status=Completed",
    },
    {
      title: "Today's Sales",
      value: `৳${stats.todaysSales.toFixed(2)}`,
      color: "bg-cyan-500 text-white",
      icon: <FiDollarSign />,
      link: "/admin/orders?status=Completed",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      color: "bg-red-500 text-white",
      icon: <FiShoppingCart />,
      link: "/admin/orders?status=Pending",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      color: "bg-blue-500 text-white",
      icon: <FiBox />,
      link: "/admin/products",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      color: "bg-purple-500 text-white",
      icon: <FiUsers />,
      link: "/admin/users",
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/admin">Home</Link>
            </li>
            <li>Dashboard</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
