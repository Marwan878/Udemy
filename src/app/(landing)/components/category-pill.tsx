import { cn } from "@/lib/utils";
import { TCategory } from "@/types";
import { MouseEventHandler } from "react";

export default function CategoryPill({
  category,
  checked,
  className,
  onClick,
}: {
  checked: boolean;
  category: TCategory;
  className?: string;
  onClick: MouseEventHandler<HTMLLabelElement>;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start rounded-[9.6rem] bg-[#e9eaf2] text-nowrap cursor-pointer hover:bg-[#d1d2e0] ",
        { "bg-[#303141] hover:bg-[#595c73]": checked },
        className
      )}
    >
      <label
        htmlFor={category.displayName}
        onClick={onClick}
        className="cursor-pointer w-full h-full py-[1.6rem] px-[2.4rem]"
      >
        <div
          className={cn("heading-md text-[#303141] user-select-none", {
            "text-white": checked,
          })}
        >
          {category.displayName}
        </div>
      </label>
      <input
        className="hidden"
        type="radio"
        id={category.displayName}
        checked={checked}
        readOnly
      />
    </div>
  );
}
