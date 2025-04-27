"use client";

import { StarRating } from "@/components/general/index";
import { specialRound } from "@/lib/utils";
import { TCourse } from "@/types";
import Link from "next/link";
import { useRef, useState } from "react";
import CoursePopover from "./course-popover";
import Tag from "./tag";

export default function CourseCard({ course }: { course: TCourse }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLAnchorElement>(null);
  const { imageUrl, title, instructor, rating, ratingCount, price, tag } =
    course;
  const cardRect = cardRef.current?.getBoundingClientRect();

  return (
    <Link
      href={`/course/${course.id}/info`}
      ref={cardRef}
      className="border-[#d1d2e0] max-w-[calc(37.5rem+2*1px)] min-w-[calc(17.3rem+2*1px)] block relative shrink-0 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <CoursePopover
          cardRect={cardRect}
          course={course}
          arrowDirection={"right"}
        />
      )}
      <img
        className="object-cover w-full rounded-t-[8px]"
        src={imageUrl}
        alt={`${title} cover image`}
      />
      <div className="pt-[0.8rem] px-[2.4rem] pb-[1.6rem] border-[#d1d2e0] border text-[#303141] gap-[0.8rem] flex flex-col items-start rounded-b-[8px]">
        <h3 className="overflow-hidden text-ellipsis heading-md">{title}</h3>
        <div className="text-sm">{instructor.name}</div>
        <StarRating rating={specialRound(rating)} ratingCount={ratingCount} />
        <div className="leading-none py-[0.4rem] heading-md">
          {price > 0 ? `$${price}` : "FREE"}
        </div>
        {tag && <Tag tag={tag} />}
      </div>
    </Link>
  );
}
