import { LEVELS } from "@/constants";

type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio: string;
  about: string;
  courses: Record<string, TPurchasedCourseData>;
  publishedCoursesIds: string[];
  cart: string[];
  studentsCount: number;
};

type TCategory = {
  id: string;
  displayName: string;
  coursesIds: string[];
};

type TLevel = (typeof LEVELS)[number];

type TCourse = {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  hasCaptions: boolean;
  isPublished: boolean;
  language: string;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  price: number;
  updatedAt: number;
  skillLevel: TLevel;
  leadHeadline: string;
  whatYouWillLearn: string[];
  requirements: string[];
  whoThisCourseIsFor: string[];
  instructorId?: string;
  instructor?: TUser;
  tag?: TCourseTag;
  meta?: string[];
  modules?: TModule[];
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

type TAppropriatePopoverPosition = "left" | "right" | "top";

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
  TAppropriatePopoverPosition,
};
