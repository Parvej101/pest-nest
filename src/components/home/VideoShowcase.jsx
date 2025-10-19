// src/components/home/VideoShowcase.jsx

"use client";

import Link from "next/link";

// --- অ্যাডমিন প্যানেল থেকে ডেটা যেভাবে আসবে ---
const videoData = {
  // আপনার পছন্দের ইউটিউব ভিডিওর ১১-অক্ষরের ID
  youtubeVideoId: "KId3r5dVwGk",

  // বাটনের লিঙ্ক
  buttonHref: "/product/interactive-cat-toy",
};

const VideoShowcase = () => {
  const videoSrc = `https://www.youtube.com/embed/${videoData.youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${videoData.youtubeVideoId}&controls=1&fs=0&showinfo=0&modestbranding=1&rel=0`;

  return (
    <section className="py-12 md:py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            See Our Products in Action
          </h2>
          <p className="text-base-content/70 mt-2">
            Fun, engaging, and loved by pets!
          </p>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video">
          <iframe
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>

          {/* বাটন (এটি iframe-এর উপরে থাকবে) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
            <Link href={videoData.buttonHref}>
              <button className="btn btn-primary btn-wide animate-pulse">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
