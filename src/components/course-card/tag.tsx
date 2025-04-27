import { cn } from "@/lib/utils";
import { TCourseTag } from "@/types";
import { CSSProperties } from "react";

export default function Tag({
  tag,
  style,
  className,
}: {
  tag: TCourseTag;
  style?: CSSProperties;
  className?: string;
}) {
  let backgroundColor, color;

  switch (tag) {
    case "Bestseller":
      backgroundColor = "#c2e9eb";
      color = "#0d5261";
      break;

    default:
      break;
  }

  return (
    <div
      style={{ backgroundColor, color, ...style }}
      className={cn(
        "py-[0.4rem] px-[0.8rem] rounded-[0.4rem] heading-xs",
        className
      )}
    >
      {tag}
    </div>
  );
}
