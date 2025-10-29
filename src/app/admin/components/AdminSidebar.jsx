"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiBox,
  FiClipboard,
  FiGrid,
  FiPercent,
  FiSettings,
} from "react-icons/fi";

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
];

const AdminSidebar = () => {
  const pathname = usePathname();
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
          <span className="badge badge-primary badge-sm">Admin</span>
        </div>

        <ul className="menu p-4">
          {mainLinks.map((link, index) => (
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
          ))}
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
