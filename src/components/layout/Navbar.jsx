// src/components/layout/Navbar.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { FiHeart, FiUser } from "react-icons/fi";
import { HiOutlineMenuAlt1, HiOutlineShoppingCart } from "react-icons/hi";
import { IoClose, IoSearchOutline } from "react-icons/io5";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const modalRef = useRef(null);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    if (pathname === "/shop") {
      push(`/shop?${params.toString()}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    push(`/shop?${params.toString()}`);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <header className="bg-gray-200 border-b border-gray-200 sticky top-0 z-30 text-gray-700">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  width={80}
                  height={80}
                  priority
                />
              </Link>
            </div>
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
            <div className="navbar-end flex items-center gap-1">
              <button
                onClick={() => modalRef.current.showModal()}
                className="btn btn-ghost btn-circle lg:hidden"
              >
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
              <div className="hidden lg:flex items-center gap-2">
                <form
                  onSubmit={handleSearchSubmit}
                  className="form-control relative"
                >
                  <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="input input-bordered w-60 h-10 pl-10 text-white bg-gray-700"
                    onChange={handleSearchChange}
                    defaultValue={pathname === "/shop" ? currentSearch : ""}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <IoSearchOutline className="w-5 h-5 text-gray-400" />
                  </button>
                </form>
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
                    {isLoggedIn ? (
                      <div className="w-8 rounded-full">
                        <img
                          alt="User Avatar"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <FiUser className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {isLoggedIn ? (
                      <>
                        <li>
                          <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                          <Link href="/orders">My Orders</Link>
                        </li>
                        <li>
                          <a>Logout</a>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link href="/login">Login</Link>
                        </li>
                        <li>
                          <Link href="/register">Register</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="drawer-side z-40">
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
                <summary className="flex justify-between">Categories</summary>
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
                <summary className="flex justify-between">Pets</summary>
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
            {isLoggedIn ? (
              <li>
                <Link href="/profile" className="flex items-center gap-3">
                  <FiUser /> My Account
                </Link>
              </li>
            ) : (
              <li>
                <Link href="/login" className="flex items-center gap-3">
                  <FiUser /> Login / Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* --- মোবাইল সার্চ Modal --- */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Search for Products</h3>
          <form onSubmit={handleSearchSubmit} className="form-control relative">
            <input
              type="text"
              name="search"
              placeholder="Type to search..."
              className="input input-bordered w-full pl-10"
              autoFocus
            />
            <button
              type="submit"
              className="absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <IoSearchOutline className="w-5 h-5" />
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Navbar;
