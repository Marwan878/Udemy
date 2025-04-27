"use client";

import { fetchModulesWithContent } from "@/actions/courses";
import { fetchCourseNotes, saveNote } from "@/actions/user";
import { Button, MaxWidthWrapper, RichTextEditor } from "@/components/general";
import { useVideoTimestamp } from "@/contexts/video-timestamp";
import { TNote } from "@/types";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SavedNotes from "./saved-notes";
import TimePill from "./time-pill";
import { formatVideoTime } from "@/lib/utils";

export default function Notes() {
  const [textEditorIsVisible, setTextEditiorIsVisible] = useState(false);
  const { currentTimestamp } = useVideoTimestamp();
  const noteContent = useRef("");
  const [notes, setNotes] = useState<TNote[]>();
  const { courseId, order, moduleId } = useParams() as {
    courseId: string;
    order: string;
    moduleId: string;
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
    const currentModule = modules.find((module) => module.id === moduleId);
    const currentLecture = currentModule?.content.find(
      (lecture) => lecture.order === +order
    );

    const newNote: TNote = {
      content: noteContent.current,
      lectureNumber: +order,
      moduleNumber: currentModule?.order ?? 1,
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
              <RichTextEditor
                onChange={(newContent) => {
                  noteContent.current = newContent;
                }}
              />
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
              <Plus />
            </span>
          </button>
        )}
        <div className="flex flex-wrap gap-[0.8rem] pt-[0.8rem] pb-[3.2rem]">
          {/* <Filter /> */}
        </div>
        <SavedNotes notes={notes} setNotes={setNotes} courseId={courseId} />
      </div>
    </MaxWidthWrapper>
  );
}
