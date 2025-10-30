export const dynamic = "force-dynamic";
import { headers } from "next/headers";
import Link from "next/link";
import {
  FiArrowRight,
  FiBox,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

// ড্যাশবোর্ড কার্ডের জন্য Helper কম্পונেন্ট (অপরিবর্তিত)
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

// --- ডেটা আনার জন্য Helper ফাংশন ---
async function getDashboardStats() {
  try {
    // Server Component থেকে API কল করার সময় session cookie ফরোয়ার্ড করা
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard-stats`,
      {
        headers: new Headers(headers()),
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.error("Failed to fetch dashboard stats. Status:", res.status);
      return null;
    }
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return null;
  }
}

// পেজটি এখন একটি async Server Component
const AdminDashboardPage = async () => {
  const stats = await getDashboardStats();

  if (!stats) {
    return (
      <div className="alert alert-error">Could not load dashboard data.</div>
    );
  }

  // ডেটাগুলোকে কার্ডে দেখানোর জন্য একটি অ্যারে তৈরি করা হচ্ছে
  const statCards = [
    {
      title: "Total Sales",
      value: `৳${stats.totalSales.toFixed(2)}`,
      color: "bg-green-500 text-white",
      icon: <FiDollarSign />,
      link: "/admin/orders?status=completed",
    },
    {
      title: "Today's Sales",
      value: `৳${stats.todaysSales.toFixed(2)}`,
      color: "bg-cyan-500 text-white",
      icon: <FiDollarSign />,
      link: "/admin/orders?status=completed",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      color: "bg-red-500 text-white",
      icon: <FiShoppingCart />,
      link: "/admin/orders?status=pending",
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
