import { removeFromCart } from "@/actions/cart";
import { incrementCoursesStudents } from "@/actions/courses";
import { incrementUsersStudents } from "@/actions/instructor";
import { addCoursesToUserCourses } from "@/actions/user";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error(
        "STRIPE_WEBHOOK_SECRET is not set as an environment variable."
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Retrieve full session with expanded line items
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items"],
        }
      );

      const metadata = sessionWithLineItems?.metadata;

      if (
        !metadata?.userId ||
        !metadata?.coursesIds ||
        !metadata?.coursesPublishersIds
      ) {
        return new Response("Invalid metadata", { status: 400 });
      }

      const userId: string = metadata.userId;
      const coursesIds: string[] = JSON.parse(metadata.coursesIds);
      const coursesPublishersIds: string[] = JSON.parse(
        metadata.coursesPublishersIds
      );

      await addCoursesToUserCourses(coursesIds, userId);

      await removeFromCart(coursesIds, userId);

      await incrementUsersStudents(coursesPublishersIds);

      await incrementCoursesStudents(coursesIds);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err, ok: false }, { status: 500 });
  }
}
