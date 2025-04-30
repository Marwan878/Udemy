"use server";

import { db } from "@/lib/firebase";
import { TUser } from "@/types";
import { query, collection, where, getDocs } from "firebase/firestore";
import { fetchUserField, getLoggedInUserId } from "../cart";
import { fetchCourses } from "../courses";

async function fetchInstructors(instructorsIds: string[]): Promise<TUser[]> {
  if (instructorsIds.length === 0) return [];
  const instructorsQuery = query(
    collection(db, "users"),
    where("__name__", "in", instructorsIds)
  );
  const snapshot = await getDocs(instructorsQuery);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TUser[];
}

async function fetchInstructorCourses() {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("You need to be logged in to perform this action.");
  }

  const intstructorCoursesIds = (await fetchUserField(
    "publishedCoursesIds"
  )) as string[];

  const instructorCourses = await fetchCourses(intstructorCoursesIds);

  return instructorCourses;
}

export { fetchInstructors, fetchInstructorCourses };
