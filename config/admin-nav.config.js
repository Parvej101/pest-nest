import { FiArchive, FiAward, FiFileText, FiImage, FiInfo, FiList, FiPlus, FiShoppingBag } from "react-icons/fi";

// Product সেকশনের সাব-লিঙ্ক
export const productSubLinks = [
  { href: "/admin/products", label: "Products List", icon: FiList },
  { href: "/admin/products/new", label: "Add Product", icon: FiPlus },
  { href: "/admin/products/stock", label: "Product Stock List", icon: FiArchive },
  { href: "/admin/categories", label: "Category", icon: FiList },
  { href: "/admin/variations", label: "Variation", icon: FiList },
];

// Settings সেকশনের সাব-লিঙ্ক
export const settingsSubLinks = [
  { href: "/admin/settings/shop-setup", label: "Shop Setup", icon: FiShoppingBag },
  { href: "/admin/settings/about-us", label: "About Us", icon: FiInfo },
  { href: "/admin/settings/reward-point", label: "Reward Point", icon: FiAward },
  { href: "/admin/settings/slider", label: "Slider", icon: FiImage },
  { href: "/admin/pages", label: "Pages", icon: FiFileText },
];
 