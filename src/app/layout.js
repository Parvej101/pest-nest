import Providers from '@/components/Providers';
import ClientLayout from '@/components/layout/ClientLayout';
import { CartProvider } from '@/context/CartContext';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "PetNest - Your Pet's Happiness Starts Here",
  description: "A one-stop shop for all your pet needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="abyss">
      <body className={inter.className}>
        <Providers>
         <CartProvider>
           <ClientLayout>
            {children}
          </ClientLayout>
         </CartProvider>
        </Providers>
      </body>
    </html>
  );
}