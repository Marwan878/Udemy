"use client";

import { Button } from "@/components/general";
import { TCourse, TUser } from "@/types";
import { Star } from "lucide-react";
import React from "react";
import { useCart } from "@/contexts/cart";
import Link from "next/link";

export default function SliderMenu({
  course,
}: {
  course: TCourse & { instructor: TUser };
}) {
  const { title, price, rating, ratingCount, studentsCount } = course;
  const { addToCart, cartCoursesIds } = useCart();

  return (
    <div className="sm:bg-[#1d1e27] sm:text-white sm:flex sm:justify-between fixed min-h-24 max-lg:bottom-0 w-full bg-white lg:top-0 py-2 px-4 shadow-[0_-2px_4px_rgba(6,17,118,0.08),0_-4px_12px_rgba(6,17,118,0.08)] z-10">
      <div className="hidden sm:block">
        <div className="font-bold text-ellipsis mb-2 before:">{title}</div>
        <div className="flex items-center gap-x-2">
          <span className="text-[#f69c08] flex items-center gap-x-1">
            {rating} <Star className="w-3 h-3" fill="#f69c08" />
          </span>
          <span>({ratingCount.toLocaleString()} rating(s))</span>
          <span>{studentsCount.toLocaleString()} students</span>
        </div>
      </div>
      <div className="flex items-center gap-x-3 lg:hidden">
        <span className="font-bold shrink-0 heading-lg">${price}</span>
        {cartCoursesIds.includes(course.id) ? (
          <Button
            as={Link}
            href="/cart"
            className="font-bold flex-1 md:bg-white md:hover:bg-gray-200 md:text-[#000]"
          >
            Go to cart
          </Button>
        ) : (
          <Button
            className="font-bold flex-1 md:bg-white md:hover:bg-gray-200 md:text-[#000]"
            onClick={() => addToCart(course)}
          >
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
