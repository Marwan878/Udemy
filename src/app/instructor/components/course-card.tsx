import { ProgressBar } from "@/components/general";
import { instructorCourseCompletionPercentage } from "@/lib/utils";
import { TCourse } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function CourseCard({ course }: { course: TCourse }) {
  return (
    <Link
      href={`/course/${course.id}/manage/goals`}
      className="bg-white border rounded-md h-48 flex gap-4"
    >
      <div className="bg-gray-300 h-full w-[11.8rem] relative">
        <Image
          src={
            course.imageUrl ||
            "https://s.udemycdn.com/course/200_H/placeholder.jpg"
          }
          alt={`${course.title} cover image`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-2 flex-1 cursor-pointer relative group">
        <p
          className="absolute text-xl left-1/2 top-1/2 opacity-0 peer group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2  text-udemy-purple"
          style={{ fontWeight: "700" }}
        >
          Edit / manage course
        </p>
        <div className="hover:opacity-20 peer-hover:opacity-20 flex items-center space-x-24 me-4 h-full">
          <div className="flex justify-between flex-col gap-2 text-sm self-stretch w-1/5">
            <h3 className="text-2xl font-bold">{course.title}</h3>
            <span className="text-sm font-semibold">
              {course.isPublished ? "Published" : "Draft"}
            </span>
          </div>
          <div className="space-y-4 w-4/5">
            <span
              className="text-gray-700 text-lg"
              style={{ fontWeight: "600" }}
            >
              {course.isPublished ? "Published" : "Finish your course"}
            </span>
            <ProgressBar
              className="h-2 rounded-none w-full"
              progress={instructorCourseCompletionPercentage(course)}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
