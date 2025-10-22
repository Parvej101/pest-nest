import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddProductForm from "./components/AddProductForm"; // ধাপ ২.১: নতুন ফর্ম কম্পোনেন্ট ইম্পোর্ট করুন

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    // পরিবর্তন: padding এবং spacing যোগ করা হয়েছে
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-right">
          <p className="text-lg">
            Welcome,{" "}
            <span className="font-semibold text-primary">
              {session.user.name}
            </span>
          </p>
          <p className="text-sm text-base-content/70">{session.user.email}</p>
        </div>
      </div>

      {/* ধাপ ২.২: নতুন ফর্ম কম্পোনেন্টটি এখানে যোগ করা হয়েছে */}
      <div className="divider"></div>

      <AddProductForm />
    </div>
  );
};

export default AdminDashboard;
