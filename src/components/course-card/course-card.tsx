"use client";

import { StarRating } from "@/components/general/index";
import { specialRound } from "@/lib/utils";
import { TCourse, TCourseState } from "@/types";
import Link from "next/link";
import { useRef, useState } from "react";
import CoursePopover from "./course-popover";
import Tag from "./tag";
import Image from "next/image";

export default function CourseCard({
  course,
  state,
}: {
  course: TCourse;
  state: TCourseState;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const { imageUrl, title, instructor, rating, ratingCount, price, tag } =
    course;
  const cardRect = cardRef.current?.getBoundingClientRect();

  return (
    <>
      <Link
        href={`/course/${course.id}/info`}
        className="border-[#d1d2e0] max-w-[calc(37.5rem+2*1px)] min-w-[30rem] block relative shrink-0 bg-white lg:hidden"
      >
        <div className="w-full rounded-t-[8px]">
          <Image
            fill
            className="object-cover "
            src={
              imageUrl || "https://s.udemycdn.com/course/200_H/placeholder.jpg"
            }
            alt={`${title} cover image`}
          />
        </div>
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
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={cardRef}
        className="hidden lg:block border-[#d1d2e0] max-w-[calc(37.5rem+2*1px)] min-w-[30rem] relative shrink-0 bg-white"
      >
        {isHovered && (
          <CoursePopover cardRect={cardRect} course={course} state={state} />
        )}
        <div className="relative w-full rounded-t-[8px]">
          <Image
            fill
            className="object-cover"
            src={
              imageUrl || "https://s.udemycdn.com/course/200_H/placeholder.jpg"
            }
            alt={`${title} cover image`}
          />
        </div>
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
      </div>
    </>
  );
}
