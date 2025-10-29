"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiMessageSquare, FiX } from "react-icons/fi"; // পরিবর্তন ১: নতুন আইকন
import { IoCall } from "react-icons/io5";

const ContactFAB = () => {
  const [settings, setSettings] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
        console.error("Failed to fetch FAB settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const getWhatsAppLink = (number) => {
    if (!number) return "#";
    const cleanedNumber = number.replace(/[\s+-]/g, "");
    return `https://wa.me/${cleanedNumber}`;
  };

  if (!settings) {
    return null;
  }

  // --- পরিবর্তন ২: প্রতিটি বাটনের জন্য অ্যানিমেশন স্টাইল ---
  const fabItems = [
    {
      href: settings.contactPhone ? `tel:${settings.contactPhone}` : "#",
      icon: <IoCall size={24} />,
      className: "btn-info",
      // খোলা অবস্থায় এটি উপরে যাবে
      openClass: "-translate-y-[5rem]",
      delay: "delay-100",
    },
    {
      href: getWhatsAppLink(settings.contactWhatsapp),
      icon: <FaWhatsapp size={24} />,
      className: "btn-success",
      // খোলা অবস্থায় এটি উপরে ও বামে যাবে
      openClass: "-translate-y-[3.5rem] -translate-x-[3.5rem]",
      delay: "delay-200",
    },
    {
      href: settings.socialFacebook || "#",
      icon: <FaFacebookF size={24} />,
      className: "bg-blue-600 border-none",
      // খোলা অবস্থায় এটি বামে যাবে
      openClass: "-translate-x-[5rem]",
      delay: "delay-300",
    },
  ];

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <div className="relative">
        {/* --- অন্যান্য কন্টাক্ট বাটনগুলো --- */}
        {fabItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`btn btn-circle text-white shadow-lg absolute bottom-0 right-0 transition-all duration-300 ease-in-out ${
              item.className
            } ${item.delay} ${
              isOpen
                ? `opacity-100 ${item.openClass}`
                : "opacity-0 translate-y-0 translate-x-0 pointer-events-none"
            }`}
          >
            {item.icon}
          </Link>
        ))}

        {/* --- মূল বাটন --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-primary btn-circle btn-lg shadow-lg relative"
        >
          <FiX
            size={24}
            className={`absolute transition-all duration-300 ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
          <FiMessageSquare
            size={24}
            className={`absolute transition-all duration-300 ${
              isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ContactFAB;
