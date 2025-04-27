"use client";

import { Button } from "@/components/general";
import { usePathname } from "next/navigation";

export default function SaveButton() {
  const pathname = usePathname();

  if (!pathname.endsWith("goals")) return null;

  return (
    <Button height="md" className="w-fit md:ms-auto font-bold">
      Save
    </Button>
  );
}
