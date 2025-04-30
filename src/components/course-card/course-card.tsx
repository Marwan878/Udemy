"use client";

import { StarRating } from "@/components/general/index";
import { specialRound } from "@/lib/utils";
import { TCourse, TCourseState } from "@/types";
import Link from "next/link";
import { useRef, useState } from "react";
import CoursePopover from "./course-popover";
import Tag from "./tag";

export default function CourseCard({
  course,
  state,
}: {
  course: TCourse;
  state: TCourseState;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLAnchorElement>(null);

  const { imageUrl, title, instructor, rating, ratingCount, price, tag } =
    course;
  const cardRect = cardRef.current?.getBoundingClientRect();

  return (
    <Link
      href={`/course/${course.id}/info`}
      ref={cardRef}
      className="border-[#d1d2e0] max-w-[calc(37.5rem+2*1px)] min-w-[30rem] block relative shrink-0 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <CoursePopover
          cardRect={cardRect}
          course={course}
          arrowDirection={"right"}
          state={state}
        />
      )}
      <img
        className="object-cover w-full rounded-t-[8px]"
        src={imageUrl || "https://s.udemycdn.com/course/200_H/placeholder.jpg"}
        alt={`${title} cover image`}
      />
      <div className="pt-[0.8rem] px-[2.4rem] pb-[1.6rem] border-[#d1d2e0] border text-[#303141] gap-[0.8rem] flex flex-col items-start rounded-b-[8px]">
        <h3 className="overflow-hidden text-ellipsis heading-md">{title}</h3>
        <div className="text-sm">
          {instructor.firstName + " " + instructor.lastName}
        </div>
        <StarRating rating={specialRound(rating)} ratingCount={ratingCount} />
        <div className="leading-none py-[0.4rem] heading-md">
          {price > 0 ? `$${price}` : "FREE"}
        </div>
        {tag && <Tag tag={tag} />}
      </div>
    </Link>
  );
}
