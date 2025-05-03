"use client";

import { Button } from "@/components/general";
import DragDropList from "@/components/general/drag-drop-list";
import Input from "@/components/general/input";
import {
  LEARNING_OBJECTIVES_PLACEHOLDERS,
  MIN_AUDIENCE_DESCRIPTION_COUNT,
  MIN_LEARNING_OBJECTIVES_COUNT,
  MIN_PREREQUISITES_COUNT,
} from "@/constants";
import { useCourseManagement } from "@/contexts/course-management";
import { cn } from "@/lib/utils";
import { Menu, PlusCircle, Trash2 } from "lucide-react";
import PageCard from "../page-card";
import { TCourse } from "@/types";

export default function Page() {
  const { courseData, setCourseData } = useCourseManagement();

  function canAdd(resource: string[]) {
    return resource.every((item) => item.length > 0);
  }

  function handleDeleteData(
    itemIndex: number,
    minimum: number,
    itemName: keyof Pick<
      TCourse,
      "whatYouWillLearn" | "requirements" | "whoThisCourseIsFor"
    >
  ) {
    if (courseData[itemName].length <= minimum) {
      return;
    }

    setCourseData((prev) => ({
      ...prev,
      [itemName]: prev[itemName].toSpliced(itemIndex, 1),
    }));
  }

  return (
    <PageCard heading="Intended learners">
      <p className="text-gray-700 mb-8 font-semibold max-w-none text-pretty">
        The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
        These descriptions will help learners decide if your course is right for
        them.
      </p>

      {/* What will students learn in your course? */}
      <section>
        <div className="mb-8">
          <h2 className="font-bold mb-2">
            What will students learn in your course?
          </h2>
          <p className="mb-4">
            You must enter at least {MIN_LEARNING_OBJECTIVES_COUNT} learning
            objectives or outcomes that learners can expect to achieve after
            completing your course.
          </p>

          <DragDropList
            className="space-y-3 w-full"
            items={courseData.whatYouWillLearn}
            onReorder={(newItems) =>
              setCourseData((prev) => ({
                ...prev,
                whatYouWillLearn: newItems,
              }))
            }
          >
            {courseData.whatYouWillLearn.map((objective, i) => (
              <DragDropList.Item index={i} key={i} className="flex group">
                <Input
                  content={objective}
                  setContent={(content) =>
                    setCourseData((prev) => ({
                      ...prev,
                      whatYouWillLearn: prev.whatYouWillLearn
                        .slice(0, i)
                        .concat(content)
                        .concat(prev.whatYouWillLearn.slice(i + 1)),
                    }))
                  }
                  placeholder={`Example: ${LEARNING_OBJECTIVES_PLACEHOLDERS.at(
                    i % LEARNING_OBJECTIVES_PLACEHOLDERS.length
                  )}`}
                  limit={160}
                  className="me-2 flex-1"
                />
                <Button
                  variant="secondary"
                  disabled={
                    courseData.whatYouWillLearn.length <=
                    MIN_LEARNING_OBJECTIVES_COUNT
                  }
                  className={cn(
                    "min-w-0 h-10 aspect-square me-1 invisible disabled:cursor-not-allowed",
                    { "group-hover:visible ": objective !== "" }
                  )}
                  onClick={() =>
                    handleDeleteData(
                      i,
                      MIN_LEARNING_OBJECTIVES_COUNT,
                      "whatYouWillLearn"
                    )
                  }
                  aria-label="Delete objective"
                >
                  <Trash2 aria-hidden />
                </Button>
                <Button
                  variant="secondary"
                  className={cn(
                    "min-w-0 h-10 aspect-square cursor-move invisible",
                    {
                      "group-hover:visible": objective !== "",
                    }
                  )}
                  aria-label="Reorder objective"
                >
                  <Menu aria-hidden />
                </Button>
              </DragDropList.Item>
            ))}
          </DragDropList>

          {canAdd(courseData.whatYouWillLearn) && (
            <Button
              variant="ghost"
              className="mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 pl-2"
              onClick={() =>
                setCourseData((prev) => ({
                  ...prev,
                  whatYouWillLearn: [...prev.whatYouWillLearn, ""],
                }))
              }
            >
              <PlusCircle className="h-5 w-5 mr-2" aria-hidden />
              Add more to your response
            </Button>
          )}
        </div>
      </section>

      {/* Prerequisites */}
      <section>
        <div className="mb-8">
          <h2 className="font-bold mb-2">
            What are the requirements or prerequisites for taking your course?
          </h2>
          <p className="mb-4">
            List the required skills, experience, tools or equipment learners
            should have prior to taking your course. If there are no
            requirements, use this space as an opportunity to lower the barrier
            for beginners.
          </p>

          <DragDropList
            className="space-y-3 w-full"
            items={courseData.requirements}
            onReorder={(newItems) =>
              setCourseData((prev) => ({
                ...prev,
                requirements: newItems,
              }))
            }
            itemsAreDraggable={
              courseData.requirements.length > MIN_PREREQUISITES_COUNT
            }
          >
            {courseData.requirements.map((prerequisite, i) => (
              <DragDropList.Item index={i} key={i} className="flex group">
                <Input
                  content={prerequisite}
                  setContent={(content) =>
                    setCourseData((prev) => ({
                      ...prev,
                      requirements: prev.requirements
                        .slice(0, i)
                        .concat(content)
                        .concat(prev.requirements.slice(i + 1)),
                    }))
                  }
                  placeholder="Example: No programming experience needed. You will learn everything you need to know"
                  className="w-full"
                />
                {courseData.requirements.length > MIN_PREREQUISITES_COUNT && (
                  <>
                    <Button
                      variant="secondary"
                      disabled={
                        courseData.requirements.length <=
                        MIN_PREREQUISITES_COUNT
                      }
                      className={cn(
                        "min-w-0 h-10 aspect-square me-1 invisible disabled:cursor-not-allowed",
                        { "group-hover:visible ": prerequisite !== "" }
                      )}
                      onClick={() =>
                        handleDeleteData(
                          i,
                          MIN_PREREQUISITES_COUNT,
                          "requirements"
                        )
                      }
                      aria-label="Delete prerequisite"
                    >
                      <Trash2 aria-hidden />
                    </Button>
                    <Button
                      variant="secondary"
                      className={cn(
                        "min-w-0 h-10 aspect-square cursor-move invisible",
                        {
                          "group-hover:visible": prerequisite !== "",
                        }
                      )}
                      aria-label="Reorder prerequisite"
                    >
                      <Menu aria-hidden />
                    </Button>
                  </>
                )}
              </DragDropList.Item>
            ))}
          </DragDropList>

          {canAdd(courseData.requirements) && (
            <Button
              variant="ghost"
              className="mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 pl-2"
              onClick={() =>
                setCourseData((prev) => ({
                  ...prev,
                  requirements: [...prev.requirements, ""],
                }))
              }
            >
              <PlusCircle className="h-5 w-5 mr-2" aria-hidden />
              Add more to your response
            </Button>
          )}
        </div>
      </section>

      {/* Target learners */}
      <section>
        <div className="mb-8">
          <h2 className="font-bold mb-2">Who is this course for?</h2>
          <p className="mb-4">
            Write a clear description of the intended learners for your course
            who will find your course content valuable. This will help you
            attract the right learners to your course.
          </p>

          <DragDropList
            className="space-y-3 w-full"
            items={courseData.whoThisCourseIsFor}
            onReorder={(newItems) =>
              setCourseData((prev) => ({
                ...prev,
                whoThisCourseIsFor: newItems,
              }))
            }
            itemsAreDraggable={
              courseData.whoThisCourseIsFor.length >
              MIN_AUDIENCE_DESCRIPTION_COUNT
            }
          >
            {courseData.whoThisCourseIsFor.map((audience, i) => (
              <DragDropList.Item index={i} key={i} className="flex group">
                <Input
                  key={i}
                  content={audience}
                  setContent={(content) =>
                    setCourseData((prev) => ({
                      ...prev,
                      whoThisCourseIsFor: prev.whoThisCourseIsFor
                        .slice(0, i)
                        .concat(content)
                        .concat(prev.whoThisCourseIsFor.slice(i + 1)),
                    }))
                  }
                  placeholder="Example: No programming experience needed. You will learn everything you need to know"
                  className="w-full"
                />
                {courseData.whoThisCourseIsFor.length >
                  MIN_AUDIENCE_DESCRIPTION_COUNT && (
                  <>
                    <Button
                      variant="secondary"
                      disabled={
                        courseData.whoThisCourseIsFor.length <=
                        MIN_AUDIENCE_DESCRIPTION_COUNT
                      }
                      className={cn(
                        "min-w-0 h-10 aspect-square me-1 invisible disabled:cursor-not-allowed",
                        { "group-hover:visible ": audience !== "" }
                      )}
                      onClick={() =>
                        handleDeleteData(
                          i,
                          MIN_AUDIENCE_DESCRIPTION_COUNT,
                          "whoThisCourseIsFor"
                        )
                      }
                      aria-label="Delete Audience"
                    >
                      <Trash2 aria-hidden />
                    </Button>
                    <Button
                      variant="secondary"
                      className={cn(
                        "min-w-0 h-10 aspect-square cursor-move invisible",
                        {
                          "group-hover:visible": audience !== "",
                        }
                      )}
                      aria-label="Reorder Audience"
                    >
                      <Menu aria-hidden />
                    </Button>
                  </>
                )}
              </DragDropList.Item>
            ))}
          </DragDropList>

          {canAdd(courseData.whoThisCourseIsFor) && (
            <Button
              variant="ghost"
              className="mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 pl-2"
              onClick={() =>
                setCourseData((prev) => ({
                  ...prev,
                  whoThisCourseIsFor: [...prev.whoThisCourseIsFor, ""],
                }))
              }
            >
              <PlusCircle className="h-5 w-5 mr-2" aria-hidden />
              Add more to your response
            </Button>
          )}
        </div>
      </section>
    </PageCard>
  );
}
