"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiGrid, FiTruck, FiUser } from "react-icons/fi";

const SidebarAuth = () => {
  // useSession হুক ব্যবহার করে ইউজারের লগইন অবস্থা জানা হচ্ছে
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  // যদি সেশন লোড হতে থাকে, তাহলে একটি লোডিং স্টেট দেখানো হবে
  if (status === "loading") {
    return (
      <li>
        <span className="loading loading-dots loading-md mx-auto"></span>
      </li>
    );
  }

  // --- যদি ইউজার লগইন করা থাকে ---
  if (isLoggedIn) {
    return (
      <>
        {/* যদি ইউজার অ্যাডমিন হয়, তাহলে এই লিঙ্কটি দেখানো হবে */}
        {isAdmin && (
          <>
            <li>
              <Link href="/admin" className="flex items-center gap-3">
                <FiGrid /> Admin Dashboard
              </Link>
            </li>
            <div className="divider my-1"></div>
          </>
        )}

        {/* নিচের অংশটি অপরিবর্তিত */}
        <li>
          <Link href="/profile" className="flex items-center gap-3">
            <FiUser /> My Account
          </Link>
        </li>
        <li>
          <Link href="/orders" className="flex items-center gap-3">
            My Orders
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
    );
  }

  // --- যদি ইউজার লগইন করা না থাকে ---
  return (
    <>
      <li>
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-3"
        >
          <FiUser /> Login with Google
        </button>
      </li>
      <li>
        <Link href="/orders" className="flex items-center gap-3">
          <FiTruck />
          Track Order
        </Link>
      </li>
    </>
  );
};

export default SidebarAuth;
