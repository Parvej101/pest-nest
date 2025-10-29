// next-auth/middleware থেকে withAuth হেল্পারটি ইম্পোর্ট করা হচ্ছে
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` একটি `req` অবজেক্ট গ্রহণ করে, যার ভেতরে `token` প্রপার্টি থাকে
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // --- স্টাফদের জন্য নিয়ম ---
    // যদি ইউজার 'staff' হয় এবং User Management (/admin/users) পেজে যাওয়ার চেষ্টা করে
    if (pathname.startsWith("/admin/users") && token?.role === "staff") {
      // তাকে অ্যাডমিন ড্যাশবোর্ডে পাঠিয়ে দেওয়া হবে
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // --- অ্যাডমিনদের জন্য নিয়ম (অপরিবর্তিত) ---
    // (এই middleware ফাংশনটি শুধুমাত্র তখনই চলবে যখন ইউজার লগইন করা থাকবে, 
    // তাই এখানে অ্যাডমিন এবং স্টাফদের জন্য আলাদা করে redirect করার দরকার নেই, 
    // কারণ unauthorized কলব্যাকটিই তাদের আটকে দেবে)
  },
  {
    callbacks: {
      // এই authorized কলব্যাকটি Middleware-কে বলে দেয় কখন পেজটি দেখানো যাবে
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // যদি /admin রুটে যাওয়ার চেষ্টা করে
        if (pathname.startsWith("/admin")) {
          // তাহলে অবশ্যই লগইন করা থাকতে হবে এবং role 'admin' বা 'staff' হতে হবে
          return token?.role === "admin" || token?.role === "staff";
        }
        
        // অন্য সব রুটের জন্য (যদি matcher-এ যোগ করা হয়) শুধু লগইন করা থাকলেই চলবে
        return !!token;
      },
    },
  }
);

// এই config অবজেক্টটি Middleware-কে বলে দেয় কোন কোন রুটে সে কাজ করবে
export const config = {
  // :path* মানে হলো, /admin-এর পরে থাকা সবকিছু
  matcher: ["/admin/:path*"],
};