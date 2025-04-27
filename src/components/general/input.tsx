"use client";
import { cn } from "@/lib/utils";
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useRef,
} from "react";

export default function Input({
  limit,
  className,
  content,
  setContent,
  index,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  limit?: number;
  className?: string;
  index?: number;
  content?: string;
  setContent?:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<string[]>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent?.((prev: string | string[]) => {
      if (limit && limit === e.target.value.length - 1) {
        return prev;
      } else {
        if (Array.isArray(prev)) {
          const updated = [...prev];
          updated[index] = e.target.value;
          return updated;
        } else {
          return e.target.value;
        }
      }
    });
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between h-10 rounded-[0.4rem] border border-[#9194ac] focus-within:ring focus-within:ring-offset-1 focus-within:border-transparent focus-within:ring-udemy-purple outline-none group hover:bg-gray-100 overflow-hidden",
        className
      )}
      tabIndex={1}
      onFocus={() => inputRef.current?.focus()}
    >
      <input
        type="text"
        className="flex-1 ps-4 border-0 h-full outline-none caret-udemy-purple group-hover:bg-gray-100"
        onChange={handleChange}
        value={content}
        {...props}
        tabIndex={-1}
        ref={inputRef}
      />
      {limit && (
        <span className="mx-4 text-[#595c73]">{limit - content.length}</span>
      )}
    </div>
  );
}
