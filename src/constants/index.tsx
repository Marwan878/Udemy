import { TTestimonial } from "@/types";
import Image from "next/image";

const CATEGORIES = [
  {
    displayName: "Microsoft Excel",
    value: "msexcel",
  },
  {
    displayName: "C++",
    value: "c++",
  },
  {
    displayName: "HTML",
    value: "html",
  },
] as const;

const HERO_IMAGES_BASE_URL = "/images/slider-images/hero";
const HERO_IMAGES_RAW_URLS = [
  "slider-image-1.jpg",
  "slider-image-2.jpg",
] as const;

const CART_LOCAL_STORAGE_KEY = "cart";

const TESTIMONIALS: TTestimonial[] = [
  {
    body: (
      <>
        Udemy was rated the{" "}
        <b>most popular online course or certification program</b>
        for learning how to code according to{" "}
        <a href="">StackOverflow’s 2023 Developer survey</a>.
      </>
    ),
    author: (
      <div className="flex flex-col gap-y-3">
        <div className="w-44 h-12 relative">
          <Image
            src="https://cms-images.udemycdn.com/96883mtakkm8/2PBcNgsQa3SvYWklkiN27r/5b8707cc79c8cae5774d5eb3b88b4001/logo_stackoverflow.svg"
            alt="Stackoverflow logo."
            fill
          />
        </div>
        <p className="text-[#9194ac]">37,076 responses collected</p>
      </div>
    ),
  },
  {
    body: (
      <>
        Udemy was truly <b>a game-changer and a great guide</b> for me as we
        brought Dimensional to life.
      </>
    ),
    author: (
      <TestimonialAuthor
        imageUrl="https://cms-images.udemycdn.com/96883mtakkm8/1Djz6c0gZLaCG5SQS3PgUY/54b6fb8c85d8da01da95cbb94fa6335f/Alvin_Lim.jpeg"
        name="Alvin Lim"
        role="Technical Co-Founder, CTO at Dimensional"
      />
    ),
  },
  {
    body: (
      <>
        Udemy gives you the ability to be persistent. I learned exactly what I
        needed to know in the real world. It helped me sell myself to{" "}
        <b>get a new role.</b>
      </>
    ),
    author: (
      <TestimonialAuthor
        imageUrl="https://cms-images.udemycdn.com/96883mtakkm8/6dT7xusLHYoOUizXeVqgUk/4317f63fe25b2e07ad8c70cda641014b/William_A_Wachlin.jpeg"
        name="William A. Wachlin"
        role="Partner Account Manager at Amazon Web Services"
      />
    ),
  },
  {
    body: (
      <>
        With Udemy Business employees were able to marry the two together,
        technology and consultant soft skills... to help{" "}
        <b>drive their careers forward.</b>
      </>
    ),
    author: (
      <TestimonialAuthor
        imageUrl="https://cms-images.udemycdn.com/96883mtakkm8/4w9dYD4F64ibQwsaAB01Z4/c4610e9b1ac65589d8b1374ad10714e2/Ian_Stevens.png"
        name="Ian Stevens"
        role="Head of Capability Development, North America at Publicis Sapient"
      />
    ),
  },
] as const;

export function TestimonialAuthor({
  name,
  role,
  imageUrl,
}: {
  name: string;
  role: string;
  imageUrl: string;
}) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative rounded-full w-[4.8rem] h-[4.8rem]">
        <Image
          src={imageUrl}
          alt={`${name} personal image.`}
          fill
          className="object-cover"
        />
      </div>

      <div className="ms-[0.8rem] text-[1.2rem]">
        <div className="text-[#595c73]">{name}</div>
        <p className="font-normal text-[#9194AC]">{role}</p>
      </div>
    </div>
  );
}

const TABS = [
  // {
  //   title: "Course content",
  //   name: "content",
  // },
  {
    title: "Overview",
    name: "overview",
  },
  {
    title: "Notes",
    name: "notes",
  },
  // {
  //   title: "Announcements",
  // },
  // {
  //   title: "Reviews",
  // },
  // {
  //   title: "Learning tools",
  // },
] as const;

const COURSE_CREATION_TIPS = [
  {
    title: "Start with your goals",
    description:
      "Setting goals for what learners will accomplish in your course (also known as learning objectives) at the beginning will help you determine what content to include in your course and how you will teach the content to help your learners achieve the goals.",
  },
  {
    title: "Create an outline",
    description:
      "Decide what skills you’ll teach and how you’ll teach them. Group related lectures into sections. Each section should have at least 3 lectures, and include at least one assignment or practical activity.",
  },
  {
    title: "Introduce yourself and create momentum",
    description:
      "People online want to start learning quickly. Make an introduction section that gives learners something to be excited about in the first 10 minutes.",
  },
  {
    title: "Sections have a clear learning objective",
    description:
      "Introduce each section by describing the section's goal and why it’s important. Give lectures and sections titles that reflect their content and have a logical flow.",
  },
  {
    title: "Lectures cover one concept",
    description:
      "A good lecture length is 2-7 minutes to keep students interested and help them study in short bursts. Cover a single topic in each lecture so learners can easily find and re-watch them later.",
  },
  {
    title: "Mix and match your lecture types",
    description:
      "Alternate between filming yourself, your screen, and slides or other visuals. Showing yourself can help learners feel connected.",
  },
  {
    title: "Practice activities create hands-on learning",
    description:
      "Help learners apply your lessons to their real world with projects, assignments, coding exercises, or worksheets.",
  },
] as const;

const COURSE_CREATION_REQUIREMENTS = [
  "Your course must have at least five lectures",
  "All lectures must add up to at least 30+ minutes of total video",
  "Your course is composed of valuable educational content and free of promotional or distracting materials",
] as const;

const LEVELS = ["beginner", "intermediate", "advanced"] as const;

const LANGUAGES = [
  { displayName: "English", value: "en" },
  { displayName: "Arabic", value: "ar" },
];

const COURSE_MANAGEMENT_SIDE_NAV_LINKS = {
  "Plan your course": [
    { href: "/goals", displayName: "Intended learners" },
    { href: "/course-structure", displayName: "Course structure" },
  ],
  "Create your content": [{ href: "/curriculum", displayName: "Curriculum" }],
  "Publish your course": [
    { href: "/basics", displayName: "Course landing page" },
    { href: "/pricing", displayName: "Pricing" },
  ],
} as const;

const RATING_DESCRIPTIONS = [
  "",
  "Awful, not what I expected at all",
  "Poor, pretty disappointed",
  "Average, could be better",
  "Good, what I expected",
  "Amazing, above expectations!",
] as const;

const MIN_LEARNING_OBJECTIVES_COUNT = 4;
const MIN_PREREQUISITES_COUNT = 1;
const MIN_AUDIENCE_DESCRIPTION_COUNT = 1;
const MIN_FEATURES_COUNT = 1;

const LEARNING_OBJECTIVES_PLACEHOLDERS = [
  "Define the roles and responsibilities of a project manager",
  "Estimate project timelines and budgets",
  "Identify and manage project risks",
  "Complete a case study to manage a project from conception to completion",
] as const;

const COURSE_CREATION_STEPS_COUNT = 2;

const PROFILE_TABS = [
  { name: "Udemy profile", url: "/instructor/profile/basic-information" },
  { name: "Profile picture", url: "/instructor/profile/photo" },
] as const;

const UDEMY_BUISNESS_USERS_IMAGES_URLS = [
  "/images/companies/nasdaq.svg",
  "/images/companies/volkswagen.svg",
  "/images/companies/box.svg",
  "/images/companies/netapp.svg",
  "/images/companies/eventbrite.svg",
] as const;

const COMPANIES_LOGOS = [
  "/images/companies/cisco.svg",
  "/images/companies/citi.svg",
  "/images/companies/epricsson.svg",
  "/images/companies/hewlett-packard-enterprise.svg",
  "/images/companies/p&g.svg",
  "/images/companies/samsung.svg",
  "/images/companies/vimeo.svg",
  "/images/companies/volkswagen.svg",
] as const;

//w-[34rem]
const COURSE_POPOVER_WIDTH_IN_REM = 34;
const ROOT_FONT_SIZE = 10;
const COURSE_POPOVER_WIDTH_IN_PX = COURSE_POPOVER_WIDTH_IN_REM * ROOT_FONT_SIZE;

export {
  CART_LOCAL_STORAGE_KEY,
  CATEGORIES,
  COURSE_CREATION_REQUIREMENTS,
  COURSE_CREATION_STEPS_COUNT,
  COURSE_CREATION_TIPS,
  COURSE_MANAGEMENT_SIDE_NAV_LINKS,
  HERO_IMAGES_BASE_URL,
  HERO_IMAGES_RAW_URLS,
  LANGUAGES,
  LEARNING_OBJECTIVES_PLACEHOLDERS,
  LEVELS,
  MIN_AUDIENCE_DESCRIPTION_COUNT,
  MIN_FEATURES_COUNT,
  MIN_LEARNING_OBJECTIVES_COUNT,
  MIN_PREREQUISITES_COUNT,
  PROFILE_TABS,
  RATING_DESCRIPTIONS,
  TABS,
  TESTIMONIALS,
  UDEMY_BUISNESS_USERS_IMAGES_URLS,
  COMPANIES_LOGOS,
  COURSE_POPOVER_WIDTH_IN_PX,
  COURSE_POPOVER_WIDTH_IN_REM,
};
