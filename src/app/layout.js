import Providers from '@/components/Providers';
import ClientLayout from '@/components/layout/ClientLayout';
import { CartProvider } from '@/context/CartContext';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

// --- সার্ভার-সাইড ডাটা লোডিং এর জন্য ইম্পোর্ট ---
import dbConnect from '../../lib/dbConnect';
import Category from '../../models/Category';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: "PetNest - Your Pet's Happiness",
    template: '%s | PetNest',
  },
  description: "A one-stop shop for all your pet needs.",
};

// --- সার্ভারে ক্যাটাগরি fetch করার ফাংশন ---
async function getAllCategories() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Failed to fetch categories for layout:", error);
    return [];
  } 
}

// --- RootLayout এখন একটি async ফাংশন ---
export default async function RootLayout({ children }) {
  // সার্ভারেই ক্যাটাগরিগুলো লোড করা হচ্ছে
  const categories = await getAllCategories();
  

  return (
    <html lang="en" data-theme="abyss">
      <body className={inter.className}>
        <Providers>
          <CartProvider>
            {/* Suspense বাউন্ডারি এখানে যোগ করা হয়েছে */}
            <Suspense fallback={<LayoutSkeleton />}>
              {/* ClientLayout এখন props হিসেবে categories গ্রহণ করছে */}
              <ClientLayout categories={categories}>
                {children}
              </ClientLayout>
            </Suspense>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}

// --- একটি বেসিক লেআউট স্কেলেটন ---
const LayoutSkeleton = () => (
  <div>
    <header className="bg-base-200 border-b border-base-300 sticky top-0 z-30">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="navbar-start h-10 w-20 bg-base-300 rounded"></div>
        <div className="navbar-center hidden lg:flex h-8 w-32 bg-base-300 rounded"></div>
        <div className="navbar-end h-10 w-40 bg-base-300 rounded"></div>
      </div>
    </header>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* আপনি এখানে আরও বিস্তারিত লোডার যোগ করতে পারেন */}
      <div className="h-64 bg-base-200 rounded-lg animate-pulse"></div>
    </main>
  </div>
);