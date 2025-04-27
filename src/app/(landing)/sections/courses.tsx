"use client";

import { fetchCategoryCourses } from "@/actions/courses";
import CourseCard from "@/components/course-card/course-card";
import { ContentSlider, MaxWidthWrapper } from "@/components/general";
import { cn } from "@/lib/utils";
import { TCategory, TCourse } from "@/types";
import { useState } from "react";

export default function Courses({ categories }: { categories: TCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState(categories.at(0));
  const [courses, setCourses] = useState<TCourse[]>([]);

  const handleCategoryChange = async (category: TCategory) => {
    if (category.id === selectedCategory.id) return;
    setSelectedCategory(category);
    const courses = await fetchCategoryCourses(category.id);
    setCourses(courses);
  };

  return (
    <>
      <div className="bg-[#f6f7f9] py-12">
        <MaxWidthWrapper>
          <ContentSlider childrenCount={categories.length}>
            {categories.map((category, i) => (
              <Pill
                key={category.id}
                onClick={() => handleCategoryChange(category)}
                checked={selectedCategory.id === category.id}
                className={
                  i === categories.length - 1 ? "snap-end" : "snap-start"
                }
                category={category}
              />
            ))}
          </ContentSlider>
          <ContentSlider
            childrenCount={courses.length}
            className="flex gap-x-4 mt-8 w-full"
          >
            {courses.map((course) =>
              course.isPublished ? (
                <CourseCard key={course.id} course={course} />
              ) : null
            )}
          </ContentSlider>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

function Pill({
  category,
  checked,
  className,
  onClick,
}: {
  checked: boolean;
  category: TCategory;
  className?: string;
  onClick: React.MouseEventHandler<HTMLLabelElement>;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start h-[6.6rem] pt-[1.6rem] px-[2.4rem] pb-[0.8rem] rounded-[9.6rem] bg-[#e9eaf2] text-nowrap cursor-pointer hover:bg-[#d1d2e0] ",
        { "bg-[#303141] hover:bg-[#595c73]": checked },
        className
      )}
    >
      <label
        htmlFor={category.displayName}
        onClick={onClick}
        className="cursor-pointer"
      >
        <h4
          className={cn(
            "mb-[0.4rem] heading-md text-[#303141] user-select-none",
            {
              "text-white": checked,
            }
          )}
        >
          {category.displayName}
        </h4>
        <span
          className={cn("text-xs text-[#595c73] user-select-none", {
            "text-white": checked,
          })}
        >
          {category.learnersCount >= 1_000_000
            ? parseFloat((category.learnersCount / 1_000_000).toPrecision(3)) +
              "M+"
            : category.learnersCount.toLocaleString()}{" "}
          learners
        </span>
      </label>
      <input
        className="hidden"
        type="radio"
        id={category.displayName}
        checked={checked}
        readOnly
      />
    </div>
  );
}
