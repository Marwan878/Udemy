"use client";

import { getLoggedInUserId } from "@/actions/cart";
import { createCheckoutSession } from "@/actions/payment";
import { Button, MaxWidthWrapper } from "@/components/general";
import { useCart } from "@/contexts/cart";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CartCourseCard from "./components/cart-course-card";
import MobileCheckoutModal from "./components/mobile-checkout-modal";

export default function Page() {
  const { cart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) return;

    const userId = await getLoggedInUserId();
    if (!userId) {
      router.push(
        `/sign-up?redirect_url=${process.env.NEXT_PUBLIC_SERVER_URL}/cart`
      );
      return;
    }

    const session = await createCheckoutSession(
      cart.map((course) => ({
        title: course.title,
        price: course.price,
        id: course.id,
        publisherId: course.instructor.id,
      }))
    );

    if (!session || !session.redirectUrl) return;

    router.push(session.redirectUrl);
  };

  if (!cart) {
    return "Loading...";
  }

  const cartTotal = cart.reduce((total, course) => total + course.price, 0);

  return (
    <>
      <MaxWidthWrapper className="min-h-screen">
        <h1 className="heading-3xl my-[2.4rem]">Shopping Cart</h1>
        <h3 className="mb-[0.8rem] heading-md">
          {cart.length} Course{cart.length !== 1 && "s"} in Cart
        </h3>
        {cart.length === 0 ? (
          <div
            className="mb-12 p-[2.4rem] flex flex-col items-center"
            style={{ boxShadow: "0 0 2px #d1d2e0" }}
          >
            <Image
              width={240}
              height={180}
              src="/images/empty-cart.webp"
              alt="Empty cart image."
            />
            <p className="mb-[2.4rem] text-center">
              Your cart is empty. Keep shopping to find a course!
            </p>
            <Button as="a" href="/" className="heading-md h-[4.8rem]">
              Keep shopping
            </Button>
          </div>
        ) : (
          <div className="flex justify-between">
            <ul className="max-w-none flex-grow">
              {cart.map((course) => (
                <CartCourseCard course={course} key={course.id} />
              ))}
            </ul>
            <div className="ms-[3.2rem] max-w-[30rem] hidden sm:block">
              <div className="flex flex-col pb-[0.8rem] items-start">
                <div className="mb-[0.8rem] text-[#595c73] heading-md">
                  Total:
                </div>
                <div className="heading-2xl mb-2">
                  {cartTotal > 0 ? `$${cartTotal}` : "FREE"}
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
                You won't be charged yet
              </p>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
      {cart.length > 0 && (
        <MobileCheckoutModal handleCheckout={handleCheckout} />
      )}
    </>
  );
}
