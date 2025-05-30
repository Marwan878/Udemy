import { db } from "@/lib/firebase";
import { TUser } from "@/types";
import { WebhookEvent } from "@clerk/nextjs/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!SIGNING_SECRET) {
    return NextResponse.json(
      {
        message: "CLERK_WEBHOOK_SECRET not set in environment variables",
        success: false,
      },
      { status: 500 }
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload: WebhookEvent = await req.json();
  // const receivedSecret = req.headers.get("clerk-webhook-secret");
  const body = JSON.stringify(payload);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    const { id, first_name, last_name } = evt.data;
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userData: TUser = {
        about: "",
        bio: "",
        cart: [],
        courses: {},
        publishedCoursesIds: [],
        firstName: first_name ?? "",
        lastName: last_name ?? "",
        id,
        imageUrl: "",
        studentsCount: 0,
      };
      await setDoc(userRef, userData);
    }
  }

  return new Response("Webhook received", { status: 200 });
}
