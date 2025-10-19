"use client";

import Link from "next/link";
import { useState } from "react";

// প্রয়োজনীয় আইকনগুলো import করুন
import { BsChatDotsFill } from "react-icons/bs";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

// --- আপনার কন্টাক্ট ইনফরমেশন এখানে আপডেট করুন ---
const contactInfo = {
  phone: "+8801863945101",
  whatsapp: "8801863945101", // wa.me লিঙ্কের জন্য '+' ছাড়া নম্বর দিন
  facebook: "MH Parvej", //
};

const ContactFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      label: "Call Us",
      icon: <FiPhoneCall size={24} />,
      href: `tel:${contactInfo.phone}`,
      bg: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "WhatsApp",
      icon: <FaWhatsapp size={24} />,
      href: `https://wa.me/${contactInfo.whatsapp}`,
      bg: "bg-green-500 hover:bg-green-600",
    },
    {
      label: "Facebook",
      icon: <FaFacebookF size={24} />,
      href: `https://web.facebook.com/mhparvej.khan.5/`,
      bg: "bg-sky-600 hover:bg-sky-700",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative">
        {/* যখন বাটনগুলো বেরিয়ে আসবে */}
        <div className="flex flex-col items-center gap-4 mb-4">
          {actions.map((action, index) => (
            <Link
              href={action.href}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className={`btn btn-circle text-white shadow-lg transition-all duration-300 ease-in-out ${
                  action.bg
                }
                            ${
                              isOpen
                                ? `opacity-100 scale-100 -translate-y-[${
                                    (index + 1) * 70
                                  }px]`
                                : "opacity-0 scale-0 -translate-y-0"
                            }`}
                aria-label={action.label}
              >
                {action.icon}
              </button>
            </Link>
          ))}
        </div>

        {/* প্রধান টগল বাটন */}
        <button
          className={`btn btn-circle btn-lg shadow-lg transition-transform duration-300 ${
            isOpen ? "btn-primary rotate-45" : "btn-secondary"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close contact options" : "Open contact options"}
        >
          {isOpen ? <IoClose size={32} /> : <BsChatDotsFill size={28} />}
        </button>
      </div>
    </div>
  );
};

export default ContactFAB;
