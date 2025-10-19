"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HeroSlider.module.css";

const sliderImages = [
  { id: 1, src: "/images/slider/pet-banner-1.jpg" },
  { id: 2, src: "/images/slider/pet-banner-2.jpg" },
  { id: 3, src: "/images/slider/pet-banner-3.jpg" },
];

const AUTOPLAY_DELAY = 4000;

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Index-based (0, 1, 2)
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  const scrollToSlide = useCallback((index) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const slideWidth = carousel.offsetWidth;
      carousel.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    }
  }, []);

  const restartAutoplay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, AUTOPLAY_DELAY);
  }, []);

  useEffect(() => {
    scrollToSlide(currentSlide);
    restartAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [currentSlide, scrollToSlide, restartAutoplay]);

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  return (
    <div className="w-full relative mt-8">
      <div
        ref={carouselRef}
        className="carousel w-full aspect-video rounded-box"
      >
        {sliderImages.map((image, index) => (
          <div
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
            key={image.id}
          >
            <Image
              src={image.src}
              alt={`Slide ${image.id}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center  text-white p-4">
              {/* <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                Your Pet's Happiness Starts Here
              </h2> */}
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl  btn-warning text-white ">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons now use onClick */}
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

      {/* Animated Timer */}
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
    </div>
  );
};

export default HeroSlider;
