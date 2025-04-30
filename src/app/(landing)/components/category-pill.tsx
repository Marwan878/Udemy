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
        "flex flex-col items-start h-[6.6rem] pt-[1.6rem] px-[2.4rem] pb-[0.8rem] rounded-[9.6rem] bg-[#e9eaf2] text-nowrap cursor-pointer hover:bg-[#d1d2e0] ",
        { "bg-[#303141] hover:bg-[#595c73]": checked },
        className
      )}
    >
      <label
        htmlFor={category.displayName}
        onClick={onClick}
        className="cursor-pointer"
      >
        <h4
          className={cn(
            "mb-[0.4rem] heading-md text-[#303141] user-select-none",
            {
              "text-white": checked,
            }
          )}
        >
          {category.displayName}
        </h4>
        <span
          className={cn("text-xs text-[#595c73] user-select-none", {
            "text-white": checked,
          })}
        >
          {category.learnersCount >= 1_000_000
            ? parseFloat((category.learnersCount / 1_000_000).toPrecision(3)) +
              "M+"
            : category.learnersCount.toLocaleString()}{" "}
          learners
        </span>
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
