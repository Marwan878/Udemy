"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/general";
// import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      {/* <Input
        type="text"
        placeholder="Search your courses"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-[230px] border-gray-300"
      /> */}
      <Button variant="primary" height="md" className="min-w-0 w-16 h-16">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
