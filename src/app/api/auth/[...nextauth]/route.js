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
    // --- পরিবর্তন এখানে: signIn ফাংশনটি যোগ করা হয়েছে ---
    async signIn({ user, account }) {
      // এই লাইনটি যেকোনো ইউজারকে লগইন করার অনুমতি দেবে।
      // এটি ডেভেলপমেন্টের জন্য অপরিহার্য।
      return true;
    },

    // JWT টোকেন তৈরি বা আপডেট করার সময় এই ফাংশনটি চলে
    async jwt({ token, user, trigger, session }) {
      // 1. প্রাথমিক সাইন-ইন এর সময়:
      if (user) {
        // ডাটাবেস থেকে ইউজারের আসল role খোঁজা হচ্ছে
        const dbUser = await User.findById(user.id);
        const adminEmails = process.env.ADMIN_EMAIL.split(",");

        // যদি ডাটাবেসে role থাকে, সেটি ব্যবহার করা হবে, না হলে ডিফল্ট লজিক
        token.role =
          dbUser?.role || (adminEmails.includes(user.email) ? "admin" : "user");
        token.id = user.id;
      }

      // 2. টোকেন রিফ্রেশ করার জন্য:
      if (token.id) {
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.role = dbUser.role; // ডাটাবেস থেকে পাওয়া সর্বশেষ role দিয়ে টোকেন আপডেট করা হচ্ছে
        }
      }

      return token;
    },

    // ক্লায়েন্টের কাছে সেশন পাঠানোর সময় এই ফাংশনটি চলে
    async session({ session, token }) {
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
