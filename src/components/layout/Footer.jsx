"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      {/* পরিবর্তন: মোবাইলের জন্য padding আরও কমানো হয়েছে (py-6) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-base-300 pb-6 mb-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="PetNest Logo"
                width={120}
                height={40}
              />
            </Link>
            <p className="mt-2 text-xs text-base-content/70">
              Your Pet's Happiness Starts Here
            </p>
          </div>
          <div className="w-full text-center">
            <h3 className="font-semibold text-base mb-3">Find Our Store</h3>
            <Link
              href="https://www.google.com/maps/place/Jigatola,+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden h-28 w-full shadow-md">
                <Image
                  src="/images/map.png"
                  alt="Our store location on map"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Link>
            <Link
              href="https://www.google.com/maps/dir//Jigatola,+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary btn-xs mt-3">
                Get Directions
              </button>
            </Link>
          </div>
          <div className="flex justify-center md:justify-end gap-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaYoutube size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaTiktok size={18} />
            </a>
          </div>
        </div>

        {/* --- মাঝের অংশ: লিঙ্কসমূহ --- */}
        {/* পরিবর্তন: মোবাইলে ২ কলাম এবং লেখা বাম-ঘেঁষা (left-aligned) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 text-left">
          <div>
            {/* পরিবর্তন: ফন্ট সাইজ ছোট করা হয়েছে (text-sm) */}
            <h6 className="footer-title text-sm">About Us</h6>
            <div className="flex flex-col gap-2 mt-3 text-sm">
              <Link href="/about" className="link link-hover">
                About PetNest
              </Link>
              <Link href="/blogs" className="link link-hover">
                Our Blog
              </Link>
              <Link href="/careers" className="link link-hover">
                Careers
              </Link>
            </div>
          </div>
          <div>
            <h6 className="footer-title text-sm">Customer Service</h6>
            <div className="flex flex-col gap-2 mt-3 text-sm">
              <Link href="/contact" className="link link-hover">
                Contact Us
              </Link>
              <Link href="/faq" className="link link-hover">
                FAQ
              </Link>
              <Link href="/track-order" className="link link-hover">
                Track Order
              </Link>
            </div>
          </div>
          <div>
            <h6 className="footer-title text-sm">Policies</h6>
            <div className="flex flex-col gap-2 mt-3 text-sm">
              <Link href="/privacy-policy" className="link link-hover">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="link link-hover">
                Return & Refund
              </Link>
              <Link href="/terms" className="link link-hover">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div>
            <h6 className="footer-title text-sm">Contact Info</h6>
            <div className="flex flex-col gap-3 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <IoLocationSharp className="shrink-0" />{" "}
                <p>Jigatola, Dhanmondi</p>
              </div>
              <div className="flex items-center gap-2">
                <IoCall className="shrink-0" /> <p>+8801234567890</p>
              </div>
              <div className="flex items-center gap-2">
                <IoMail className="shrink-0" /> <p>info@petnest.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- নিচের অংশ: কপিরাইট এবং পেমেন্ট আইকন --- */}
        <div className="border-t border-base-300 mt-8 pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          {/* পরিবর্তন: ফন্ট সাইজ আরও ছোট করা হয়েছে (text-xs) */}
          <p className="text-xs text-base-content/70 text-center md:text-left">
            © {new Date().getFullYear()} PetNest. All rights reserved.
          </p>
          <div className="w-full max-w-[250px] md:max-w-[280px]">
            <Image
              src="/images/payment-method.png"
              alt="Payment Methods"
              width={280}
              height={22}
              className="mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
