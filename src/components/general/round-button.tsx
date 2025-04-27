import { cn } from "@/lib/utils";
import { CSSProperties, MouseEventHandler } from "react";

export default function RoundButton({
  onClick,
  size = 4.8,
  className,
  style,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  size?: number;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <button
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        ...style,
      }}
      onClick={onClick}
      className={cn(
        "flex justify-center items-center rounded-full bg-white shadow-md hover:bg-[#e9eaf2]",
        className
      )}
    >
      {children}
    </button>
  );
}
