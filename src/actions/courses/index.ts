"use server";

import { db } from "@/lib/firebase";
import { TCategory, TContent, TCourse, TModule, TUser } from "@/types";
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
  writeBatch,
} from "firebase/firestore";
import { getLoggedInUserId } from "../cart";
import { fetchInstructors } from "../instructor";

async function fetchCourses(
  coursesIds: string[]
): Promise<(TCourse & { instructor: TUser })[]> {
  if (coursesIds.length === 0) return [];

  const coursesQuery = query(
    collection(db, "courses"),
    where("__name__", "in", coursesIds)
  );
  const snapshot = await getDocs(coursesQuery);

  const fetchedCourses: TCourse[] = snapshot.docs.map((doc) => ({
    ...(doc.data() as TCourse),
  }));

  // Get unique instructors ids
  const instructorsIds = Array.from(
    new Set(fetchedCourses.map((course) => course.instructorId))
  ) as string[];

  const instructors = await fetchInstructors(instructorsIds);
  const instructorsHashMap = new Map(
    instructors.map((instructor) => [instructor.id, instructor])
  );

  const courses = fetchedCourses.map((course) => {
    if (!course?.instructorId) {
      throw new Error("Encountered a course without instructorId.");
    }

    const instructor = instructorsHashMap.get(course.instructorId);
    if (!instructor) {
      throw new Error("Did not find an instructor for a course.");
    }

    const courseWithoutInstructorNorInstructorId = course;
    delete courseWithoutInstructorNorInstructorId.instructorId;

    const preparedCourse: TCourse & { instructor: TUser } = {
      ...courseWithoutInstructorNorInstructorId,
      instructor,
    };

    return preparedCourse;
  });

  return courses;
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
  const modules = snapshot.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .reverse();

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
      const content = contentSnap.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .reverse() as TContent[];

      return { ...module, content };
    })
  )) as TModule[];

  return modulesWithContent;
}

async function fetchCurriculumItem(
  courseId: string,
  curriculumItemId: string
): Promise<void | TContent> {
  const modules = await fetchModulesWithContent(courseId);

  for (const _module of modules) {
    const searchResult = _module.content.find(
      (curriculumItem) => curriculumItem.id === curriculumItemId
    );

    if (searchResult !== undefined) {
      return searchResult;
    }
  }

  throw new Error(
    `Curriculum item with ID: ${curriculumItemId} and courseId: ${courseId} does not exist`
  );
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
  const courses = await fetchCourses(coursesIds);

  return courses;
}

async function incrementCourseRatingCount(courseId: string) {
  const courseRef = doc(db, "courses", courseId);

  await updateDoc(courseRef, { ratingCount: increment(1) });
}

async function addNewRating(courseId: string, rating: number) {
  const courseRef = doc(db, "courses", courseId);
  const courseSnap = await getDoc(courseRef);
  if (!courseSnap.exists()) {
    throw new Error(`Course with id ${courseId} does not exist.`);
  }

  const ratingCount = courseSnap.data().ratingCount;
  const averageRating = courseSnap.data().rating;
  const newTotalRating = averageRating * ratingCount + rating;

  const finalRating = parseFloat(
    (newTotalRating / (ratingCount + 1)).toFixed(1)
  );

  await updateDoc(courseRef, {
    rating: finalRating,
    ratingCount: ratingCount + 1,
  });
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

  const finalRating = parseFloat((newTotalRating / ratingCount).toFixed(1));

  await updateDoc(courseRef, {
    rating: finalRating,
  });
}

async function fetchVideoSource(courseId: string, curriculumItemId: string) {
  const curriculumItem = await fetchCurriculumItem(courseId, curriculumItemId);
  return curriculumItem?.url;
}

async function upsertCourseDataAndModules(
  courseData: TCourse,
  modules: TModule[]
) {
  // Update the main course document
  const courseRef = doc(db, "courses", courseData.id);
  // The course in the database just has the instructor ID
  delete courseData.instructor;
  await updateDoc(courseRef, courseData);

  // Upsert each module and its content
  for (const _module of modules) {
    const moduleRef = doc(db, "courses", courseData.id, "modules", _module.id);
    const moduleSnap = await getDoc(moduleRef);
    const moduleData = {
      id: _module.id,
      title: _module.title,
    };
    // Upsert the module
    if (moduleSnap.exists()) {
      await updateDoc(moduleRef, moduleData);
    } else {
      await setDoc(moduleRef, moduleData);
    }

    // Upsert each content item in the module
    for (const contentItem of _module.content) {
      const contentRef = doc(
        db,
        "courses",
        courseData.id,
        "modules",
        _module.id,
        "content",
        contentItem.id
      );

      const contentSnap = await getDoc(contentRef);

      if (contentSnap.exists()) {
        await updateDoc(contentRef, contentItem);
      } else {
        await setDoc(contentRef, contentItem);
      }
    }
  }
}

async function searchCourses(
  query: string
): Promise<(TCourse & { instructor: TUser })[]> {
  const coursesRef = collection(db, "courses");
  const snapshot = await getDocs(coursesRef);

  const courses = snapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as (TCourse & { instructorId: string })[];

  const instructorsIds = courses.map((course) => course.instructorId);
  const instructors = await fetchInstructors(instructorsIds);

  const coursesWithInstructors: (TCourse & { instructor: TUser })[] =
    courses.map((course, i) => ({ ...course, instructor: instructors[i] }));

  return coursesWithInstructors.filter((course) =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );
}

async function createCourse(title: string, category: string): Promise<string> {
  const userId = await getLoggedInUserId();
  if (!userId) {
    throw new Error("You need to be logged in to perform this action.");
  }

  const newCourseId = crypto.randomUUID();
  const newCourse: Omit<TCourse, "instructor"> & {
    instructorId: string;
  } = {
    category,
    description: "",
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
    price: 0,
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

async function incrementCoursesStudents(coursesIds: string[]) {
  const coursesRef = collection(db, "courses");
  const coursesQuery = query(coursesRef, where("__name__", "in", coursesIds));
  const snapshot = await getDocs(coursesQuery);

  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => {
    const courseData = doc.data();
    batch.update(doc.ref, {
      studentsCount: courseData.studentsCount + 1,
    });
  });
  await batch.commit();
}

export {
  addCourseToAppropriateCategory,
  addCourseToPublishedCourses,
  createCourse,
  fetchCategories,
  fetchCategoryCourses,
  fetchCourseLength,
  fetchCourseName,
  fetchCourses,
  fetchCurriculumItem,
  fetchModule,
  fetchModulesWithContent,
  fetchVideoSource,
  incrementCourseRatingCount,
  searchCourses,
  updateCourseAverageRating,
  addNewRating,
  upsertCourseDataAndModules,
  incrementCoursesStudents,
};
