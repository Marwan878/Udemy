import dynamic from "next/dynamic";
import { HeroCarousel } from "./sections";

const FeaturedCourses = dynamic(() => import("./sections/featured-courses"));
const Companies = dynamic(() => import("./sections/companies"));
const Testimonials = dynamic(() => import("./sections/testimonials"));

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <FeaturedCourses />
      <Companies />
      <Testimonials />
    </main>
  );
}
