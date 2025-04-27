"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import PageCard from "../page-card";
import Input from "@/components/general/input";
import { Button } from "@/components/general";
import { Menu, PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import DragDropList from "@/components/general/drag-drop-list";
import {
  MIN_AUDIENCE_DESCRIPTION_COUNT,
  MIN_LEARNING_OBJECTIVES_COUNT,
  MIN_PREREQUISITES_COUNT,
  LEARNING_OBJECTIVES_PLACEHOLDERS,
} from "@/constants";
import { useCourseManagement } from "@/contexts/course-management";

export default function Page() {
  const [learningObjectives, setLearningObjectives] = useState<string[]>(
    Array.from({ length: MIN_LEARNING_OBJECTIVES_COUNT }, () => "")
  );

  const [prerequisites, setPrerequisites] = useState<string[]>([""]);

  const [targetAudience, setTargetAudience] = useState<string[]>([""]);

  function incrementResource(setState: Dispatch<SetStateAction<string[]>>) {
    setState((prev) => [...prev, ""]);
  }

  function canAdd(resource: string[]) {
    return resource.every((item) => item.length > 0);
  }

  function handleDeleteObjective(objectiveIndex: number) {
    if (learningObjectives.length <= MIN_LEARNING_OBJECTIVES_COUNT) {
      return;
    }

    setLearningObjectives((prev) => prev.toSpliced(objectiveIndex, 1));
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
            items={learningObjectives}
            onReorder={setLearningObjectives}
          >
            {learningObjectives.map((objective, i) => (
              <DragDropList.Item index={i} key={i} className="flex group">
                <Input
                  index={i}
                  content={objective}
                  setContent={setLearningObjectives}
                  placeholder={`Example: ${LEARNING_OBJECTIVES_PLACEHOLDERS.at(
                    i % LEARNING_OBJECTIVES_PLACEHOLDERS.length
                  )}`}
                  limit={160}
                  className="me-2 flex-1"
                />
                <Button
                  variant="secondary"
                  disabled={
                    learningObjectives.length <= MIN_LEARNING_OBJECTIVES_COUNT
                  }
                  className={cn(
                    "min-w-0 h-10 aspect-square me-1 invisible disabled:cursor-not-allowed",
                    { "group-hover:visible ": objective !== "" }
                  )}
                  onClick={() => handleDeleteObjective(i)}
                >
                  <Trash2 />
                </Button>
                <Button
                  variant="secondary"
                  className={cn(
                    "min-w-0 h-10 aspect-square cursor-move invisible",
                    {
                      "group-hover:visible": objective !== "",
                    }
                  )}
                >
                  <Menu />
                </Button>
              </DragDropList.Item>
            ))}
          </DragDropList>

          {canAdd(learningObjectives) && (
            <Button
              variant="ghost"
              className="mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 pl-2"
              onClick={() => incrementResource(setLearningObjectives)}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
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
            items={prerequisites}
            onReorder={setPrerequisites}
            itemsAreDraggable={prerequisites.length > MIN_PREREQUISITES_COUNT}
          >
            {prerequisites.map((prerequisite, i) => (
              <DragDropList.Item index={i} key={i} className="flex group">
                <Input
                  key={i}
                  index={i}
                  content={prerequisite}
                  setContent={setPrerequisites}
                  placeholder="Example: No programming experience needed. You will learn everything you need to know"
                  className="w-full"
                />
                {prerequisites.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      disabled={prerequisites.length <= MIN_PREREQUISITES_COUNT}
                      className={cn(
                        "min-w-0 h-10 aspect-square me-1 invisible disabled:cursor-not-allowed",
                        { "group-hover:visible ": prerequisite !== "" }
                      )}
                      onClick={() => handleDeleteObjective(i)}
                    >
                      <Trash2 />
                    </Button>
                    <Button
                      variant="secondary"
                      className={cn(
                        "min-w-0 h-10 aspect-square cursor-move invisible",
                        {
                          "group-hover:visible": prerequisite !== "",
                        }
                      )}
                    >
                      <Menu />
                    </Button>
                  </>
                )}
              </DragDropList.Item>
            ))}
          </DragDropList>

          {canAdd(prerequisites) && (
            <Button
              variant="ghost"
              className="mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 pl-2"
              onClick={() => incrementResource(setPrerequisites)}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
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
            Write a clear description of the{" "}
            <span className="text-purple-600">intended learners</span> for your
            course who will find your course content valuable. This will help
            you attract the right learners to your course.
          </p>

          <DragDropList
            className="space-y-3 w-full"
            items={targetAudience}
            onReorder={setPrerequisites}
            itemsAreDraggable={
              targetAudience.length > MIN_AUDIENCE_DESCRIPTION_COUNT
            }
          >
            {targetAudience.map((audience, i) => (
              <DragDropList.Item index={i} key={i} className="flex group">
                <Input
                  key={i}
                  index={i}
                  content={audience}
                  setContent={setPrerequisites}
                  placeholder="Example: No programming experience needed. You will learn everything you need to know"
                  className="w-full"
                />
                {targetAudience.length > MIN_AUDIENCE_DESCRIPTION_COUNT && (
                  <>
                    <Button
                      variant="secondary"
                      disabled={
                        targetAudience.length <= MIN_AUDIENCE_DESCRIPTION_COUNT
                      }
                      className={cn(
                        "min-w-0 h-10 aspect-square me-1 invisible disabled:cursor-not-allowed",
                        { "group-hover:visible ": audience !== "" }
                      )}
                      onClick={() => handleDeleteObjective(i)}
                    >
                      <Trash2 />
                    </Button>
                    <Button
                      variant="secondary"
                      className={cn(
                        "min-w-0 h-10 aspect-square cursor-move invisible",
                        {
                          "group-hover:visible": audience !== "",
                        }
                      )}
                    >
                      <Menu />
                    </Button>
                  </>
                )}
              </DragDropList.Item>
            ))}
          </DragDropList>

          {canAdd(targetAudience) && (
            <Button
              variant="ghost"
              className="mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 pl-2"
              onClick={() => incrementResource(setTargetAudience)}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add more to your response
            </Button>
          )}
        </div>
      </section>
    </PageCard>
  );
}
