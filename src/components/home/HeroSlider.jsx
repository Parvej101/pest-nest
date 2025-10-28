// এটি একটি Server Component, যা ডেটা fetch করার দায়িত্বে থাকবে

import SliderClient from "./SliderClient"; // আমরা এই Client Component-টি পরের ধাপে তৈরি করব

// --- ডেটা আনার জন্য Helper ফাংশন ---
async function getSlides() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`, {
      cache: "no-store", // ডেভেলপমেন্টের জন্য
    });
    if (!res.ok) {
      console.error("Failed to fetch slides. Status:", res.status);
      return [];
    }
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error in getSlides:", error);
    return [];
  }
}

const HeroSlider = async () => {
  // সার্ভারেই স্লাইডগুলো fetch করা হচ্ছে
  const slides = await getSlides();

  if (slides.length === 0) {
    // যদি কোনো স্লাইড না থাকে, তাহলে একটি ফলব্যাক ব্যানার দেখানো যেতে পারে
    return (
      <section className="bg-base-200 h-64 flex items-center justify-center mt-8 rounded-box">
        <p>Welcome to PetNest!</p>
      </section>
    );
  }

  // ডেটাগুলো Client Component-এর কাছে props হিসেবে পাস করা হচ্ছে
  return <SliderClient slides={slides} />;
};

export default HeroSlider;
