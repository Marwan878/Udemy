"use client";

import FileInput from "@/components/general/file-input";
import Input from "@/components/general/input";
import RichTextEditor from "@/components/general/rich-text-editor/rich-text-editor";
import Select from "@/components/general/select";
import { CATEGORIES, LANGUAGES, LEVELS } from "@/constants";
import { useCourseManagement } from "@/contexts/course-management";
import { TLevel } from "@/types";
import Image from "next/image";
import PageCard from "../page-card";

export default function Page() {
  const { courseData, setCourseData, courseImage, setCourseImage } =
    useCourseManagement();

  return (
    <PageCard heading="Course landing page">
      <p className="text-gray-700 font-semibold max-w-none text-pretty">
        Your course landing page is crucial to your success on Udemy. If it's
        done right, it can also help you gain visibility in search engines like
        Google. As you complete this section, think about creating a compelling
        Course Landing Page that demonstrates why someone would want to enroll
        in your course.
      </p>

      <div className="space-y-8">
        {/* Course Title */}
        <div>
          <label htmlFor="course-title" className="block font-bold mb-2">
            Course title
          </label>
          <Input
            content={courseData.title}
            setContent={(title) => setCourseData({ ...courseData, title })}
            id="course-title"
            placeholder="The Best HTML5 Course"
            className="w-full"
            limit={60}
            name="title"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your title should be a mix of attention-grabbing, informative, and
            optimized for search
          </p>
        </div>

        {/* Course Subtitle */}
        <div>
          <label htmlFor="course-subtitle" className="block font-bold mb-2">
            Course subtitle
          </label>
          <Input
            content={courseData.leadHeadline}
            setContent={(leadHeadline) =>
              setCourseData({ ...courseData, leadHeadline })
            }
            limit={120}
            id="course-subtitle"
            name="leadHeadline"
            placeholder="Insert your course subtitle."
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use 1 or 2 related keywords, and mention 3-4 of the most important
            areas that you've covered during your course.
          </p>
        </div>

        {/* Course Description */}
        <div>
          <label htmlFor="course-description" className="block font-bold mb-2">
            Course description
          </label>
          <RichTextEditor
            id="course-description"
            value={courseData.description}
            onChange={(newContent) =>
              setCourseData({ ...courseData, description: newContent })
            }
          />
        </div>

        {/* Basic Info */}
        <div>
          <h2 className="font-bold mb-4">Basic info</h2>
          <div className="flex flex-wrap gap-y-3 gap-x-3">
            <Select
              name="language"
              className="basis-full"
              options={LANGUAGES}
              value={courseData.language}
              onChange={(e) =>
                setCourseData({ ...courseData, language: e.target.value })
              }
            />
            <Select
              name="level"
              className="basis-full"
              options={[
                ...LEVELS.map((level) => ({
                  displayName: `${level.at(0)?.toUpperCase()}${level.slice(
                    1
                  )} Level`,
                  value: level,
                })),
                { displayName: "All Levels", value: "all" },
              ]}
              value={courseData.skillLevel}
              onChange={(e) =>
                setCourseData((prev) => ({
                  ...prev,
                  skillLevel: e.target.value as TLevel,
                }))
              }
            />

            <Select
              name="category"
              className="basis-full"
              options={CATEGORIES}
              value={courseData.category}
              onChange={(e) =>
                setCourseData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Course Image */}
        <div>
          <label className="block font-bold mb-4">Course image</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Image
                src={
                  courseImage
                    ? URL.createObjectURL(courseImage)
                    : "/images/course-image-placeholder.webp"
                }
                alt="Your selected course cover image"
                width={750}
                height={422}
                className="object-cover max-w-full"
              />
            </div>

            <div className="space-y-4">
              <p>
                Upload your course image here. Important guidelines: 750x422
                pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
              </p>

              <FileInput
                selectedFile={courseImage}
                setSelectedFile={setCourseImage}
                fileType="image"
              />
            </div>
          </div>
        </div>
      </div>
    </PageCard>
  );
}
