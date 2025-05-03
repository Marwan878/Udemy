import { TNote } from "@/types";
import TimePill from "./time-pill";
import { Button } from "@/components/general";
import { Trash2 } from "lucide-react";

export default function SavedNote({
  note,
  onDelete,
}: {
  note: TNote;
  onDelete: () => Promise<void>;
}) {
  return (
    <div className="flex gap-x-3">
      <TimePill timeInSeconds={note.takenAtSecond} />
      <div className="flex flex-col grow">
        <div className="heading-md mb-2 flex justify-between">
          <div>{note.moduleNumber + ". " + note.moduleName}</div>
          <Button
            variant="ghost"
            type="submit"
            height="sm"
            className="hover:bg-[#d1d2e0] px-2"
            onClick={() => onDelete()}
            aria-label="Delete note."
          >
            <Trash2 className="w-4" />
          </Button>
        </div>
        <div className="text-sm mb-4">
          {note.lectureNumber + ". " + note.lectureName}
        </div>
        <div
          className="bg-[#f6f7f9] p-6 "
          dangerouslySetInnerHTML={{ __html: note.content }}
        ></div>
      </div>
    </div>
  );
}
