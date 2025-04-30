import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

export default function SearchBar({
  className,
  value,
  onChange,
  onSearch,
  containerClassName,
}: {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  containerClassName?: string;
}) {
  return (
    <div className={cn("relative", containerClassName)}>
      <button
        onClick={onSearch}
        disabled={value.trim() === ""}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-4 cursor-not-allowed",
          {
            "cursor-pointer": value.trim() !== "",
          }
        )}
      >
        <Search width={20} height={24} />
      </button>
      <input
        type="text"
        placeholder="Search for anything"
        className={cn(
          "rounded-full ps-16 pe-3 border border-[#666] hover:bg-[#f4f4f4] focus:bg-transparent w-full h-20",
          className
        )}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
