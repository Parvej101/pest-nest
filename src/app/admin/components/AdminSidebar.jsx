"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiBox, FiClipboard, FiGrid, FiSettings } from "react-icons/fi";

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
    <div className="flex shrink-0">
      <aside className="w-64 bg-base-200 text-base-content h-screen sticky top-0">
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
                    activeSubMenu === link.label ||
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

      <AnimatePresence>
        {activeSubMenu === "Product" && (
          <SubMenuPanel
            title="Product Management"
            subLinks={productSubLinks}
            onClose={() => setActiveSubMenu(null)}
          />
        )}
        {activeSubMenu === "Settings" && (
          <SubMenuPanel
            title="Settings"
            subLinks={settingsSubLinks}
            onClose={() => setActiveSubMenu(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSidebar;
