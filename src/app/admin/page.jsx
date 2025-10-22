import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminDashboard = async () => {
  // সার্ভার সাইডে ইউজারের সেশন ডেটা পাওয়া হচ্ছে
  const session = await getServerSession(authOptions);

  // যদি কোনো ইউজার লগইন করা না থাকে, অথবা তার role 'admin' না হয়,
  // তাহলে তাকে হোমপেজে পাঠিয়ে দেওয়া হবে।
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg">
        Welcome,{" "}
        <span className="font-semibold text-primary">{session.user.name}</span>!
      </p>
      <p className="mt-2 text-base-content/70">
        You have successfully accessed the protected admin area.
      </p>

      {/* এখানে আমরা পরে প্রোডাক্ট যোগ করার ফর্ম এবং অন্যান্য অ্যাডমিন টুল যোগ করব */}
    </div>
  );
};

export default AdminDashboard;
