import { TCategory, TTestimonial, TBenefit } from "@/types";

const UDEMY_HEADER_CATEGORIES: TCategory[] = [
  {
    title: "Development",
    link: "/courses/development/",
    subcategories: [
      {
        title: "Web Development",
        link: "/courses/development/web-development/",
        subcategories: [
          {
            title: "JavaScript",
            link: "/courses/development/web-development/javascript/",
          },
          {
            title: "React",
            link: "/courses/development/web-development/react/",
          },
          {
            title: "Vue.js",
            link: "/courses/development/web-development/vuejs/",
          },
          {
            title: "Angular",
            link: "/courses/development/web-development/angular/",
          },
          {
            title: "HTML & CSS",
            link: "/courses/development/web-development/html-css/",
          },
        ],
      },
      {
        title: "Mobile Development",
        link: "/courses/development/mobile-development/",
        subcategories: [
          {
            title: "iOS Development",
            link: "/courses/development/mobile-development/ios/",
          },
          {
            title: "Android Development",
            link: "/courses/development/mobile-development/android/",
          },
          {
            title: "Flutter",
            link: "/courses/development/mobile-development/flutter/",
          },
          {
            title: "React Native",
            link: "/courses/development/mobile-development/react-native/",
          },
        ],
      },
      {
        title: "Programming Languages",
        link: "/courses/development/programming-languages/",
        subcategories: [
          {
            title: "Python",
            link: "/courses/development/programming-languages/python/",
          },
          {
            title: "Java",
            link: "/courses/development/programming-languages/java/",
          },
          {
            title: "C++",
            link: "/courses/development/programming-languages/cpp/",
          },
          {
            title: "C#",
            link: "/courses/development/programming-languages/csharp/",
          },
          {
            title: "PHP",
            link: "/courses/development/programming-languages/php/",
          },
        ],
      },
    ],
  },
  {
    title: "Business",
    link: "/courses/business/",
    subcategories: [
      {
        title: "Entrepreneurship",
        link: "/courses/business/entrepreneurship/",
        subcategories: [
          {
            title: "Business Strategy",
            link: "/courses/business/entrepreneurship/business-strategy/",
          },
          {
            title: "Startup",
            link: "/courses/business/entrepreneurship/startup/",
          },
        ],
      },
      {
        title: "Communication",
        link: "/courses/business/communication/",
        subcategories: [
          {
            title: "Public Speaking",
            link: "/courses/business/communication/public-speaking/",
          },
          {
            title: "Presentation Skills",
            link: "/courses/business/communication/presentation-skills/",
          },
        ],
      },
    ],
  },
  {
    title: "IT & Software",
    link: "/courses/it-and-software/",
    subcategories: [
      {
        title: "Network & Security",
        link: "/courses/it-and-software/network-security/",
        subcategories: [
          {
            title: "Cybersecurity",
            link: "/courses/it-and-software/network-security/cybersecurity/",
          },
          {
            title: "Ethical Hacking",
            link: "/courses/it-and-software/network-security/ethical-hacking/",
          },
        ],
      },
      {
        title: "Operating Systems",
        link: "/courses/it-and-software/operating-systems/",
        subcategories: [
          {
            title: "Linux",
            link: "/courses/it-and-software/operating-systems/linux/",
          },
          {
            title: "Windows",
            link: "/courses/it-and-software/operating-systems/windows/",
          },
        ],
      },
    ],
  },
] as const;

const BENEFITS: TBenefit[] = [
  {
    imageUrl: "/images/benefits/1.webp",
    heading: "Hands-on training",
    description:
      "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
    forEnterprise: false,
  },
  {
    imageUrl: "/images/benefits/2.webp",
    heading: "Certification prep",
    description:
      "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
    forEnterprise: false,
    ctaHref: "",
    ctaText: "Explore courses",
  },
  {
    imageUrl: "/images/benefits/3.jpg",
    heading: "Insights and analytics",
    description:
      "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
    forEnterprise: true,
    ctaHref: "",
    ctaText: "Find out more",
  },
  {
    imageUrl: "/images/benefits/4.webp",
    heading: "Customizable content",
    description:
      "Create tailored learning paths for team and organization goals and even host your own content and resources.",
    forEnterprise: true,
    ctaHref: "",
    ctaText: "Find out more",
  },
] as const;

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

const BENEFITS_IMAGES_BASE_URL = "/images/slider-images/benefits";
const BENEFITS_IMAGES_RAW_URLS = [
  "1.webp",
  "2.webp",
  "3.jpg",
  "4.webp",
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
        <img
          src="https://cms-images.udemycdn.com/96883mtakkm8/2PBcNgsQa3SvYWklkiN27r/5b8707cc79c8cae5774d5eb3b88b4001/logo_stackoverflow.svg"
          alt="Stackoverflow logo."
          className="w-44 h-11"
        />
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
      <img
        src={imageUrl}
        alt={`${name} personal image.`}
        className="rounded-full w-[4.8rem] h-[4.8rem]"
      />
      <div className="ms-[0.8rem] text-[1.2rem]">
        <h6 className="text-[#595c73]">{name}</h6>
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

export {
  UDEMY_HEADER_CATEGORIES,
  CART_LOCAL_STORAGE_KEY,
  TESTIMONIALS,
  HERO_IMAGES_BASE_URL,
  HERO_IMAGES_RAW_URLS,
  BENEFITS,
  BENEFITS_IMAGES_BASE_URL,
  BENEFITS_IMAGES_RAW_URLS,
  TABS,
  COURSE_CREATION_REQUIREMENTS,
  COURSE_CREATION_TIPS,
  CATEGORIES,
  LEVELS,
  LANGUAGES,
  COURSE_MANAGEMENT_SIDE_NAV_LINKS,
  RATING_DESCRIPTIONS,
  MIN_LEARNING_OBJECTIVES_COUNT,
  MIN_PREREQUISITES_COUNT,
  MIN_AUDIENCE_DESCRIPTION_COUNT,
  MIN_FEATURES_COUNT,
  LEARNING_OBJECTIVES_PLACEHOLDERS,
  COURSE_CREATION_STEPS_COUNT,
  PROFILE_TABS,
};
