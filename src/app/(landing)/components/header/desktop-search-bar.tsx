"use client";

import SearchBar from "@/components/search-bar";
import { useState } from "react";
import { TCourse } from "@/types";
import { searchCourses } from "@/actions/courses";
import Image from "next/image";
import Link from "next/link";

export default function DesktopSearchBar() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<TCourse[]>([]);

  const handleSearch = async () => {
    const courses = await searchCourses(query);
    setCourses(courses);
  };

  return (
    <div className="hidden relative lg:block ms-4 flex-1 mx-[1.2rem]">
      <SearchBar
        onSearch={handleSearch}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        containerClassName="peer"
      />
      {courses.length > 0 && (
        <ul className="bg-white border hidden peer-focus-within:block inset-x-0 border-[#d1d2e0] z-[300] h-96 absolute top-full translate-y-3">
          {courses.map((course) => (
            <li key={course.id} className="hover:bg-[#f5f6f9]">
              <Link
                href={`/course/${course.id}/info`}
                className="flex items-center gap-x-6 py-4 px-4"
              >
                <div className="w-20 h-20 relative">
                  <Image
                    fill
                    src={course.imageUrl}
                    className="object-cover"
                    alt={`${course.title} cover image`}
                  />
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="heading-md">{course.title}</div>
                  <div className="flex gap-x-2">
                    <span className="heading-xs text-[#595c73]">Course</span>
                    <span className="text-xs text-[#595c73]">
                      {course.instructor.firstName +
                        " " +
                        course.instructor.lastName}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
