"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { FiHeart, FiUser } from "react-icons/fi";
import { HiOutlineMenuAlt1, HiOutlineShoppingCart } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";

function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

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
    <>
      <header className="bg-base-200 border-b border-base-300 sticky top-0 z-30 text-base-content">
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
                  className="input input-bordered w-60 h-10 pl-10 bg-base-300"
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
                  {status === "loading" ? (
                    <span className="loading loading-spinner"></span>
                  ) : isLoggedIn ? (
                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <Image
                        alt={session.user.name || "User Avatar"}
                        src={session.user.image || "/images/default-avatar.png"}
                        width={32}
                        height={32}
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
                      <div className="divider my-1"></div>
                      <li>
                        <button onClick={() => signOut()}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <button onClick={() => signIn("google")}>
                          Login with Google
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <dialog ref={modalRef} className="modal modal-top">
        <div className="modal-box rounded-t-none">
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
    </>
  );
}

export default Navbar;
