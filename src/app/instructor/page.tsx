import { fetchInstructorCourses } from "@/actions/instructor";
import { MaxWidthWrapper } from "@/components/general";
import { BentoGrid } from "./components/bento-grid";
import { CourseCard } from "./components/course-card";
import { CourseHeader } from "./components/course-header";

export default async function Page() {
  const instructorCourses = await fetchInstructorCourses();

  return (
    <MaxWidthWrapper className="pb-12">
      <h1 className="heading-serif-3xl mb-12">Courses</h1>
      <CourseHeader />
      <div className="flex flex-col space-y-8 mb-24">
        {instructorCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <BentoGrid />
    </MaxWidthWrapper>
  );
}
