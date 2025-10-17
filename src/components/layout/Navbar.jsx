// src/components/layout/Navbar.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiUser } from "react-icons/fi"; // Wishlist & User Icons
import { HiOutlineMenuAlt1, HiOutlineShoppingCart } from "react-icons/hi";
import { IoClose, IoSearchOutline } from "react-icons/io5";

function Navbar() {
  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <header className="bg-base-100 border-b border-base-200 sticky top-0 z-30">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* START: Hamburger (Mobile) / Logo (Desktop) */}
            <div className="navbar-start">
              <label
                htmlFor="mobile-drawer"
                className="btn btn-ghost btn-circle lg:hidden"
              >
                <HiOutlineMenuAlt1 className="h-6 w-6" />
              </label>
              <Link href="/" className="hidden lg:flex">
                <Image
                  src="/images/logo.png"
                  alt="PetNest Logo"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </div>

            {/* CENTER: Logo (Mobile) / Desktop Menu */}
            <div className="navbar-center">
              <Link href="/" className="lg:hidden">
                <Image
                  src="/images/logo.png"
                  alt="PetNest Logo"
                  width={100}
                  height={35}
                />
              </Link>
              <ul className="menu menu-horizontal px-1 font-semibold hidden lg:flex">
                <li>
                  <Link href="/shop">SHOP</Link>
                </li>
                <li>
                  <Link href="/categories">CATEGORIES</Link>
                </li>
                <li>
                  <Link href="/deals">DEALS</Link>
                </li>
              </ul>
            </div>

            {/* END: Icons */}
            <div className="navbar-end flex items-center gap-1">
              {/* --- Mobile Icons --- */}
              <button className="btn btn-ghost btn-circle lg:hidden">
                <IoSearchOutline className="h-6 w-6" />
              </button>
              <button className="btn btn-ghost btn-circle lg:hidden">
                <div className="indicator">
                  <HiOutlineShoppingCart className="h-6 w-6" />
                  <span className="badge badge-sm badge-primary indicator-item">
                    8
                  </span>
                </div>
              </button>

              {/* --- Desktop Icons & Search Bar --- */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="form-control relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered w-48 h-10 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IoSearchOutline className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <button className="btn btn-ghost btn-circle">
                  <FiHeart className="h-6 w-6" />
                </button>
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <HiOutlineShoppingCart className="h-6 w-6" />
                    <span className="badge badge-sm badge-primary indicator-item">
                      8
                    </span>
                  </div>
                </button>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 rounded-full">
                      <img
                        alt="User Avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link href="/orders">My Orders</Link>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Drawer Side Panel */}
      <div className="drawer-side z-40">
        <label
          htmlFor="mobile-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">MENU</h2>
            <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
              <IoClose className="h-6 w-6" />
            </label>
          </div>

          {/* Menu Items */}
          <ul className="space-y-1 text-lg">
            <li>
              <Link href="/shop">Shop All</Link>
            </li>
            <li>
              <details>
                <summary className="flex justify-between">Categories</summary>
                <ul>
                  <li>
                    <Link href="/collections/pet-toys">PET TOYS</Link>
                  </li>
                  <li>
                    <Link href="/collections/pet-accessories">
                      PET ACCESSORIES
                    </Link>
                  </li>
                </ul>
              </details>
            </li>

            {/* Divider */}
            <div className="divider my-4"></div>

            {/* সরিয়ে নেওয়া আইকনগুলো এখানে যোগ করা হয়েছে */}
            <li>
              <Link href="/wishlist" className="flex items-center gap-3">
                <FiHeart /> My Wishlist
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex items-center gap-3">
                <FiUser /> My Account / Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
