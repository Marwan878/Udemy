"use server";

import { db } from "@/lib/firebase";
import { TCategory, TContent, TCourse, TModule } from "@/types";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { fetchInstructors } from "../instructor";
import { getLoggedInUserId } from "../cart";

async function fetchCourses(coursesIds: string[]): Promise<TCourse[]> {
  if (coursesIds.length === 0) return [];

  const coursesQuery = query(
    collection(db, "courses"),
    where("__name__", "in", coursesIds)
  );
  const snapshot = await getDocs(coursesQuery);

  const fetchedCourses = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Omit<TCourse, "instructor"> & { instructorId: string }[];

  // Get unique instructors ids
  const instructorsIds = Array.from(
    new Set(fetchedCourses.map((course) => course.instructorId))
  );

  const instructors = await fetchInstructors(instructorsIds);
  // map each instructor to their course
  fetchedCourses.forEach((course) => {
    for (const instructor of instructors) {
      if (instructor.id === course.instructorId) {
        delete course.instructorId;
        course.instructor = instructor;
        break;
      }
    }
  });

  return fetchedCourses;
}

async function fetchCourseName(courseId: string): Promise<string> {
  if (!courseId) {
    throw new Error(
      "Attempted to fetch a curriculum item id with an empty courseId."
    );
  }

  const courseRef = doc(db, "courses", courseId);
  const courseSnap = await getDoc(courseRef);

  if (!courseSnap.exists()) {
    throw new Error(`Course with id ${courseId} does not exist.`);
  }

  return courseSnap.data().title;
}

async function fetchFirstModuleId(courseId: string) {
  if (!courseId) {
    throw new Error(
      "Attempted to fetch a curriculum item id with an empty courseId."
    );
  }

  const courseRef = doc(db, "courses", courseId);
  const courseSnap = await getDoc(courseRef);

  if (!courseSnap.exists()) {
    throw new Error(`Course with id ${courseId} does not exist.`);
  }

  const q = query(collection(db, "courses", courseId, "modules"));

  const snapshot = await getDocs(q);

  const firstModuleId = snapshot.docs[0].id;

  return firstModuleId;
}

async function fetchModule(courseId: string, moduleId: string) {
  if (!moduleId || !courseId) {
    throw new Error(
      "Attempted to fetch a module with an empty moduleId or an empty courseId."
    );
  }

  const moduleRef = doc(db, "courses", courseId, "modules", moduleId);
  const moduleSnap = await getDoc(moduleRef);

  if (!moduleSnap.exists()) {
    throw new Error(
      `Module with id ${moduleId} and courseId ${courseId} does not exist.`
    );
  }

  return moduleSnap.data();
}

async function fetchModulesWithContent(courseId: string): Promise<TModule[]> {
  if (!courseId) {
    throw new Error("Attempted to fetch modules with an empty courseId.");
  }
  const q = query(collection(db, "courses", courseId, "modules"));

  const snapshot = await getDocs(q);
  const modules = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const modulesWithContent = (await Promise.all(
    modules.map(async (module) => {
      const contentRef = collection(
        db,
        "courses",
        courseId,
        "modules",
        module.id,
        "content"
      );
      const contentSnap = await getDocs(contentRef);
      const content = contentSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TContent[];

      return { ...module, content };
    })
  )) as TModule[];

  return modulesWithContent;
}

async function fetchCurriculumItem(courseId: string, moduleId: string) {
  if (!courseId || !moduleId) {
    throw new Error(
      "Attempted to fetch a curriculum item with insufficient data."
    );
  }

  const q = query(
    collection(db, "courses", courseId, "modules", moduleId, "content")
  );

  const snapshot = await getDocs(q);

  const curriculumItem = snapshot.docs[0].data();
  return curriculumItem;
}

async function fetchCourseLength(courseId: string) {
  try {
    const modulesRef = collection(db, "courses", courseId, "modules");
    const modulesSnapshot = await getDocs(modulesRef);

    let totalCount = 0;

    for (const moduleDoc of modulesSnapshot.docs) {
      const contentRef = collection(
        db,
        "courses",
        courseId,
        "modules",
        moduleDoc.id,
        "content"
      );
      const contentSnapshot = await getDocs(contentRef);
      totalCount += contentSnapshot.size;
    }

    return totalCount;
  } catch (error) {
    console.error("Error counting content documents:", error);
    return 0;
  }
}

async function fetchCategories(): Promise<TCategory[]> {
  const categroiesRef = collection(db, "categories");
  const snapshot = await getDocs(categroiesRef);
  const categories = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as TCategory[];
  return categories;
}

async function fetchCategoryCourses(categoryId: string): Promise<TCourse[]> {
  const categoryRef = doc(db, "categories", categoryId);
  const categorySnap = await getDoc(categoryRef);
  if (!categorySnap.exists()) {
    throw new Error(`Category with id ${categoryId} does not exist.`);
  }

  const coursesIds = categorySnap.data().coursesIds;
  console.log(coursesIds);
  const courses = await fetchCourses(coursesIds);

  return courses;
}

async function incrementCourseRatingCount(courseId: string) {
  const courseRef = doc(db, "courses", courseId);

  await updateDoc(courseRef, { ratingCount: increment(1) });
}

async function updateCourseAverageRating(
  courseId: string,
  oldRating: number,
  newRating: number
) {
  const courseRef = doc(db, "courses", courseId);
  const courseSnap = await getDoc(courseRef);
  if (!courseSnap.exists()) {
    throw new Error(`Course with id ${courseId} does not exist.`);
  }

  const ratingCount = courseSnap.data().ratingCount;
  const averageRating = courseSnap.data().rating;
  const newTotalRating = averageRating * ratingCount + newRating - oldRating;

  // We don't increment ratingCount as this function is meant to be used after ratingCount increment
  // if we are handling a new rating
  const finalRating = parseFloat((newTotalRating / ratingCount).toFixed(1));

  await updateDoc(courseRef, {
    rating: finalRating,
  });
}

async function fetchVideoSource(courseId: string, moduleId: string) {
  const curriculumItem = await fetchCurriculumItem(courseId, moduleId);
  return curriculumItem.url;
}

async function upsertCourseDataAndModules(
  courseData: TCourse,
  modules: TModule[]
) {
  // Update the main course document
  const courseRef = doc(db, "courses", courseData.id);
  await updateDoc(courseRef, {
    ...courseData,
  });

  // Upsert each module and its content
  for (const module of modules) {
    const moduleRef = doc(db, "courses", courseData.id, "modules", module.id);
    await updateDoc(moduleRef, {
      id: module.id,
      title: module.title,
    });

    // Upsert each content item in the module
    for (const contentItem of module.content) {
      const contentRef = doc(
        db,
        "courses",
        courseData.id,
        "modules",
        module.id,
        "content",
        contentItem.id
      );
      await updateDoc(contentRef, {
        ...contentItem,
      });
    }
  }
}

async function searchCourses(query: string): Promise<TCourse[]> {
  const coursesRef = collection(db, "courses");
  const snapshot = await getDocs(coursesRef);
  const allCourses = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as TCourse[];

  return allCourses.filter((course) =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );
}

async function createCourse(title: string, category: string): Promise<string> {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("You need to be logged in to perform this action.");
  }

  const newCourseId = crypto.randomUUID();
  const newCourse: Omit<TCourse, "instructor" | "price"> & {
    instructorId: string;
  } = {
    category,
    description: "",
    features: [],
    hasCaptions: false,
    id: newCourseId,
    imageUrl: "",
    instructorId: userId,
    isPublished: false,
    language: "English",
    leadHeadline: "",
    rating: 0,
    ratingCount: 0,
    requirements: [],
    skillLevel: "beginner",
    studentsCount: 0,
    title,
    whatYouWillLearn: [],
    whoThisCourseIsFor: [],
    updatedAt: new Date().getTime(),
  };

  const courseRef = doc(db, "courses", newCourse.id);
  await setDoc(courseRef, newCourse);

  return newCourseId;
}

async function addCourseToAppropriateCategory(
  courseId: string,
  categoryId: string
) {
  const categoryRef = doc(db, "categories", categoryId);
  const categorySnap = await getDoc(categoryRef);
  if (!categorySnap.exists()) {
    throw new Error(`Category with id ${categoryId} does not exist.`);
  }

  await updateDoc(categoryRef, {
    coursesIds: arrayUnion(courseId),
  });
}

async function addCourseToPublishedCourses(courseId: string) {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("You need to be logged in to perform this action.");
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id ${userId} does not exist.`);
  }

  await updateDoc(userRef, {
    publishedCoursesIds: arrayUnion(courseId),
  });
}

export {
  fetchCourses,
  fetchFirstModuleId,
  fetchModule,
  fetchCurriculumItem,
  fetchModulesWithContent,
  fetchCourseName,
  fetchCourseLength,
  fetchCategories,
  fetchVideoSource,
  fetchCategoryCourses,
  incrementCourseRatingCount,
  updateCourseAverageRating,
  upsertCourseDataAndModules,
  searchCourses,
  createCourse,
  addCourseToAppropriateCategory,
  addCourseToPublishedCourses,
};
