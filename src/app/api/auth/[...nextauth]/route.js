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
  
  // পরিবর্তন: এই callbacks অংশটি নতুন যোগ করা হয়েছে
  callbacks: {
    async session({ session, user }) {
      // সেশন অবজেক্টের ভেতরে ইউজারের role যোগ করা হচ্ছে
      const adminEmails = process.env.ADMIN_EMAIL.split(',');
      if (adminEmails.includes(user.email)) {
        session.user.role = 'admin';
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
