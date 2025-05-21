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
      <div className="border border-[#9194ac] gap-x-2 py-[1.1rem] px-2 bg-white flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center gap-x-1">
            <CircleCheck size={20} /> Lecture {order}:
          </div>
          <div className="flex items-center gap-x-1 ms-1">
            <File size={20} /> {lecture.title}
          </div>
        </div>
        {/* add content button and form */}
        {currentForm === "video-form" ? (
          <Button
            height="sm"
            variant="ghost"
            className="p-1"
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
