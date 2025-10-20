// src/components/layout/Footer.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* --- উপরের অংশ: লোগো, ম্যাপ এবং সোশ্যাল আইকন --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-base-300 pb-8 mb-8">
          {/* লোগো এবং ট্যাগলাইন */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="PetNest Logo"
                width={150}
                height={50}
              />
            </Link>
            <p className="mt-2 text-sm text-base-content/70">
              Your Pet's Happiness Starts Here
            </p>
          </div>

          {/* ম্যাপ সেকশন */}
          <div className="w-full text-center">
            <h3 className="font-bold mb-4">Find Our Store</h3>
            <Link
              href="https://www.google.com/maps/place/Jigatola,+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden h-32 w-full shadow-lg">
                <Image
                  src="/images/map.png"
                  alt="Our store location on map"
                  fill
                  sizes="33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <Link
              href="https://www.google.com/maps/dir//Jigatola,+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary btn-sm mt-4">
                Get Directions
              </button>
            </Link>
          </div>

          {/* সোশ্যাল মিডিয়া আইকন */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </div>

        {/* --- মাঝের অংশ: লিঙ্কসমূহ --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h6 className="footer-title">About Us</h6>
            <div className="flex flex-col gap-2 mt-4">
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
            <h6 className="footer-title">Customer Service</h6>
            <div className="flex flex-col gap-2 mt-4">
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
            <h6 className="footer-title">Policies</h6>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/privacy-policy" className="link link-hover">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="link link-hover">
                Return Refund Policy
              </Link>
              <Link href="/terms" className="link link-hover">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div>
            <h6 className="footer-title">Contact Info</h6>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <IoLocationSharp />
                <p>Jigatola, Dhanmondi, Dhaka</p>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <IoCall />
                <p>+880 123 456 7890</p>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <IoMail />
                <p>info@petnest.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- নিচের অংশ: কপিরাইট এবং পেমেন্ট আইকন --- */}
        <div className="border-t border-base-300 mt-8 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} PetNest. All rights reserved.
          </p>
          <div className="h-full ">
            <Image
              src="/images/payment-method.png"
              alt="Payment Methods"
              width={400}
              height={32}
              className="h-full w-auto object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
