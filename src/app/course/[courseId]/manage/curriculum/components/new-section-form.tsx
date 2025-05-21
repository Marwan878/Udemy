"use client";

import { Button, Input } from "@/components/general";
import { useCourseManagement } from "@/contexts/course-management";
import { Dispatch, SetStateAction, useState } from "react";

export default function NewSectionForm({
  setNewModuleFormIsVisible,
}: {
  setNewModuleFormIsVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const { setModules } = useCourseManagement();

  const handleAddSection = () => {
    setModules((prev) => [
      ...prev,
      { content: [], id: crypto.randomUUID(), title: newSectionTitle },
    ]);
    setNewSectionTitle("");
    setNewModuleFormIsVisible(false);
  };

  const handleCancel = () => {
    setNewModuleFormIsVisible((prev) => !prev);
    setModules((prev) => prev.slice(0, -1));
  };

  return (
    <div className="border border-[#9194ac] p-4 gap-2 flex gap-x-6">
      <div className="font-bold">New Section:</div>
      <div className="flex flex-col grow">
        <label className="flex flex-col mb-3">
          <span className="text-nowrap">What is the title of the section?</span>
          <Input
            content={newSectionTitle}
            setContent={setNewSectionTitle}
            limit={80}
            className="w-full mt-2"
            placeholder="Enter a Title"
          />
        </label>
        <div className="flex self-end mt-4 gap-x-3">
          <Button
            variant="ghost"
            height="md"
            className="hover:bg-gray-200 px-2 w-fit min-w-0"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button height="md" onClick={handleAddSection}>
            Add Section
          </Button>
        </div>
      </div>
    </div>
  );
}
