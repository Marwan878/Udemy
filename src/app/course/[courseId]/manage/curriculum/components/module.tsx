import { TModule } from "@/types";
import { File, Plus, X } from "lucide-react";
import CurriculumItem from "./curriculum-item";
import { useState } from "react";
import { Button } from "@/components/general";
import AddCurriculumItemForm from "./add-curriculum-item-form";

export default function Module({
  module,
  order,
}: {
  module: TModule;
  order: number;
}) {
  const [addCurriculumItemFormIsShown, setAddCurriculumItemFormIsShown] =
    useState(false);

  return (
    <div className="py-[1.9rem] px-2 bg-[#f6f7f9] border border-[#9194ac] mb-8">
      <div className="flex items-center gap-x-2 mb-1">
        <span className="font-bold">Section {order}: </span>
        <span className="flex gap-x-1 items-center">
          <File size={20} /> {module.title}
        </span>
      </div>
      {module.content.map((lecture, i) => (
        <CurriculumItem key={lecture.id} lecture={lecture} order={i + 1} />
      ))}

      {/* select curriculum item button and form */}
      <Button
        variant={addCurriculumItemFormIsShown ? "ghost" : "secondary"}
        height="md"
        className="font-bold min-w-0 mt-6 mb-3"
        onClick={() => setAddCurriculumItemFormIsShown((prev) => !prev)}
        aria-label={
          addCurriculumItemFormIsShown
            ? "Close add curriculum item form"
            : "Open add curriculum item form"
        }
      >
        {addCurriculumItemFormIsShown ? (
          <X aria-hidden />
        ) : (
          <>
            <Plus color="#303141" aria-label="Add" /> Curriculum item
          </>
        )}
      </Button>
      {addCurriculumItemFormIsShown && (
        <AddCurriculumItemForm module={module} />
      )}
    </div>
  );
}
