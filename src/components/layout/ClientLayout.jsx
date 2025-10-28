"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHeart } from "react-icons/fi";
import { IoClose, IoMenu } from "react-icons/io5"; // IoMenu আইকনটি ইম্পোর্ট করা হচ্ছে

// আপনার লেআউটের জন্য প্রয়োজনীয় সব কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import Announcement from "@/components/layout/Annoucement";
import ContactFAB from "@/components/layout/ContactFAB";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SidebarAuth from "@/components/layout/SidebarAuth";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  // --- অ্যাডমিন লেআউট (এখন এটি রেসপন্সিভ) ---
  if (isAdminRoute) {
    return (
      // md:drawer-open ক্লাসটি ডেস্কটপে সাইডবারকে সবসময় খোলা রাখে
      <div className="drawer md:drawer-open">
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

        {/* --- প্রধান কন্টেন্ট এলাকা --- */}
        <main className="drawer-content flex flex-col bg-base-300">
          {/* মোবাইলের জন্য হেডার এবং হামবার্গার মেনু বাটন */}
          <div className="flex items-center p-2 md:hidden sticky top-0 bg-base-300 z-10 shadow-sm">
            <label
              htmlFor="admin-drawer"
              className="btn btn-ghost btn-circle drawer-button"
            >
              <IoMenu size={24} />
            </label>
            <div className="grow text-center">
              <Link href="/admin" className="text-xl font-bold">
                PetNest Admin
              </Link>
            </div>
          </div>

          {/* মূল পেজের কন্টেন্ট */}
          <div className="p-4 sm:p-6 lg:p-8 grow">{children}</div>
        </main>

        {/* --- সাইডবার এলাকা --- */}
        <div className="drawer-side z-50">
          <label
            htmlFor="admin-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* AdminSidebar এখন এখানে থাকবে */}
          <AdminSidebar />
        </div>
      </div>
    );
  }

  // --- সাধারণ সাইটের লেআউট (অপরিবর্তিত) ---
  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        <Announcement />
        <Navbar />
        <main className="grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <ContactFAB />
        <Footer />
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="mobile-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-64 min-h-full bg-base-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">MENU</h2>
            <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
              <IoClose className="h-6 w-6" />
            </label>
          </div>
          <ul className="space-y-1 text-lg">
            <li>
              <Link href="/shop">Shop All</Link>
            </li>
            <li>
              <details>
                <summary>Categories</summary>
                <ul className="p-2 text-base">...</ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Pets</summary>
                <ul className="p-2 text-base">...</ul>
              </details>
            </li>
            <div className="divider my-4"></div>
            <li>
              <Link href="/wishlist" className="flex items-center gap-3">
                <FiHeart /> My Wishlist
              </Link>
            </li>
            <SidebarAuth />
          </ul>
        </div>
      </div>
    </div>
  );
}
