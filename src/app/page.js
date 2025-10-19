import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSlider from "@/components/home/HeroSlider";
import TrendingProducts from "@/components/home/TrendingProducts";
import VideoShowcase from "@/components/home/VideoShowcase";

export default function Home() {
  return (
  <div>
 <HeroSlider></HeroSlider>
 <Categories></Categories>
 <FeaturedProducts></FeaturedProducts>
 {/* <PromoBanners></PromoBanners> */}
 <VideoShowcase></VideoShowcase>
 <TrendingProducts></TrendingProducts>
  </div>
  );
}
