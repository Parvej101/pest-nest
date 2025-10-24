import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// ড্যাশবোর্ড কার্ডের জন্য Helper কম্পোনেন্ট
const StatCard = ({ title, value, color, icon }) => {
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
        <Link href="#" className="flex items-center gap-2 hover:underline">
          More info <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  // ভবিষ্যতে এই ডেটাগুলো API থেকে আসবে
  const stats = [
    { title: "Total Sales", value: "15430", color: "bg-green-500 text-white" },
    {
      title: "Current Year Sales",
      value: "15430",
      color: "bg-red-500 text-white",
    },
    {
      title: "Current Month Sales",
      value: "15430",
      color: "bg-gray-600 text-white",
    },
    { title: "Today's Sales", value: "0", color: "bg-cyan-500 text-white" },
    { title: "Completed Orders", value: "0", color: "bg-green-600 text-white" },
    { title: "Accepted Orders", value: "0", color: "bg-gray-700 text-white" },
    {
      title: "In Progress Orders",
      value: "0",
      color: "bg-cyan-600 text-white",
    },
    { title: "Pending Orders", value: "4", color: "bg-red-600 text-white" },
    { title: "Canceled Orders", value: "0", color: "bg-red-700 text-white" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
