"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const ContactFAB = () => {
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
    return null; // ডেটা লোড না হওয়া পর্যন্ত কিছুই দেখানো হবে না
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-3">
      <Link
        href={settings.contactPhone ? `tel:${settings.contactPhone}` : "#"}
        className="btn btn-circle btn-info text-white shadow-lg"
      >
        <IoCall size={24} />
      </Link>
      <Link
        href={getWhatsAppLink(settings.contactWhatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-circle btn-success text-white shadow-lg"
      >
        <FaWhatsapp size={24} />
      </Link>
      <Link
        href={settings.socialFacebook || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-circle bg-blue-600 text-white shadow-lg"
      >
        <FaFacebookF size={24} />
      </Link>
    </div>
  );
};

export default ContactFAB;
