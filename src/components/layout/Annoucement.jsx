"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Announcement = () => {
  const [announcementText, setAnnouncementText] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data.announcementText) {
            setAnnouncementText(data.data.announcementText);
          }
        }
      } catch (error) {
        console.error("Failed to fetch announcement text:", error);
      }
    };

    fetchSettings();
  }, []);

  // যদি অ্যাডমিন প্যানেল থেকে কোনো টেক্সট সেট করা না থাকে, তাহলে কিছুই দেখানো হবে না
  if (!announcementText) {
    return null;
  }

  const texts = [announcementText, announcementText, announcementText];

  return (
    <div className=" text-white text-center text-sm py-2 px-4 overflow-hidden">
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {texts.map((text, index) => (
          <p key={index} className="mx-8">
            {text}
          </p>
        ))}
      </Marquee>
    </div>
  );
};

export default Announcement;
