import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function Select({
  onChange,
  options,
  value,
  className,
  name,
}: {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly { displayName: string; value: string }[];
  value?: string;
  className?: string;
  name: string;
}) {
  return (
    <div className={cn("relative h-10", className)}>
      <select
        value={value}
        onChange={onChange}
        className={cn(
          "px-3 w-full focus:ring-udemy-purple focus:ring-offset-1 focus:ring outline-none focus:border-none appearance-none cursor-pointer group hover:bg-gray-100 h-10 rounded-[0.4rem] border border-[#9194ac]"
        )}
        name={name}
      >
        {options.map((option) => (
          <option key={option.value}>{option.displayName}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2" />
    </div>
  );
}
