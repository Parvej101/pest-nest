"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHeart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

// পরিবর্তন: সব import এখন `@/` ব্যবহার করে src ফোল্ডার থেকে আসছে

import AdminSidebar from "@/app/admin/components/AdminSidebar";
import Announcement from "@/components/layout/Annoucement";
import ContactFAB from "@/components/layout/ContactFAB";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SidebarAuth from "@/components/layout/SidebarAuth";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  // --- অ্যাডমিন লেআউট ---
  if (isAdminRoute) {
    return (
      <div className="flex min-h-screen bg-base-300">
        <AdminSidebar></AdminSidebar>
        <main className="grow p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    );
  }

  // --- সাধারণ সাইটের লেআউট ---
  // এই অংশটি আপনার পুরনো RootLayout থেকে আনা হয়েছে
  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen">
        <Announcement />
        <Navbar />
        <main className="grow">
          {/* Main content-এর ভেতরের কন্টেইনার ক্লাসগুলো এখানে রাখা হয়েছে */}
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
                <ul className="p-2 text-base">
                  <li>
                    <Link href="/collections/pet-toys">Pet Toys</Link>
                  </li>
                  <li>
                    <Link href="/collections/pet-accessories">
                      Pet Accessories
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections/cat-food">Cat Food</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Pets</summary>
                <ul className="p-2 text-base">
                  <li>
                    <Link href="/collections/dogs">Dogs</Link>
                  </li>
                  <li>
                    <Link href="/collections/cats">Cats</Link>
                  </li>
                </ul>
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
