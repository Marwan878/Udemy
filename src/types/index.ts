import { LEVELS } from "@/constants";

type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio: string;
  about: string;
  courses: TPurchasedCourseData[];
  publishedCoursesIds: string[];
  cart: string[];
  studentsCount: number;
  reviewsCount: number;
  coursesCount: number;
  rating: number;
};

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
  instructor: TUser;
  rating: number;
  ratingCount: number;
  price: number;
  tag?: TCourseTag;
  updatedAt?: number;
  category: string;
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
  title: string;
};

type TContent = {
  type: TCurriculumItemType;
  url?: string;
  isCompleted?: boolean;
  title: string;
  duration: number;
  id: string;
};

type TVideo = {
  duration: number;
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

type TCourseState = "purchased" | "published" | "not_purchased";

export type {
  TCategory,
  TCourse,
  TCourseTag,
  TTestimonial,
  TPurchasedCourseData,
  TVideo,
  TModule,
  TContent,
  TCurriculumItemType,
  TFormats,
  TNote,
  TLevel,
  TUser,
  TCourseState,
};
