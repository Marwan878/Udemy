import { fetchInstructorCourses } from "@/actions/instructor";
import { Button, MaxWidthWrapper } from "@/components/general";
import { CourseManagementProvider } from "@/contexts/course-management";
import { ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import CourseManagementSidebar from "./course-management-sidebar";
import SaveButton from "./save-button";
import { fetchModulesWithContent } from "@/actions/courses";
import {
  MIN_AUDIENCE_DESCRIPTION_COUNT,
  MIN_LEARNING_OBJECTIVES_COUNT,
  MIN_PREREQUISITES_COUNT,
} from "@/constants";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const instructorCourses = await fetchInstructorCourses();
  const courseData = instructorCourses.find((course) => course.id === courseId);

  if (courseData === undefined) {
    return notFound();
  }

  if (courseData.whatYouWillLearn.length === 0) {
    courseData.whatYouWillLearn = new Array(MIN_LEARNING_OBJECTIVES_COUNT).fill(
      ""
    );
  }

  if (courseData.requirements.length === 0) {
    courseData.requirements = new Array(MIN_PREREQUISITES_COUNT).fill("");
  }

  if (courseData.whoThisCourseIsFor.length === 0) {
    courseData.whoThisCourseIsFor = new Array(
      MIN_AUDIENCE_DESCRIPTION_COUNT
    ).fill("");
  }

  const modules = await fetchModulesWithContent(courseId);

  return (
    <CourseManagementProvider courseData={courseData} modules={modules}>
      <header className="bg-[#1d1e27] min-h-[5.6rem] w-full sticky top-0 z-[100] px-4 py-[1.1rem] shadow-[0_4px_8px_rgba(6,17,118,0.08),0_4px_12px_rgba(6,17,118,0.24)] text-white flex items-center justify-start gap-x-6 w-f">
        <Button
          variant="ghost"
          as={Link}
          className="w-fit min-w-0"
          href="/instructor"
        >
          <ChevronLeft />
        </Button>
        <div className="flex flex-col gap-3 md:flex-row md:items-center flex-1">
          <div className="heading-lg">{courseData.title}</div>
          <SaveButton />
        </div>
      </header>
      <MaxWidthWrapper className="mt-4 flex gap-x-8 lg:mt-24 mb-24">
        <CourseManagementSidebar />
        <main className="flex flex-col lg:basis-2/3 mx-auto">
          <div className="mb-4 flex justify-between items-center lg:hidden">
            <Button variant="ghost" className="min-w-0 px-2">
              <Menu size={28} className="text-udemy-purple" />
            </Button>
          </div>
          {children}
        </main>
      </MaxWidthWrapper>
    </CourseManagementProvider>
  );
}
