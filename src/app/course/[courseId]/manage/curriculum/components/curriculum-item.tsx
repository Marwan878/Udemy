"use client";

import { Button } from "@/components/general";
import { TContent } from "@/types";
import { CircleCheck, File, Plus, X } from "lucide-react";
import AddVideoForm from "./add-video-form";
import { useState } from "react";

export default function CurriculumItem({
  lecture,
  order,
}: {
  lecture: TContent;
  order: number;
}) {
  const [currentForm, setCurrentForm] = useState<"video-form" | null>(null);

  return (
    <div className="mb-4">
      <div className="border border-[#9194ac] gap-x-2 py-[1.1rem] px-2 bg-white flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col mb-2 max-w-[21rem] md:max-w-none md:mb-0 md:flex-row md:items-center">
          <div className="flex items-center gap-x-1">
            <CircleCheck size={20} /> Lecture {order}:
          </div>
          <div className="flex items-center gap-x-1 ms-1">
            <File size={20} />
            <span className="truncate" title={lecture.title}>
              {lecture.title}
            </span>
          </div>
        </div>
        {/* add content button and form */}
        {currentForm === "video-form" ? (
          <Button
            height="sm"
            variant="ghost"
            className="p-1 self-start"
            onClick={() => setCurrentForm(null)}
            aria-label="Close video form"
          >
            <X aria-hidden />
          </Button>
        ) : (
          <Button
            height="md"
            variant="secondary"
            onClick={() => setCurrentForm("video-form")}
            aria-label="Open video form"
          >
            <Plus aria-label="Add" /> Content
          </Button>
        )}
      </div>
      {currentForm === "video-form" && <AddVideoForm lecture={lecture} />}
    </div>
  );
}
