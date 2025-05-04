"use client";

import { fetchModulesWithContent } from "@/actions/courses";
import { fetchCourseNotes, saveNote } from "@/actions/user";
import { Button, MaxWidthWrapper, RichTextEditor } from "@/components/general";
import { useVideoTimestamp } from "@/contexts/video-timestamp";
import { formatVideoTime } from "@/lib/utils";
import { TContent, TModule, TNote } from "@/types";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SavedNotes from "./saved-notes";
import TimePill from "./time-pill";

const computeCurriculumItemOrder = (
  modules: TModule[],
  curriculumItemId: string
): number => {
  const curriculumItems: TContent[] = [];
  modules.forEach((module) => {
    curriculumItems.concat(module.content);
  });

  const curriculumItemIndex = curriculumItems.findIndex(
    (curriculumItem) => curriculumItem.id === curriculumItemId
  );

  return curriculumItemIndex + 1;
};

const computeModuleOrder = (
  modules: TModule[],
  curriculumItemId: string
): number => {
  return (
    modules.findIndex(
      (module) =>
        module.content.find(
          (curriculumItem) => curriculumItem.id !== curriculumItemId
        ) !== undefined
    ) + 1
  );
};

export default function Notes() {
  const [textEditorIsVisible, setTextEditiorIsVisible] = useState(false);
  const { currentTimestamp } = useVideoTimestamp();
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<TNote[]>();
  const { courseId, curriculumItemId } = useParams() as {
    courseId: string;
    curriculumItemId: string;
  };

  useEffect(() => {
    const handleLoad = async () => {
      const notes = await fetchCourseNotes(courseId);
      setNotes(notes);
    };

    handleLoad();
  }, [courseId]);

  const handleSaveNote = async () => {
    const modules = await fetchModulesWithContent(courseId);
    const currentModuleOrder = computeModuleOrder(modules, curriculumItemId);
    const curriculumItemOrder = computeCurriculumItemOrder(
      modules,
      curriculumItemId
    );
    const currentModule = modules.at(currentModuleOrder - 1);
    const currentLecture = currentModule?.content.find(
      (lecture) => lecture.id === curriculumItemId
    );

    const newNote: TNote = {
      content: note,
      lectureNumber: curriculumItemOrder,
      moduleNumber: currentModuleOrder,
      takenAtSecond: Math.round(currentTimestamp),
      lectureName: currentLecture?.title ?? "",
      moduleName: currentModule?.title ?? "",
      id: crypto.randomUUID(),
    };

    const initialState = notes;

    try {
      setNotes((prev) => [...(prev ?? []), newNote]);
      await saveNote(
        {
          ...newNote,
          id: crypto.randomUUID(),
        },
        courseId
      );
    } catch (error) {
      console.error(error);
      setNotes(initialState);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="max-w-[84.8rem] pt-[3.2rem] md:px-[2.4rem] mx-auto">
        {textEditorIsVisible ? (
          <div className="flex gap-x-3 items-start">
            <TimePill timeInSeconds={currentTimestamp} />
            <div className="flex flex-col shrink-0 grow">
              <RichTextEditor value={note} onChange={setNote} />
              <div className="self-end flex gap-x-3 mt-4">
                <Button
                  height="md"
                  variant="ghost"
                  onClick={() => setTextEditiorIsVisible(false)}
                >
                  Cancel
                </Button>
                <Button height="md" onClick={handleSaveNote}>
                  Save note
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setTextEditiorIsVisible(true)}
            className="border border-[#9194ac] rounded-[0.4rem] px-4 py-1 text-[#595c73] w-full flex justify-between items-center btn-md hover:bg-[#f5f5f6]"
          >
            Create a new note at {formatVideoTime(currentTimestamp)}
            <span className="w-5 h-5 p-1 bg-[#303141] text-white rounded-full flex items-center justify-center">
              <Plus aria-label="Add a note" />
            </span>
          </button>
        )}
        <SavedNotes notes={notes} setNotes={setNotes} courseId={courseId} />
      </div>
    </MaxWidthWrapper>
  );
}
