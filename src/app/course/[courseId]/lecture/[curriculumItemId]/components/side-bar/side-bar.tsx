"use client";

import { fetchModulesWithContent } from "@/actions/courses";
import {
  fetchUserCourseData,
  toggleCurriculumItemCompletion,
} from "@/actions/user";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from "@/components/general";
import { cn, parseSeconds } from "@/lib/utils";
import { TModule } from "@/types";
import { ArrowLeft, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CurriculumItem from "./curriculum-item";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modules, setModules] = useState<TModule[]>([]);
  const { courseId } = useParams() as { courseId: string };

  useEffect(() => {
    const handleLoadData = async () => {
      const modules = await fetchModulesWithContent(courseId);
      const courseData = await fetchUserCourseData(courseId);
      const completedCurriculumItemsIds =
        courseData.completedCurriculumItemsIds;

      const hashset = new Set(completedCurriculumItemsIds);
      modules.forEach((module) => {
        module.content.forEach((item) => {
          item.isCompleted = hashset.has(item.id);
        });
      });
      setModules(modules);
    };

    handleLoadData();
  }, [courseId]);

  const handleCheckboxChange = async (
    curriculumItemToBeUpdatedId: string,
    moduleId: string,
    courseId: string
  ) => {
    setIsLoading(true);

    const moduleToBeUpdatedIndex = modules.findIndex(
      (module) => module.id === moduleId
    );

    setModules((prev) => {
      return prev.map((module, i) => {
        if (i !== moduleToBeUpdatedIndex) return module;

        return {
          ...module,
          content: module.content.map((curriculumItem) => {
            if (curriculumItem.id !== curriculumItemToBeUpdatedId)
              return curriculumItem;

            return {
              ...curriculumItem,
              isCompleted: !curriculumItem.isCompleted,
            };
          }),
        };
      });
    });

    await toggleCurriculumItemCompletion(courseId, curriculumItemToBeUpdatedId);

    setIsLoading(false);
  };

  return (
    <>
      {isCollapsed && (
        <Button
          height="md"
          variant="primary"
          className="absolute top-32 right-0 border border-[#9194ac] translate-x-[11.5rem] hover:translate-x-0 transition-transform duration-500 hidden md:flex
          "
          onClick={() => setIsCollapsed(false)}
        >
          <ArrowLeft color="white" className="me-3" />
          <span className="heading-sm">Course content</span>
        </Button>
      )}
      <div
        className={cn(
          "sticky top-0 h-[calc(100vh-48.8px)] md:basis-[30rem] xl:basis-[40rem]",
          { "md:basis-0 xl:basis-0": isCollapsed }
        )}
      >
        <aside
          className={`mx-auto bg-white w-[41.6rem] h-[calc(100vh-5rem)] overflow-auto ${
            isCollapsed ? "md:hidden" : ""
          }`}
        >
          <div className="border-b p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Course content</h1>
            <button className="text-gray-500 hover:text-gray-700 hidden md:block">
              <X className="h-5 w-5" onClick={() => setIsCollapsed(true)} />
            </button>
          </div>

          <div className="overflow-auto">
            {modules?.map((module, i) => (
              <Accordion
                className="w-full border-t border-t-[#d1d2e0]"
                key={module.id}
              >
                <AccordionHeader className="p-4 hover:no-underline bg-[#f6f7f9]">
                  <div className="flex flex-col items-start">
                    <div className="font-semibold">
                      Section {i + 1}: {module.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {module.content.reduce(
                        (acc, curr) => acc + Number(curr.isCompleted ?? false),
                        0
                      )}{" "}
                      / {module.content.length} |{" "}
                      {parseSeconds(
                        module.content.reduce(
                          (acc, curr) => acc + curr.duration,
                          0
                        )
                      )}
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <ul className="space-y-1 cursor-pointer">
                    {module.content.map((item) => (
                      <CurriculumItem
                        key={item.id}
                        item={item}
                        isLoading={isLoading}
                        handleCheckboxChange={handleCheckboxChange}
                        courseId={courseId}
                        module={module}
                        id={item.id}
                      />
                    ))}
                  </ul>
                </AccordionBody>
              </Accordion>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
