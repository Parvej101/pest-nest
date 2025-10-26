"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setSettings(data.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch footer settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // যদি সেটিংস লোড না হয়, তাহলে একটি লোডিং বা ফলব্যাক ফুটার দেখানো যেতে পারে
  if (!settings) {
    return (
      <footer className="bg-base-200 text-base-content text-center p-4">
        <p>© {new Date().getFullYear()} PetNest. Loading...</p>
      </footer>
    );
  }

  return (
    <footer className="bg-base-200 text-base-content">
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
            {/* ডাইনামিক ট্যাগলাইন */}
            <p className="mt-2 text-xs text-base-content/70">
              {settings.footerTagline || "Your Pet's Happiness Starts Here"}
            </p>
          </div>
          <div className="w-full text-center">
            <h3 className="font-semibold text-base mb-3">Find Our Store</h3>
            {/* ডাইনামিক ম্যাপ লিঙ্ক */}
            <Link
              href={settings.mapLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden h-28 w-full shadow-md">
                {/* ডাইনামিক ম্যাপ ছবি */}
                <Image
                  src={settings.mapImageSrc || "/images/map.png"}
                  alt="Our store location on map"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Link>
            <Link
              href={settings.mapLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary btn-xs mt-3">
                Get Directions
              </button>
            </Link>
          </div>
          <div className="flex justify-center md:justify-end gap-2">
            {/* ডাইনামিক সোশ্যাল লিঙ্ক */}
            <a
              href={settings.socialFacebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href={settings.socialInstagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href={settings.socialYoutube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaYoutube size={18} />
            </a>
            <a
              href={settings.socialTiktok || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaTiktok size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 text-left">
          <div>
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
              <Link
                href={settings.policyPrivacyLink || "#"}
                className="link link-hover"
              >
                Privacy Policy
              </Link>
              <Link
                href={settings.policyRefundLink || "#"}
                className="link link-hover"
              >
                Return & Refund
              </Link>
              <Link
                href={settings.policyTermsLink || "#"}
                className="link link-hover"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div>
            <h6 className="footer-title text-sm">Contact Info</h6>
            <div className="flex flex-col gap-3 mt-3 text-sm">
              {/* ডাইনামিক কন্টাক্ট ইনফো */}
              <div className="flex items-center gap-2">
                <IoLocationSharp className="shrink-0" />{" "}
                <p>{settings.contactAddress || "Jigatola, Dhanmondi"}</p>
              </div>
              <div className="flex items-center gap-2">
                <IoCall className="shrink-0" />{" "}
                <p>{settings.contactPhone || "+8801234567890"}</p>
              </div>
              <div className="flex items-center gap-2">
                <IoMail className="shrink-0" />{" "}
                <p>{settings.contactEmail || "info@petnest.com"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-8 pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-base-content/70 text-center md:text-left">
            © {new Date().getFullYear()} PetNest. All rights reserved.
          </p>
          <div className="w-full max-w-[250px] md:max-w-[280px]">
            {/* ডাইনামিক পেমেন্ট মেথড ছবি */}
            {settings.paymentMethodsImageSrc && (
              <Image
                src={settings.paymentMethodsImageSrc}
                alt="Payment Methods"
                width={280}
                height={22}
                className="mx-auto md:mx-0"
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
