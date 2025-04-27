"use client";

import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
}

export function FilterDropdown({
  label,
  options,
  onSelect,
}: FilterDropdownProps) {
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" className="text-violet-600 border-violet-200">
    //       {label} <ChevronDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     {options.map((option) => (
    //       <DropdownMenuItem key={option} onClick={() => onSelect(option)}>
    //         {option}
    //       </DropdownMenuItem>
    //     ))}
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <></>
  );
}
