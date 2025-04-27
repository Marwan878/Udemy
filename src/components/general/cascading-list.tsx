"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { TUdemyHeaderCategory } from "@/types/index";

export default function CascadingListManager({
  items,
}: {
  items: TUdemyHeaderCategory[];
}) {
  const firstListItems = items;
  const [firstListSelectedItemIndex, setFirstListSelectedItemIndex] = useState<
    null | number
  >(null);

  const secondListItems =
    firstListSelectedItemIndex !== null
      ? firstListItems[firstListSelectedItemIndex].subcategories
      : [];

  const [secondListSelectedItemIndex, setSecondListSelectedItemIndex] =
    useState<null | number>(null);

  const thirdListItems =
    secondListSelectedItemIndex !== null && secondListItems
      ? secondListItems[secondListSelectedItemIndex]?.subcategories
      : [];

  const [thirdListSelectedItemIndex, setThirdListSelectedItemIndex] = useState<
    null | number
  >(null);

  return (
    <div className="flex">
      <CascadingList
        items={firstListItems}
        selectedItemIndex={firstListSelectedItemIndex}
        setSelectedItemIndex={setFirstListSelectedItemIndex}
        setNextSelectedItemIndex={setSecondListSelectedItemIndex}
        title={"Browse Certifications"}
      />
      <CascadingList
        items={secondListItems}
        selectedItemIndex={secondListSelectedItemIndex}
        setSelectedItemIndex={setSecondListSelectedItemIndex}
        setNextSelectedItemIndex={setThirdListSelectedItemIndex}
      />
      <CascadingList
        items={thirdListItems}
        selectedItemIndex={thirdListSelectedItemIndex}
        setSelectedItemIndex={setThirdListSelectedItemIndex}
        displayChevron={false}
        title="Popular topics"
      />
    </div>
  );
}

function CascadingList({
  items,
  selectedItemIndex,
  setSelectedItemIndex,
  title,
  displayChevron = true,
  setNextSelectedItemIndex,
}: {
  items: TUdemyHeaderCategory[] | undefined;
  selectedItemIndex: number | null;
  setSelectedItemIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setNextSelectedItemIndex?: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  title?: string;
  displayChevron?: boolean;
  heading?: string;
}) {
  if (items?.length === 0) return null;

  return (
    <div className="w-[26rem] min-h-[64rem] py-[0.8rem] border-e border-e-[#777]">
      {title && (
        <h2 className="text-[#595c73] px-[1.6rem] py-[0.8rem] heading-sm">
          {title}
        </h2>
      )}
      <ul>
        {items?.map(({ title, link }, i) => (
          <li
            className={cn(
              "text-sm flex items-center justify-between py-[0.8rem] px-[1.6rem] text-[#303141] hover:bg-btn-focus",
              {
                "text-udemy-purple": selectedItemIndex === i,
              }
            )}
            key={i}
            onMouseEnter={() => {
              setSelectedItemIndex(i);
              setNextSelectedItemIndex?.(null);
            }}
          >
            <a href={link}>{title}</a>
            {displayChevron && <ChevronRight />}
          </li>
        ))}
      </ul>
    </div>
  );
}
