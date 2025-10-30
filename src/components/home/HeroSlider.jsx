import dbConnect from "../../../lib/dbConnect";
import Slider from "../../../models/Slider";
import SliderClient from "./SliderClient";

async function getSlides() {
  try {
    await dbConnect();
    const slides = await Slider.find().sort({ order: 1 });
    return JSON.parse(JSON.stringify(slides));
  } catch (error) {
    console.error("Error in getSlides:", error);
    return [];
  }
}

const HeroSlider = async () => {
  const slides = await getSlides();

  if (!slides || slides.length === 0) {
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
