"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

const SubMenuPanel = ({ title, subLinks, onClose }) => {
  const pathname = usePathname();

  const panelVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute top-0 left-0 w-full h-full bg-base-300"
    >
      <div className="flex justify-between items-center p-4 border-b border-base-1000">
        <h3 className="font-bold text-md">{title}</h3>
        <button onClick={onClose} className="btn btn-ghost btn-circle btn-xs">
          <IoClose size={18} />
        </button>
      </div>
      <ul className="menu p-2 text-sm">
        {subLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              onClick={onClose}
              className={`${pathname === link.href ? "active" : ""}`}
            >
              {link.icon && <link.icon size={16} />}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SubMenuPanel;
