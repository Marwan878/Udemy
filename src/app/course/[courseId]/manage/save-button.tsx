"use client";

import { upsertCourseDataAndModules } from "@/actions/courses";
import { Button } from "@/components/general";
import { useCourseManagement } from "@/contexts/course-management";
import supabase, { SUPABASE_URL } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SaveButton() {
  const { modules, courseData, courseImage, setCourseData } =
    useCourseManagement();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveData = async () => {
    setIsLoading(true);
    if (courseImage) {
      const { error } = await supabase.storage
        .from("images")
        .upload(`${courseImage.name}`, courseImage, {
          cacheControl: "3600",
          upsert: false,
        });

      if (!error) {
        setCourseData((prev) => ({
          ...prev,
          imageUrl: `${SUPABASE_URL}/storage/v1/object/public/images//${courseImage.name}`,
        }));
      }
    }

    await upsertCourseDataAndModules(courseData, modules);

    setIsLoading(false);
    router.push("/instructor");
  };

  return (
    <Button
      height="md"
      className={cn("w-fit md:ms-auto font-bold", {
        "opacity-50 cursor-not-allowed": isLoading,
      })}
      onClick={handleSaveData}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
    </Button>
  );
}
