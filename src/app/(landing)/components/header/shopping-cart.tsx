"use client";

import { Button } from "@/components/general";
import Popper from "@/components/general/popper";
import { useAppContext } from "@/lib/context-provider";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default function ShoppingCart() {
  const { cart } = useAppContext();

  return (
    <Popper>
      <Popper.Trigger>
        <Button
          variant="ghost"
          height="md"
          className="aspect-square"
          as={Link}
          href="/cart"
        >
          <ShoppingCartIcon width={20} height={20} />
        </Button>
      </Popper.Trigger>
      <Popper.Content>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((course) => (
                <li
                  key={course.id}
                  className="border-b-[#1d1e27] border-b-2 px-4 py-2"
                >
                  <Link
                    className="flex gap-x-2 items-start text-start"
                    href={`/course/${course.id}/lecture`}
                  >
                    <img
                      src={course.imageUrl}
                      alt="Course image."
                      className="w-24 aspect-square rounded-md object-cover"
                    />
                    <div className="basis-3/4 shrink-0">
                      <p className="text-start font-bold leading-6 mb-2">
                        {course.title}
                      </p>
                      <p className="text-sm">{course.instructor.name}</p>
                      <p className="font-bold">
                        {course.price === 0 ? "FREE" : `$${course.price}`}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-4 pt-2">
              {cart.length > 0 && (
                <span className="text-start text-xl mb-2 me-auto inline-block">
                  Total: ${cart.reduce((acc, course) => acc + course.price, 0)}
                </span>
              )}
              <Button href="/cart" as={Link}>
                Go to cart
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[#595c73] mb-[1.6rem] text-md">
              Your cart is empty.
            </p>
            <Link href="/" className="text-md text-udemy-purple">
              Keep shopping
            </Link>
          </>
        )}
      </Popper.Content>
    </Popper>
  );
}
