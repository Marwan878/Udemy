"use client";

import { Button, Input } from "@/components/general";
import { useCourseManagement } from "@/contexts/course-management";
import { TModule } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddCurriculumItemForm({ module }: { module: TModule }) {
  const [currentForm, setCurrentForm] = useState<"lecture" | null>(null);
  const [lectureTitle, setLectureTitle] = useState("");
  const { modules, setModules } = useCourseManagement();

  const handleAddLecture = () => {
    if (!lectureTitle) return;

    const moduleIndex = modules.indexOf(module);
    setModules((prev) =>
      prev
        .slice(0, moduleIndex)
        .concat([
          {
            ...module,
            content: [
              ...module.content,
              {
                duration: 0,
                title: lectureTitle,
                type: "video",
                url: "",
                id: crypto.randomUUID(),
              },
            ],
          },
        ])
        .concat(prev.slice(moduleIndex + 1))
    );
    setLectureTitle("");
    setCurrentForm(null);
  };

  return (
    <>
      {currentForm === null && (
        <div className="border border-dashed border-[#9194ac] bg-white py-2 px-4 flex flex-wrap">
          <Button
            variant="ghost"
            height="sm"
            className="text-udemy-purple flex items-center font-bold min-w-0 p-1"
            onClick={() => setCurrentForm("lecture")}
          >
            <Plus size={20} />{" "}
            <span className="inline-block h-fit">Lecture</span>
          </Button>
        </div>
      )}
      {currentForm === "lecture" && (
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <span>New Lecture: </span>
            <Input
              placeholder="Enter a Title"
              limit={80}
              className="grow"
              content={lectureTitle}
              setContent={setLectureTitle}
            />
          </div>
          <div className="flex self-end mt-4 gap-x-3">
            <Button
              variant="ghost"
              height="md"
              className="hover:bg-gray-200 px-2 w-fit min-w-0"
              onClick={() => setCurrentForm(null)}
            >
              Cancel
            </Button>
            <Button variant="primary" height="md" onClick={handleAddLecture}>
              Add Lecture
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
