"use client";

import { Button } from "@/components/general";
import { SearchBar } from "./search-bar";
import { FilterDropdown } from "./filter-dropdown";
import Link from "next/link";

export function CourseHeader() {
  const handleFilterSelect = (option: string) => {
    // Implement filter functionality
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4 items-center">
        <SearchBar />
        <FilterDropdown
          label="Newest"
          options={["Newest", "Oldest", "A-Z", "Z-A"]}
          onSelect={handleFilterSelect}
        />
      </div>
      <Button
        as={Link}
        href="/course/create/1"
        variant="primary"
        height="md"
        className="heading-sm"
      >
        New course
      </Button>
    </div>
  );
}
