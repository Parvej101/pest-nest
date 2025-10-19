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
    <section className="lg:py-12 py-5 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 lg:mb-12">
          <h2 className="lg:text-3xl text-xl font-bold tracking-tight">
            See Our Products in Action
          </h2>
          <p className="lg:text-base-content/70 text-base-content/40 mt-2">
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
        </div>
        <div className=" z-10 m-auto text-center py-8  ">
          <Link href={videoData.buttonHref}>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl  btn-outline btn-warning animate-pulse ">
              Click Here Buy This Product
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
