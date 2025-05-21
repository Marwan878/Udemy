"use server";

import { stripe } from "@/lib/stripe";
import { getLoggedInUserId } from "../cart";

export const createCheckoutSession = async (
  coursesDetails: {
    title: string;
    price: number;
    id: string;
    publisherId: string;
  }[]
) => {
  const userId = await getLoggedInUserId();

  if (!userId) {
    throw new Error("You must be logged in to complete checkout");
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/my-courses/learning`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: coursesDetails.map((course) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
          },
          unit_amount: course.price * 100, // convert price to cents
        },
        quantity: 1,
      })),
      metadata: {
        userId,
        coursesIds: JSON.stringify(coursesDetails.map((course) => course.id)),
        coursesPublishersIds: JSON.stringify(
          coursesDetails.map((course) => course.publisherId)
        ),
      },
    });

    return { redirectUrl: stripeSession.url };
  } catch (error) {
    console.error(error);
  }
};
