
import Announcement from '@/components/layout/Annoucement';
import ContactFAB from '@/components/layout/ContactFAB';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="abyss">
      <body className={inter.className}>
    
          <Announcement/>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
          <ContactFAB></ContactFAB>
          <Footer></Footer>
      
      </body>
    </html>
  );
}