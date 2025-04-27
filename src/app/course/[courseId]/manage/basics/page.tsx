"use client";

import { updateCourseData } from "@/actions/courses";
import FileInput from "@/components/general/file-input";
import Input from "@/components/general/input";
import Select from "@/components/general/select";
import { useState } from "react";
import PageCard from "../page-card";
import { CATEGORIES, LANGUAGES, LEVELS } from "@/constants";
import RichTextEditor from "@/components/general/rich-text-editor/rich-text-editor";

export default function Page() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("English");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  //   const [mainTopic, setMainTopic] = useState("");
  const [image, setImage] = useState<File | undefined>();

  return (
    <PageCard heading="Course landing page">
      <p className="text-gray-700 font-semibold max-w-none text-pretty">
        Your course landing page is crucial to your success on Udemy. If it's
        done right, it can also help you gain visibility in search engines like
        Google. As you complete this section, think about creating a compelling
        Course Landing Page that demonstrates why someone would want to enroll
        in your course.
      </p>

      <form className="space-y-8" action={updateCourseData}>
        {/* Course Title */}
        <div>
          <label htmlFor="course-title" className="block font-bold mb-2">
            Course title
          </label>
          <Input
            content={title}
            setContent={setTitle}
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
            content={subtitle}
            setContent={setSubtitle}
            limit={120}
            id="course-subtitle"
            name="subtitle"
            placeholder="Insert your course subtitle."
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1 text-nowrap">
            Use 1 or 2 related keywords, and mention 3-4 of the most important
            areas that you've covered during your course.
          </p>
        </div>

        {/* Course Description */}
        <div>
          <label htmlFor="course-description" className="block font-bold mb-2">
            Course description
          </label>
          {/*<div className="border rounded-md">
          <div className="flex items-center p-2 border-b">
              <Button variant="ghost" height="sm" className="h-8 w-8">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" height="sm" className="h-8 w-8">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" height="sm" className="h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" height="sm" className="h-8 w-8">
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
            <textarea
              id="course-description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Insert your course description."
              className="border-0 rounded-none w-full h-full resize-none p-4"
            />
          </div> */}
          <RichTextEditor />
          <p className="text-xs text-gray-500 mt-1">
            Description should have minimum 200 words.
          </p>
        </div>

        {/* Basic Info */}
        <div>
          <h2 className="font-bold mb-4">Basic info</h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
          <div className="flex flex-wrap gap-y-3">
            <Select
              name="language"
              className="basis-1/2 md:basis-[31%] me-auto lg:basis-1/2 xl:basis-[31%]"
              options={LANGUAGES}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <Select
              name="level"
              className="basis-1/2 md:basis-[31%] lg:basis-1/2 xl:basis-[31%]"
              options={[
                ...LEVELS.map((level) => ({
                  displayName: `${level.at(0)?.toUpperCase()}${level.slice(
                    1
                  )} Level`,
                  value: level,
                })),
                { displayName: "All Levels", value: "all" },
              ]}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />

            <Select
              name="category"
              className="basis-[100%] md:basis-[31%] md:ms-auto lg:basis-[100%] xl:basis-[31%]"
              options={CATEGORIES}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <Select
              name="subcategory"
              className="basis-[100%] md:basis-[31%] md:ms-auto lg:basis-[100%] xl:basis-[31%]"
              options={[{ displayName: "Web Development", value: "web" }]}
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </div>
        </div>

        {/* What is primarily taught */}
        {/* <div>
          <div className="flex items-center gap-2 mb-2">
            <label
              htmlFor="primary-subject"
              className="block text-lg font-medium"
            >
              What is primarily taught in your course?
            </label>
            <div className="rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center text-gray-600">
              i
            </div>
          </div>
          <Input
            content={main}
            setContent={}
            id="primary-subject"
            placeholder="e.g. Landscape Photography"
            className="w-full"
          />
        </div> */}

        {/* Course Image */}
        <div>
          <label className="block font-bold mb-4">Course image</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src="/images/course-image-placeholder.webp" />

            <div className="space-y-4">
              <p>
                Upload your course image here. Important guidelines: 750x422
                pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
              </p>

              <FileInput
                selectedFile={image}
                setSelectedFile={setImage}
                fileType="image"
              />
            </div>
          </div>
        </div>
        <button>submit</button>
      </form>
    </PageCard>
  );
}
