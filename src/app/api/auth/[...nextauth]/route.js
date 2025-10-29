// src/app/api/auth/[...nextauth]/route.js

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../../../lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt", // JWT ব্যবহার করার জন্য নির্দেশ
  },
  
 callbacks: {
    // JWT টোকেন তৈরি বা আপডেট করার সময় এই ফাংশনটি চলে
    async jwt({ token, user }) {
      // যদি এটি প্রাথমিক সাইন-ইন হয়, তাহলে user অবজেক্টটি পাওয়া যাবে
      if (user) {
        const adminEmails = process.env.ADMIN_EMAIL.split(',');
        // ইউজারের role টোকেনের ভেতরে যোগ করা হচ্ছে
        token.role = adminEmails.includes(user.email) ? 'admin' : 'user';
        token.id = user.id; // ইউজারের _id যোগ করা হচ্ছে
      }
      return token;
    },
    // ক্লায়েন্টের কাছে সেশন পাঠানোর সময় এই ফাংশনটি চলে
    async session({ session, token }) {
      // টোকেন থেকে role এবং id নিয়ে সেশনে যোগ করা হচ্ছে
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

