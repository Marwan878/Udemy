"use client";

import { MaxWidthWrapper } from "@/components/general";
import { TABS } from "@/constants";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";

const tabComponents = {
  overview: dynamic(() => import("./tabs/overview/overview")),
  notes: dynamic(() => import("./tabs/notes/notes")),
};

export default function Page() {
  const [activeTabName, setActiveTabName] = useState<"overview" | "notes">(
    "overview"
  );
  const Tab = tabComponents[activeTabName];
  const { courseId } = useParams() as { courseId: string };

  return (
    <MaxWidthWrapper className="pb-12">
      <div className="border-b-[#d1d2e0] border-b space-x-4 px-4 pt-2">
        {TABS.map((tab, i) => (
          <button
            className={cn(
              "text-[#595c73] heading-md hover:text-[#303141] py-2 px-1",
              {
                "text-[#303141] border-b-2 border-b-[#303141]":
                  tab.name === activeTabName,
              }
            )}
            key={i}
            onClick={() => setActiveTabName(tab.name)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>
        <Suspense fallback="Loading...">
          <Tab courseId={courseId} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
