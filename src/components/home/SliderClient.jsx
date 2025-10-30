"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HeroSlider.module.css";

const AUTOPLAY_DELAY = 4000;

// 'slides' prop-টি Server Component থেকে আসছে
const SliderClient = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  // --- আপনার বিদ্যমান এবং সঠিক ফাংশনগুলো ---
  const scrollToSlide = useCallback((index) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const slideWidth = carousel.offsetWidth;
      carousel.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    }
  }, []);

  const restartAutoplay = useCallback(() => {
    clearInterval(intervalRef.current);
    // শুধুমাত্র ১টির বেশি স্লাইড থাকলেই অটো-প্লে চালু হবে
    if (slides.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, AUTOPLAY_DELAY);
    }
  }, [slides.length]);

  useEffect(() => {
    scrollToSlide(currentSlide);
    restartAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [currentSlide, scrollToSlide, restartAutoplay]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  // ------------------------------------------

  // যদি কোনো স্লাইড না থাকে, তাহলে কিছুই দেখানো হবে না
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="w-full relative mt-8">
      <div
        ref={carouselRef}
        className="carousel w-full aspect-video rounded-box"
      >
        {/* এখন ডাইনামিক 'slides' অ্যারের উপর ম্যাপ করা হচ্ছে */}
        {slides.map((slide, index) => (
          // পরিবর্তন: carousel-item এখন Link-এর বাইরে
          <div
            key={slide._id}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full h-full"
          >
            <Link href={slide.link || "#"} className="w-full h-full block">
              <Image
                src={slide.image} // ডেটাবেস থেকে আসা ছবির URL
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20 z-10 flex flex-col items-center justify-center text-white p-4">
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-warning text-white">
                  Shop Now
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* পরিবর্তন: শুধুমাত্র ১টির বেশি স্লাইড থাকলেই নেভিগেশন এবং টাইমার দেখানো হবে */}
      {slides.length > 1 && (
        <>
          {/* Navigation Buttons  */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
            <button
              onClick={handlePrev}
              className="btn btn-circle bg-white/30 border-none text-white"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="btn btn-circle bg-white/30 border-none text-white"
            >
              ❯
            </button>
          </div>

          {/* Animated Timer  */}
          <div className={styles.timer_wrapper}>
            <svg className={styles.timer_svg} key={currentSlide}>
              <circle
                className={styles.timer_circle}
                style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }}
                cx="26"
                cy="26"
                r="20"
              ></circle>
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default SliderClient;
