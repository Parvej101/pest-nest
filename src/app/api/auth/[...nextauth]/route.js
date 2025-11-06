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
    // --- এই signIn ফাংশনটি লগইনের অনুমতি দেওয়ার জন্য অপরিহার্য ---
    async signIn({ user }) {
      return true; // যেকোনো ভেরিফাইড ইউজারকে লগইন করতে দেবে
    },
    // -----------------------------------------------------------

    async jwt({ token, user }) {
      // প্রাথমিক সাইন-ইন এর সময় role সেট করা
      if (user) {
        const dbUser = await User.findById(user.id);
        const adminEmails = process.env.ADMIN_EMAIL.split(",");
        token.role =
          dbUser?.role || (adminEmails.includes(user.email) ? "admin" : "user");
        token.id = user.id;
      }

      // প্রতিবার সেশন চেক করার সময় role রিফ্রেশ করা
      if (token.id) {
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },

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
