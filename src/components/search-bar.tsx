"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ className }: { className?: string }) {
  const [searchText, setSearchText] = useState("");

  return (
    <form
      action=""
      className={cn("relative h-20 flex-1 mx-[1.2rem]", className)}
    >
      <button
        disabled={searchText.trim() === ""}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-4 cursor-not-allowed",
          {
            "cursor-pointer": searchText.trim() !== "",
          }
        )}
      >
        <Search width={20} height={24} />
      </button>
      <input
        type="text"
        placeholder="Search for anything"
        className="h-full rounded-full ps-16 pe-3 border border-[#666] hover:bg-[#f4f4f4] focus:bg-transparent w-full"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
