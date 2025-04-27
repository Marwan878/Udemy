import { fetchCategories } from "@/actions/courses";
import { Section, SectionHeading } from "@/components/general";
import Courses from "./courses";

export default async function FeaturedCourses() {
  const categories = await fetchCategories();

  return (
    <>
      <Section>
        <SectionHeading
          primaryText="All the skills you need in one place"
          secondaryText="From critical skills to technical topics, Udemy supports your professional development."
        />
      </Section>
      <Courses categories={categories} />
    </>
  );
}
