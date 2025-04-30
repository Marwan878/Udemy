"use server";

import { db } from "@/lib/firebase";
import { TNote, TPurchasedCourseData, TUser } from "@/types";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { fetchUserField, getLoggedInUserId } from "../cart";
import {
  fetchCourseLength,
  fetchCourses,
  incrementCourseRatingCount,
  updateCourseAverageRating,
} from "../courses";

async function fetchLearnerCourses() {
  const learnerId = await getLoggedInUserId();

  if (!learnerId) {
    throw new Error("You must be logged in to perform this action.");
  }

  const learnerRef = doc(db, "users", learnerId);
  const learnerSnap = await getDoc(learnerRef);

  if (!learnerSnap.exists()) {
    throw new Error(`User with id: ${learnerId} does not exsist.`);
  }

  const learnerCoursesData: Record<string, TPurchasedCourseData> =
    learnerSnap.get("courses");

  const learnerCoursesIds = Object.keys(learnerCoursesData);
  const learnerCoursesLengths = {};

  for (const id of learnerCoursesIds) {
    const courseLength = await fetchCourseLength(id);

    learnerCoursesLengths[id] = courseLength;
  }

  const learnerCourses = (await fetchCourses(learnerCoursesIds)).map(
    (course) => ({
      ...course,
      length: learnerCoursesLengths[course.id],
      ...learnerCoursesData[course.id],
      userProgress:
        (learnerCoursesData[course.id].completedCurriculumItemsIds.length *
          100) /
        learnerCoursesLengths[course.id],
    })
  );

  return learnerCourses;
}

async function addCoursesToUserCourses(coursesIds: string[], userId: string) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error(`User with id: ${userId} does not exsist.`);
    }

    await updateDoc(userRef, {
      courses: arrayUnion(...coursesIds),
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchUserCourseData(
  courseId: string
): Promise<TPurchasedCourseData> {
  const userId = await getLoggedInUserId();

  if (!userId) {
    throw new Error("Attempted to fetch data for a not logged in user.");
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id: ${userId} does not exsist.`);
  }

  const userCoursesData: Record<string, TPurchasedCourseData> =
    userSnap.get("courses");

  return userCoursesData[courseId];
}

async function fetchUserCoursesData(): Promise<
  Record<string, TPurchasedCourseData>
> {
  try {
    const userId = await getLoggedInUserId();

    if (!userId) {
      throw new Error("Attempted to fetch data for a not logged in user.");
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error(`User with id: ${userId} does not exsist.`);
    }

    const userCoursesData: Record<string, TPurchasedCourseData> =
      userSnap.get("courses");

    return userCoursesData;
  } catch (error) {
    console.error(error);
  }

  return {};
}

async function toggleCurriculumItemCompletion(
  courseId: string,
  curriculumItemId: string
) {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("Attempted to fetch data for a not logged in user.");
  }

  const learnerHasCourseToBeModified = await learnerHasCourse(courseId);
  if (!learnerHasCourseToBeModified) {
    throw new Error("You can't progress in a course you haven't purchased.");
  }

  const userCoursesData = await fetchUserCoursesData();
  const completedCurriculumItemsIds =
    userCoursesData[courseId].completedCurriculumItemsIds;
  let updatedIds = completedCurriculumItemsIds;

  if (completedCurriculumItemsIds.includes(curriculumItemId)) {
    updatedIds = updatedIds.filter((id) => id !== curriculumItemId);
  } else {
    updatedIds.push(curriculumItemId);
  }

  const target = `courses.${courseId}.completedCurriculumItemsIds`;
  await updateDoc(doc(db, "users", userId), {
    [target]: updatedIds,
  });
}

export async function learnerHasCourse(courseId: string) {
  const learnerCourses = await fetchUserField("courses");
  return Object.keys(learnerCourses).includes(courseId);
}

async function fetchUserCart() {
  const user = await getLoggedInUserId();
  if (!user) {
    throw new Error("You must be logged in to perform this action.");
  }

  const coursesIds = (await fetchUserField("cart")) as string[];
  const courses = await fetchCourses(coursesIds);

  return courses;
}

async function rateCourse(rating: number, courseId: string) {
  const courses = (await fetchUserField("courses")) as Record<
    string,
    TPurchasedCourseData
  >;
  const coursesIds = Object.keys(courses);
  if (!coursesIds.includes(courseId)) {
    throw new Error("You can't rate a course you haven't purchased.");
  }

  const userId = await getLoggedInUserId();

  if (!userId) {
    throw new Error("You must be logged in to perform this action.");
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id: ${userId} does not exsist.`);
  }

  if (courses[courseId].userRating === 0) {
    await incrementCourseRatingCount(courseId);
  }

  await updateCourseAverageRating(
    courseId,
    courses[courseId].userRating,
    rating
  );

  const target = `courses.${courseId}.userRating`;
  await updateDoc(userRef, { [target]: rating });
  revalidatePath("/my-courses-learning");
}

async function fetchCourseNotes(courseId: string): Promise<TNote[]> {
  const userCoursesData = await fetchUserField("courses");
  if (!(courseId in userCoursesData)) {
    throw new Error(
      "You can't access notes for a course you haven't purchased."
    );
  }

  const notes = userCoursesData[courseId].notes;
  return notes;
}

async function saveNote(note: TNote, courseId: string) {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("");
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id: ${userId} does not exsist.`);
  }

  const learnerCourses = userSnap.get("courses");
  if (!(courseId in learnerCourses)) {
    throw new Error("You can't save a note for a course you haven't purchased");
  }

  const learnerNotes = learnerCourses[courseId].notes;
  const target = `courses.${courseId}.notes`;
  await updateDoc(userRef, { [target]: [...learnerNotes, note] });
}

async function deleteNote(courseId: string, noteId: string) {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("You must be logged in to perform this action.");
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id: ${userId} does not exist.`);
  }

  const learnerCourses = userSnap.get("courses");
  if (!(courseId in learnerCourses)) {
    throw new Error(
      "You can't delete a note for a course you haven't purchased"
    );
  }

  const learnerNotes = learnerCourses[courseId].notes;
  const updatedNotes = learnerNotes.filter((note: TNote) => note.id !== noteId);

  const target = `courses.${courseId}.notes`;
  await updateDoc(userRef, { [target]: updatedNotes });
}

async function fetchUser() {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("No user logged in.");
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id: ${userId} does not exsist.`);
  }

  return userSnap.data() as TUser;
}

async function updateUserImagePath(newImagePath: string) {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("You must be logged in to perform this action.");
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id: ${userId} does not exist.`);
  }

  const target = "imageUrl";
  await updateDoc(userRef, { [target]: newImagePath });
}

async function updateUserData(formData: FormData) {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("You must be logged in to perform this action.");
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id: ${userId} does not exist.`);
  }

  const formFields = Object.fromEntries(formData.entries());
  const actionIdKey = Object.keys(formFields)[0];
  delete formFields[actionIdKey];

  const dbUserData = userSnap.data() as TUser;

  const updatedUser = { ...dbUserData, ...formFields };
  await updateDoc(userRef, updatedUser);
}

export {
  addCoursesToUserCourses,
  fetchLearnerCourses,
  fetchUserCart,
  fetchUserCourseData,
  fetchUserCoursesData,
  rateCourse,
  toggleCurriculumItemCompletion,
  fetchCourseNotes,
  saveNote,
  deleteNote,
  fetchUser,
  updateUserImagePath,
  updateUserData,
};
