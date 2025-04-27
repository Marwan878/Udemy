"use server";

import { db } from "@/lib/firebase";
import { TCategory, TContent, TCourse, TModule } from "@/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { fetchInstructors } from "../instructor";

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
  }));

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

  return fetchedCourses as TCourse[];
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

  const q = query(
    collection(db, "courses", courseId, "modules"),
    orderBy("order"),
    limit(1)
  );

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
  const q = query(
    collection(db, "courses", courseId, "modules"),
    orderBy("order"),
    limit(100)
  );

  const snapshot = await getDocs(q);
  const modules = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const modulesWithContent = await Promise.all(
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
      const content: TContent[] = contentSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      content.sort((a, b) => a.order - b.order);

      return { ...module, content };
    })
  );

  return modulesWithContent;
}

async function fetchCurriculumItem(
  courseId: string,
  moduleId: string,
  order: number
) {
  if (!courseId || !moduleId || !order) {
    throw new Error(
      "Attempted to fetch a curriculum item with insufficient data."
    );
  }

  const q = query(
    collection(db, "courses", courseId, "modules", moduleId, "content"),
    orderBy("order"),
    limit(1)
  );

  const snapshot = await getDocs(q);

  const curriculumItem = snapshot.docs[0].data();
  return curriculumItem;
}

function updateCourseData(formData) {}

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

async function fetchVideoSource(
  courseId: string,
  moduleId: string,
  order: number
) {
  const curriculumItem = await fetchCurriculumItem(courseId, moduleId, order);
  return curriculumItem.url;
}

export {
  fetchCourses,
  fetchFirstModuleId,
  fetchModule,
  fetchCurriculumItem,
  fetchModulesWithContent,
  fetchCourseName,
  updateCourseData,
  fetchCourseLength,
  fetchCategories,
  fetchVideoSource,
  fetchCategoryCourses,
  incrementCourseRatingCount,
  updateCourseAverageRating,
};
