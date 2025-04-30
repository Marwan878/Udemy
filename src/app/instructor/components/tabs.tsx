"use client";

import { PROFILE_TABS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs() {
  const pathname = usePathname();
  return (
    <div className="border-b w-full rounded-none mb-6 space-x-2 flex">
      {PROFILE_TABS.map((tab) => (
        <Link
          key={tab.url}
          href={tab.url}
          className={cn(
            "px-2 py-1 bg-transparent rounded-none",
            pathname.endsWith(tab.url)
              ? "border-[#1d1e27] border-b-2 text-[#1d1e27] font-medium"
              : "text-gray-500 hover:text-gray-800"
          )}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
