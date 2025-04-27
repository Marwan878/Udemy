"use client";

import { removeFromCart, getLoggedInUserId } from "@/actions/cart";
import { fetchCourses } from "@/actions/courses";
import { createCheckoutSession } from "@/actions/payment";
import { StarRating, Tag } from "@/components/course-card/course-card";
import { Button, MaxWidthWrapper } from "@/components/general/index";
import { useAppContext } from "@/lib/context-provider";
import { TCourse } from "@/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { CSSProperties, useEffect, useState } from "react";

export default function Page() {
  const { cartCoursesIds } = useAppContext();
  const router = useRouter();
  const [cartCourses, setCartCourses] = useState<TCourse[]>([]);

  const handleFetchCartCourses = useCallback(async () => {
    if (cartCoursesIds.length === 0) return;

    const cartCourses = await fetchCourses(cartCoursesIds);
    setCartCourses(cartCourses);
  }, [cartCoursesIds]);

  const handleCheckout = async () => {
    if (cartCourses.length === 0) return;

    const userId = await getLoggedInUserId();
    if (!userId) {
      router.push(
        `/sign-up?redirect_url=${process.env.NEXT_PUBLIC_SERVER_URL}/cart`
      );
      return;
    }

    const { redirectUrl } = await createCheckoutSession(
      cartCourses.map((course) => ({
        title: course.title,
        price: course.price,
        id: course.id,
      }))
    );

    router.push(redirectUrl);
  };

  useEffect(() => {
    handleFetchCartCourses();
  }, [handleFetchCartCourses]);

  if (cartCoursesIds === null) {
    return "Loading...";
  }

  return (
    <>
      <MaxWidthWrapper>
        <h1 className="heading-3xl my-[2.4rem]">Shopping Cart</h1>
        <h3 className="mb-[0.8rem] heading-md">
          {cartCoursesIds.length} Course{cartCoursesIds.length !== 1 && "s"} in
          Cart
        </h3>
        {cartCoursesIds.length === 0 ? (
          <div
            className="mb-12 p-[2.4rem] flex flex-col items-center"
            style={{ boxShadow: "0 0 2px #d1d2e0" }}
          >
            <Image
              width={240}
              height={180}
              src="/images/empty-cart.webp"
              alt=""
            />
            <p className="mb-[2.4rem]">
              Your cart is empty. Keep shopping to find a course!
            </p>
            <Button as="a" href="/" className="heading-md h-[4.8rem]">
              Keep shopping
            </Button>
          </div>
        ) : (
          <div className="flex justify-between">
            <ul className="max-w-none flex-grow">
              {cartCourses.map((course) => (
                <CartCourseCard
                  course={course}
                  key={course.id}
                  handleFetchCartCourses={handleFetchCartCourses}
                />
              ))}
            </ul>
            <div className="ms-[3.2rem] max-w-[30rem] hidden sm:block">
              <div className="flex flex-col pb-[0.8rem] items-start">
                <div className="mb-[0.8rem] text-[#595c73] heading-md">
                  Total:
                </div>
                <div className="leading-none py-[0.4rem] me-[0.8rem] heading-2xl">
                  {/* {totalAfterDiscount} */}
                  250
                </div>
                <del className="text-[#595c73] leading-none py-[0.4rem] me-[0.8rem] text-md">
                  {/* {totalBeforeDiscount} */}
                  1250
                </del>
                <div className="leading-none py-[0.4rem] text-md">
                  77% off (hard coded)
                </div>
              </div>
              <Button
                variant="primary"
                height="lg"
                className="btn-lg heading-md w-full"
                onClick={handleCheckout}
              >
                Proceed to Checkout <ArrowRight />
              </Button>
              <p className="mt-[0.8rem] text-[1.2rem] text-[#595c73]">
                You won&apos;t be charged yet
              </p>
              <div className="mt-[1.6rem] pt-[1.6rem] border-t border-t-[#d1d2e0]">
                <div className="heading-md mb-[1.6rem]">Promotions</div>
                {/* <input type="text" /> */}
              </div>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
      <MobileCheckoutModal />
    </>
  );
}

function CartCourseCard({
  course,
  handleFetchCartCourses,
}: {
  course: TCourse;
  handleFetchCartCourses: () => void;
}) {
  const {
    id,
    imageUrl,
    price,
    rating,
    ratingCount,
    instructorName,
    title,
    tag,
    meta,
  } = course;
  return (
    <li className="grid py-[1.6rem] border-t border-t-[#d1d2e0] cart-item-grid">
      <div style={{ gridArea: "image" }} className="me-[1.6rem]">
        <div className="w-[4.8rem] h-[4.8rem] md:w-48 md:h-[6.8rem] relative">
          <Image fill objectFit="cover" src={imageUrl} alt={""} />
        </div>
      </div>
      <div style={{ gridArea: "header" }}>
        <h3 className="heading-md line-clamp-3 text-ellipsis">
          <a href="#">{title}</a>
        </h3>
        <div className="text-xs">By {instructorName}</div>
      </div>
      <StarRating
        rating={rating}
        ratingCount={ratingCount}
        className="mt-[0.8rem]"
        style={{ gridArea: "rating" }}
      />
      {tag && (
        <Tag
          tag={tag}
          className="mt-[0.8rem] me-[0.8rem]"
          style={{ gridArea: "badges" }}
        />
      )}
      <DiscSeperatedText sentences={meta} style={{ gridArea: "meta" }} />
      <div
        style={{ gridArea: "actions" }}
        className="mt-[0.8rem] gap-x-[1.6rem] md:flex md:flex-col md:items-end md:mt-0"
      >
        <button
          onClick={() => {
            removeFromCart([id]);
            handleFetchCartCourses();
          }}
          className="text-sm text-udemy-purple hover:bg-btn-focus h-[2.8rem] rounded-[0.4rem] px-[0.8rem]"
        >
          Remove
        </button>
        <button
          onClick={() => {}}
          className="text-sm text-udemy-purple hover:bg-btn-focus h-[2.8rem] rounded-[0.4rem] px-[0.8rem]"
        >
          Save for Later
        </button>
      </div>
      <div style={{ gridArea: "price" }} className="ps-[4.8rem]">
        {price > 0 ? `E£${price}` : "FREE"}
      </div>
    </li>
  );
}

function MobileCheckoutModal() {
  return (
    <div
      className="bg-white p-[1.6rem] fixed inset-x-0 bottom-0 z-50 flex flex-col md:hidden"
      style={{
        boxShadow:
          "0 -4px 8px rgba(6, 17, 118, .08), 0 -4px 12px rgba(6, 17, 118, .24)",
      }}
    >
      <Button className="w-full heading-md h-[4.8rem]">
        Proceed to Checkout <ArrowRight />
      </Button>
      <p className="text-[#595c73 text-[1.2rem] mt-[0.8rem] text-center">
        You won&apos;t be charged yet
      </p>
    </div>
  );
}

function DiscSeperatedText({
  sentences,
  style,
}: {
  sentences: string[] | undefined;
  style?: CSSProperties;
}) {
  if (!sentences || sentences.length === 0) return null;
  return (
    <div
      style={style}
      className="flex items-center gap-[0.4rem] mt-[0.8rem] text-[#595c73] text-xs"
    >
      {sentences.map((sentence, i) => (
        <React.Fragment key={i}>
          {i >= 1 && <div className="w-2 h-2 rounded-full bg-[#595c73]" />}
          <p>{sentence}</p>
        </React.Fragment>
      ))}
    </div>
  );
}
