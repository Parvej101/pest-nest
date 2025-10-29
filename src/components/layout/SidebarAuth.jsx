"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const SidebarAuth = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  if (status === "loading") {
    return (
      <li>
        <span className="loading loading-dots loading-md"></span>
      </li>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <li>
            <Link href="/profile" className="flex items-center gap-3">
              <FiUser /> My Account
            </Link>
          </li>
          <li>
            <Link href="/orders" className="gap-3">
              <FiShoppingCart />
              My Order
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-3 text-error"
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-3"
          >
            <FiUser /> Login with Google
          </button>
        </li>
      )}
    </>
  );
};

export default SidebarAuth;
