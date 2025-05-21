"use client";

import { upsertCourseDataAndModules } from "@/actions/courses";
import { Button } from "@/components/general";
import { useCourseManagement } from "@/contexts/course-management";
import supabase, { SUPABASE_URL } from "@/lib/supabase";
import { cn, instructorCourseCompletionPercentage } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SaveButton() {
  const { modules, courseData, courseImage, setCourseData } =
    useCourseManagement();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveData = async () => {
    setIsLoading(true);

    try {
      let updatedCourseData = courseData;

      if (courseImage) {
        // Check if the image already exists in the bucket
        const { data } = await supabase.storage.from("images").list();
        const fileExists = data?.some((file) => file.name === courseData.id);

        if (!fileExists) {
          // Upload image to supabase
          const { error } = await supabase.storage
            .from("images")
            .upload(`${courseData.id}`, courseImage, {
              cacheControl: "3600",
              upsert: false,
            });

          if (error) {
            toast.error("Failed to upload course image, please try again.");
            throw new Error(error.message);
          }

          toast.success(
            "Course image has been successfully uploaded, upserting the rest of the data..."
          );
        }

        updatedCourseData = {
          ...updatedCourseData,
          imageUrl: `${SUPABASE_URL}/storage/v1/object/public/images//${courseData.id}`,
          isPublished: instructorCourseCompletionPercentage(courseData) === 100,
        };

        setCourseData(updatedCourseData);
      }

      await upsertCourseDataAndModules(updatedCourseData, modules);

      toast.success(
        "Course data has been successfully updated! Redirecting..."
      );
      router.push("/instructor");
    } catch (error) {
      toast.error("An error occured while saving the data, please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      height="md"
      className={cn("w-fit md:ms-auto font-bold", {
        "opacity-50 cursor-not-allowed": isLoading,
      })}
      onClick={handleSaveData}
      aria-label={isLoading ? "Saving" : "Save"}
    >
      {isLoading ? <Loader2 className="animate-spin" aria-hidden /> : "Save"}
    </Button>
  );
}
