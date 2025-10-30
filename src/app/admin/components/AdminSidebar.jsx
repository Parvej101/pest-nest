"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiBox,
  FiClipboard,
  FiGrid,
  FiHome,
  FiPercent,
  FiSettings,
  FiTag,
  FiUsers,
} from "react-icons/fi";

import { useSession } from "next-auth/react";
import {
  productSubLinks,
  settingsSubLinks,
} from "../../../../config/admin-nav.config";
import SubMenuPanel from "./SubMenuPanel";

const mainLinks = [
  { href: "/admin", label: "Dashboard", icon: FiGrid },
  { label: "Product", icon: FiBox, subLinks: productSubLinks },
  { label: "Settings", icon: FiSettings, subLinks: settingsSubLinks },
  { href: "/admin/orders", label: "Orders", icon: FiClipboard },
  { href: "/admin/deals", label: "Deals", icon: FiPercent },
  { href: "/admin/users", label: "Users", icon: FiUsers, adminOnly: true },
  { href: "/admin/coupons", label: "Coupons", icon: FiTag },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuClick = (label) => {
    setActiveSubMenu((prev) => (prev === label ? null : label));
  };

  const isProductRouteActive = productSubLinks.some((link) =>
    pathname.startsWith(link.href)
  );
  const isSettingsRouteActive = settingsSubLinks.some((link) =>
    pathname.startsWith(link.href)
  );

  return (
    // পরিবর্তন: এটি এখন একটি relative কন্টেইনার এবং overflow-hidden
    <div className="relative w-64 h-full overflow-hidden">
      {/* --- মূল সাইডবার --- */}
      <aside
        className={`w-64 bg-base-200 text-base-content h-full transition-transform duration-300 ease-in-out
          ${activeSubMenu ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="p-4 flex items-center gap-2">
          <Link href="/admin" className="text-2xl font-bold">
            PetNest
          </Link>
          {/* ব্যাজটি এখন ডাইনামিক */}
          <span className="badge badge-primary badge-sm capitalize">
            {userRole}
          </span>
          <Link href="/" className="ml-4">
            <FiHome size={25}></FiHome>
          </Link>
        </div>

        <ul className="menu p-4">
          {mainLinks.map((link, index) => {
            // পরিবর্তন ২: Role-based rendering-এর লজিকটি এখানে যোগ করা হয়েছে
            if (link.adminOnly && userRole !== "admin") {
              return null; // যদি লিঙ্কটি adminOnly হয় এবং ইউজার admin না হয়, তাহলে কিছুই দেখানো হবে না
            }

            return (
              <li key={index}>
                {link.subLinks ? (
                  <button
                    onClick={() => handleMenuClick(link.label)}
                    className={`${
                      (link.label === "Product" && isProductRouteActive) ||
                      (link.label === "Settings" && isSettingsRouteActive)
                        ? "active"
                        : ""
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`${pathname === link.href ? "active" : ""}`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* --- সাব-মেনু প্যানেল (এখন এটি absolute) --- */}
      <AnimatePresence>
        {activeSubMenu && (
          <SubMenuPanel
            title={
              activeSubMenu === "Product" ? "Product Management" : "Settings"
            }
            subLinks={
              activeSubMenu === "Product" ? productSubLinks : settingsSubLinks
            }
            onClose={() => setActiveSubMenu(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSidebar;
