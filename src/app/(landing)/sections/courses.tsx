"use client";

import { fetchCourses } from "@/actions/courses";
import CourseCard from "@/components/course-card/course-card";
import { ContentSlider, MaxWidthWrapper } from "@/components/general";
import { TCategory, TCourse, TCourseState } from "@/types";
import { useEffect, useState } from "react";
import CategoryPill from "../components/category-pill";
import { fetchUserField } from "@/actions/cart";

export default function Courses({ categories }: { categories: TCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState(categories.at(0));
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [userCoursesIds, setUserCoursesIds] = useState<Set<string>>(new Set());
  const [userPublishedCoursesIds, setUserPublishedCoursesIds] = useState<
    Set<string>
  >(new Set());

  const handleCategoryChange = (category: TCategory) => {
    if (category.id === selectedCategory?.id) return;
    changeCategory(category);
  };

  const changeCategory = async (category: TCategory) => {
    setSelectedCategory(category);
    const courses = await fetchCourses(category.coursesIds);
    setCourses(courses);
  };

  const getCourseState = (courseId: string): TCourseState => {
    if (userCoursesIds.has(courseId)) {
      return "purchased";
    }

    if (userPublishedCoursesIds.has(courseId)) {
      return "published";
    }

    return "not_purchased";
  };

  useEffect(() => {
    changeCategory(categories.at(0));
  }, [categories]);

  useEffect(() => {
    const _fetchUserCourses = async () => {
      const userCourses = await fetchUserField("courses");
      setUserCoursesIds(new Set(Object.keys(userCourses)));
      const userPublishedCourses = await fetchUserField("publishedCoursesIds");
      setUserPublishedCoursesIds(new Set(Object.keys(userPublishedCourses)));
    };

    _fetchUserCourses();
  }, []);

  return (
    <div className="bg-[#f6f7f9] py-12">
      <MaxWidthWrapper>
        <ContentSlider childrenCount={categories.length}>
          {categories.map((category, i) => (
            <CategoryPill
              key={category.id}
              onClick={() => handleCategoryChange(category)}
              checked={selectedCategory?.id === category.id}
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
              <CourseCard
                key={course.id}
                course={course}
                state={getCourseState(course.id)}
              />
            ) : null
          )}
        </ContentSlider>
      </MaxWidthWrapper>
    </div>
  );
}
