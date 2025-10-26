import Link from "next/link";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

// ডেটা আনার জন্য Helper ফাংশন
async function getContactSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    return null;
  }
}

const ContactFAB = async () => {
  const settings = await getContactSettings();

  // WhatsApp লিঙ্ক তৈরির জন্য একটি Helper ফাংশন
  const getWhatsAppLink = (number) => {
    if (!number) return "#";
    // নম্বর থেকে স্পেস, +, - ইত্যাদি সরিয়ে ফেলা হচ্ছে
    const cleanedNumber = number.replace(/[\s+-]/g, "");
    return `https://wa.me/${cleanedNumber}`;
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-3">
      <Link
        href={settings?.contactPhone ? `tel:${settings.contactPhone}` : "#"}
        className="btn btn-circle btn-info text-white"
      >
        <IoCall size={24} />
      </Link>
      <Link
        href={getWhatsAppLink(settings?.contactWhatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-circle btn-success text-white"
      >
        <FaWhatsapp size={24} />
      </Link>
      <Link
        href={settings?.socialFacebook || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-circle btn-primary text-white"
      >
        <FaFacebookF size={24} />
      </Link>
    </div>
  );
};

export default ContactFAB;
