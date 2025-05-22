"use server";

import { db } from "@/lib/firebase";
import { TPurchasedCourseData } from "@/types";
import { auth } from "@clerk/nextjs/server";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

async function getLoggedInUserId() {
  const { userId } = await auth();
  return userId;
}

async function addToCart(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Attempted to add to cart for a non-authenticated user.");
  }

  const courseId = formData.get("courseId") as string;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      cart: arrayUnion(courseId),
    });
  } catch (error) {
    console.error("Error adding course:", error);
  }
}

async function removeFromCart(coursesIds: string[]) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error(
      "Attempted to remove from cart for a non-authenticated user."
    );
  }
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      cart: arrayRemove(...coursesIds),
    });

    return { success: true, message: "Course removed successfully" };
  } catch (error) {
    console.error("Error removing course:", error);
    return { success: false, message: "Failed to remove course" };
  }
}

async function fetchUserField(
  field: "cart" | "courses" | "publishedCoursesIds"
): Promise<Record<string, TPurchasedCourseData> | string[]> {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error();
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const item = userSnap.get(field);
      return item || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching field ${field}:`, error);
    return [];
  }
}

async function mergeCoursesWithCart(coursesIds: string[]) {
  if (coursesIds.length === 0) return;

  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("You must be signed in to perform this action.");
  }

  const dbCart = (await fetchUserField("cart")) as string[];
  const uniqueCoursesIds = Array.from(new Set(dbCart.concat(coursesIds)));

  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    cart: uniqueCoursesIds,
  });
}

export {
  addToCart,
  fetchUserField,
  getLoggedInUserId,
  removeFromCart,
  mergeCoursesWithCart,
};
