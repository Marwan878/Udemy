import { Checkbox } from "@/components/general";
import { parseSeconds } from "@/lib/utils";
import { TContent, TModule } from "@/types";
import Link from "next/link";

export default function CurriculumItem({
  item,
  isLoading,
  handleCheckboxChange,
  courseId,
  module,
  id,
}: {
  item: TContent;
  isLoading: boolean;
  handleCheckboxChange: (
    curriculumItemId: string,
    moduleId: string,
    courseId: string
  ) => Promise<void>;
  courseId: string;
  module: TModule;
  id: string;
}) {
  return (
    <li className="flex items-center w-full gap-3 p-4 hover:bg-[#d1d2e0]">
      <Checkbox
        checked={item.isCompleted ?? false}
        disabled={isLoading}
        onChange={() => handleCheckboxChange(id, module.id, courseId)}
      />
      <Link href={`/course/${courseId}/lecture/${id}`} className="flex-1">
        <div className="flex flex-1 items-center justify-between">
          <label
            htmlFor="lesson-1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-[70%] line-clamp-2"
            title={item.title}
          >
            {item.title}
          </label>
          <span className="text-sm text-muted-foreground">
            {parseSeconds(item.duration)}
          </span>
        </div>
      </Link>
    </li>
  );
}
