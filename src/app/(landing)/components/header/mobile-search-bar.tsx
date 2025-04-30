"use client";

import { searchCourses } from "@/actions/courses";
import { Button, SearchBar } from "@/components/general";
import { TCourse } from "@/types";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MobileSearchBar() {
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<TCourse[]>([]);

  const handleToggleForm = () => {
    document.body.classList.toggle("overflow-hidden");
    setFormIsVisible((prev) => !prev);
  };

  const handleSearch = async () => {
    const courses = await searchCourses(query);
    setCourses(courses);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="block lg:hidden p-2"
        onClick={handleToggleForm}
      >
        <Search width={20} height={20} />
      </Button>
      {formIsVisible && (
        <div className="fixed inset-0 z-[300] bg-white lg:hidden">
          <SearchBar
            onSearch={handleSearch}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full mx-0 rounded-none border-t-0 border-x-0 border-b-[#d1d2e0]"
          />
          <Button
            variant="ghost"
            height="sm"
            className="absolute top-3 right-3"
            onClick={handleToggleForm}
          >
            <X color="#2a2b3f" />
          </Button>
          <ul className="px-4">
            {courses.map((course) => (
              <li key={course.id} className="py-4">
                <Link
                  href={`/course/${course.id}/info`}
                  className="flex items-center gap-x-6"
                >
                  <div className="w-20 h-20 relative">
                    <Image
                      fill
                      src={course.imageUrl}
                      className="object-cover"
                      alt=""
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
        </div>
      )}
    </>
  );
}
