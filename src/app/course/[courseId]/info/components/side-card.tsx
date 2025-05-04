"use client";

import { Button } from "@/components/general";
import { useCart } from "@/contexts/cart";
import Link from "next/link";
import { TCourse } from "@/types";

export default function SideCard({ course }: { course: TCourse }) {
  const { cartCoursesIds, addToCart } = useCart();
  return (
    <div className="hidden lg:block lg:w-[34rem] -translate-y-96 lg:top-0 shrink-0 mb-10 lg:right-0 bg-white h-fit border-b-[#d1d2e0] border-b shadow-[0_2px_4px_rgba(6,17,118,0.08),0_4px_12px_rgba(6,17,118,0.08)]">
      <img
        src={course.imageUrl}
        alt={`${course.title} cover image`}
        className="h-72 w-full"
      />
      <div className="p-4">
        <div className="heading-xl my-4">
          {course.price > 0 ? `$${course.price}` : "FREE"}
        </div>
        <Button
          as={cartCoursesIds.includes(course.id) ? Link : undefined}
          href="/cart"
          className="font-bold w-full"
          onClick={() => addToCart(course)}
          variant="primary"
        >
          {cartCoursesIds.includes(course.id) ? "Go to cart" : "Add to cart"}
        </Button>
        <span className="text-xs text-[#2a2b3f] w-full text-center inline-block">
          Full Lifetime Access
        </span>
      </div>
    </div>
  );
}
