import {
  Companies,
  FeaturedCourses,
  HeroCarousel,
  Testimonials,
} from "./sections";

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
