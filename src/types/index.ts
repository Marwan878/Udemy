import { LEVELS } from "@/constants";

// type TUser = {
//   id: string;
//   email: string;
//   displayName: string;
//   photoURL: string;
//   role: "student" | "teacher";
//   createdAt: number;
//   updatedAt: number;
//   purchasedCourses: {
//     id: string;
//     progress: number;
//     purchaseDate: number;
//   }[];
//   wishlist: string[];
//   subscriptions: {
//     plan: "pro" | "free" | "business";
//     status: "active" | "canceled" | "trialing";
//     expiresAt: number | null;
//   };
// };

type TInstructor = {
  id: string;
  name: string;
  bio: string;
  about: string;
  imageUrl: string;
  studentsCount: number;
  reviewsCount: number;
  coursesCount: number;
  rating: number;
};

type TBenefit = {
  imageUrl: string;
  heading: string;
  description: string;
  ctaHref?: string;
  ctaText?: string;
  forEnterprise: boolean;
};

type TTopic = {
  parentQueryName: string;
  name: string;
  queryName: string;
  subtopics: TSubtopic[];
};

type TSubtopic = { name: string; queryName: string; learnersCount: number };

type TCategory = {
  id: string;
  displayName: string;
  coursesIds: string[];
  learnersCount: number;
};

type TLevel = (typeof LEVELS)[number];

// Made from UI perspective not database perspective.
type TCourse = {
  imageUrl: string;
  title: string;
  instructor: TInstructor;
  rating: number;
  ratingCount: number;
  price: number;
  tag?: TCourseTag;
  updatedAt?: number;
  category: TCategory;
  skillLevel: TLevel;
  leadHeadline: string;
  features: string[];
  id: string;
  studentsCount: number;
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  whoThisCourseIsFor: string[];
  meta?: string[];
  modules?: TModule[];
  hasCaptions: boolean;
  language: string;
  isPublished: boolean;
};

type TCurriculumItemType = "video";

type TModule = {
  content: TContent[];
  id: string;
  order: number;
  title: string;
};

type TContent = {
  type: TCurriculumItemType;
  url?: string;
  isCompleted: boolean;
  order: number;
  title: string;
  duration: number;
  id: string;
};

type TVideo = {
  duration: number;
  order: number;
  title: string;
  type: "video";
  url: string;
};

type TCourseTag = "Bestseller" | "Hot & New";

type TTestimonial = {
  body: React.ReactNode;
  author: React.ReactNode;
};

type TPurchasedCourseData = {
  userRating: number;
  userReview: string;
  purchasedAt: number;
  purchaseCost: number;
  completedCurriculumItemsIds: string[];
  notes: TNote[];
};

type TNote = {
  lectureNumber: number;
  moduleNumber: number;
  content: string;
  takenAtSecond: number;
  moduleName: string;
  lectureName: string;
  id: string;
};

type TFormats = {
  bold: boolean;
  italic: boolean;
  orderedList: boolean;
  unorderedList: boolean;
  code: boolean;
};

export type {
  TCategory,
  TCourse,
  TCourseTag,
  TTestimonial,
  TTopic,
  TSubtopic,
  TBenefit,
  TPurchasedCourseData,
  TVideo,
  TInstructor,
  TModule,
  TContent,
  TCurriculumItemType,
  TFormats,
  TNote,
};
