import { Inter } from 'next/font/google';
import './globals.css';

import Announcement from '@/components/layout/Annoucement';
import ContactFAB from '@/components/layout/ContactFAB';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Providers from '@/components/Providers';

// সাইডবারের জন্য প্রয়োজনীয় কম্পোনেন্ট ও আইকন ইম্পোর্ট করা হচ্ছে
import SidebarAuth from '@/components/layout/SidebarAuth';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "PetNest - Your Pet's Happiness Starts Here",
  description: "A one-stop shop for all your pet needs.",
};

export default function RootLayout({ children }) {
  return (
    // পরিবর্তন: আপনার abyss থিমটি এখানে ফিরিয়ে আনা হয়েছে
    <html lang="en" data-theme="abyss">
      <body className={inter.className}>
        <Providers>
          <div className="drawer">
            <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col min-h-screen">
              <Announcement />
              <Navbar />
              <main className=" lg:max-w-7xl lg:mx-auto px-4 md:px-8 lg:px-12">{children}</main>
              <ContactFAB />
              <Footer />
            </div>

            <div className="drawer-side z-50">
              <label htmlFor="mobile-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <div className="menu p-4 w-64 min-h-full bg-base-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">MENU</h2>
                  <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
                    <IoClose className="h-6 w-6" />
                  </label>
                </div>
                <ul className="space-y-1 text-lg">
                  <li><Link href="/shop">Shop All</Link></li>
                  <li><details><summary>Categories</summary><ul className="p-2 text-base"><li><Link href="/collections/pet-toys">Pet Toys</Link></li><li><Link href="/collections/pet-accessories">Pet Accessories</Link></li><li><Link href="/collections/cat-food">Cat Food</Link></li></ul></details></li>
                  <li><details><summary>Pets</summary><ul className="p-2 text-base"><li><Link href="/collections/dogs">Dogs</Link></li><li><Link href="/collections/cats">Cats</Link></li></ul></details></li>
                  <div className="divider my-4"></div>
                  <li><Link href="/wishlist" className="flex items-center gap-3"><FiHeart /> My Wishlist</Link></li>
                  <SidebarAuth />
                </ul>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}