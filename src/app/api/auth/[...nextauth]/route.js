import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../../../lib/mongodb"; // পাথটি ঠিক আছে কিনা নিশ্চিত করুন

export const authOptions = {
  // MongoDB Adapter কনফিগার করা হচ্ছে
  // এটি ইউজার এবং সেশনের ডেটা আপনার MongoDB-তে সেভ করবে
  adapter: MongoDBAdapter(clientPromise),
  
  // লগইন প্রোভাইডার কনফিগার করা হচ্ছে
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // আপনি এখানে আরও প্রোভাইডার (যেমন GitHub, Facebook) যোগ করতে পারেন
  ],
  
  // এখানে আপনি সেশন স্ট্র্যাটেজি, কলব্যাক ইত্যাদি কাস্টমাইজ করতে পারেন
  // আপাতত ডিফল্টই যথেষ্ট
};

// NextAuth হ্যান্ডলার তৈরি করা হচ্ছে
const handler = NextAuth(authOptions);

// GET এবং POST রিকোয়েস্টের জন্য হ্যান্ডলারটি এক্সপোর্ট করা হচ্ছে
export { handler as GET, handler as POST };
