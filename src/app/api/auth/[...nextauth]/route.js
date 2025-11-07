// src/app/api/auth/[...nextauth]/route.js

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../../../lib/mongodb";
import User from "../../../../../models/User";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    /**
     * এই signIn ফাংশনটি লগইনের "গেটকিপার" হিসেবে কাজ করে।
     * return true মানে হলো, Google থেকে সফলভাবে ভেরিফাই হওয়া যেকোনো ইউজারকে
     * লগইন প্রক্রিয়ার পরবর্তী ধাপে (jwt callback) যাওয়ার অনুমতি দেওয়া হচ্ছে।
     * এটি ছাড়া next-auth ডিফল্টভাবে লগইন ব্লক করে দিতে পারে।
     */
    async signIn({ user }) {
      return true;
    },

    /**
     * এই jwt ফাংশনটি সেশন টোকেন তৈরি এবং আপডেট করার জন্য কাজ করে।
     */
    async jwt({ token, user }) {
      // 1. প্রাথমিক সাইন-ইন এর সময় (যখন 'user' অবজেক্টটি পাওয়া যায়):
      if (user) {
        // ডাটাবেস থেকে ইউজারের আসল ডকুমেন্টটি খোঁজা হচ্ছে, কারণ এটিই 'source of truth'।
        const dbUser = await User.findById(user.id);

        // যদি ডাটাবেসে ইউজার এবং তার role থাকে, তাহলে সেটিই ব্যবহার করা হবে।
        if (dbUser?.role) {
          token.role = dbUser.role;
        } else {
          // যদি কোনো কারণে ডাটাবেসে role না থাকে (যেমন: একদম নতুন ইউজার),
          // শুধুমাত্র তখনই আমরা .env ফাইলের ADMIN_EMAIL চেক করব।
          const adminEmails = process.env.ADMIN_EMAIL.split(",");
          token.role = adminEmails.includes(user.email) ? "admin" : "user";
        }
        token.id = user.id; // টোকেনে ইউজারের ID যোগ করা হচ্ছে
      }

      // 2. টোকেন রিফ্রেশ করার জন্য (প্রতিবার সেশন চেক করার সময়):
      // এটি নিশ্চিত করে যে, অ্যাডমিন প্যানেল থেকে role পরিবর্তন করার পর
      // ইউজারের সেশনটি সাথে সাথেই আপডেট হয়ে যায়।
      if (token.id) {
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },

    /**
     * এই session ফাংশনটি ক্লায়েন্টের কাছে পাঠানো সেশন অবজেক্টটি তৈরি করে।
     */
    async session({ session, token }) {
      // JWT টোকেন থেকে পাওয়া role এবং id ক্লায়েন্ট-সাইড সেশনে যোগ করা হচ্ছে,
      // যাতে ফ্রন্ট-এন্ড কোড (যেমন: Navbar, Middleware) এগুলো ব্যবহার করতে পারে।
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
