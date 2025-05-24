"use client";

import { Button } from "@/components/general";
import { useCourseManagement } from "@/contexts/course-management";
import supabase, { SUPABASE_URL } from "@/lib/supabase";
import { getVideoDuration } from "@/lib/utils";
import { TContent } from "@/types";
import { Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AddVideoForm({ lecture }: { lecture: TContent }) {
  const [selectedVideo, setSelectedVideo] = useState<File | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAlreadyUploaded, setHasAlreadyUploaded] = useState(!!lecture.url);
  const { modules, setModules } = useCourseManagement();

  useEffect(() => {
    async function fetchFile() {
      if (!lecture.url) return;
      const res = await fetch(lecture.url);
      const blob = await res.blob();
      const file = new File([blob], lecture.title, { type: blob.type });
      setSelectedVideo(file);
    }
    fetchFile();
  }, [lecture.url, lecture.title]);

  const handleFileSelection = async (e: ChangeEvent<HTMLInputElement>) => {
    if (isLoading) {
      return;
    }

    const video = e.target.files?.[0];
    setSelectedVideo(video);

    if (video) {
      setIsLoading(true);
      try {
        // 1. Get video duration
        const videoDuration = await getVideoDuration(video);

        if (typeof videoDuration !== "number") {
          throw new Error("Failed to compute video duration.");
        }

        // 2. Upload video to supabase
        const finalVideoName = `${crypto.randomUUID()}-${video.name}`;
        const { error } = await supabase.storage
          .from("videos")
          .upload(finalVideoName, video, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw new Error(error.message);
        }

        setHasAlreadyUploaded(true);
        toast.success("Video successfully uploaded!");

        // 3. Add the video to the state
        setLectureUrlAndDuration(
          `${SUPABASE_URL}/storage/v1/object/public/videos//${finalVideoName}`,
          videoDuration
        );
      } catch (error) {
        setSelectedVideo(undefined);
        toast.error("An error occured, please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteVideo = async () => {
    if (!selectedVideo) return;

    setIsLoading(true);

    try {
      // 1. Remove video from supabase
      const { error } = await supabase.storage
        .from("videos")
        .remove([`${selectedVideo.name}`]);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Lecture has been successfully deleted!");

      setHasAlreadyUploaded(false);
      setSelectedVideo(undefined);

      // 2. Remove video from state
      setLectureUrlAndDuration("", 0);
    } catch (error) {
      toast.error(
        "An error occured while deleting the lecture, please try again."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  function setLectureUrlAndDuration(url: string, duration: number) {
    const currentModule = modules.find(
      (module) =>
        module.content.find((_lecture) => _lecture.id === lecture.id) !==
        undefined
    );

    if (!currentModule) throw new Error("Failed to get the current module.");

    const currentModuleIndex = modules.indexOf(currentModule);

    setModules((modules) =>
      modules
        .slice(0, currentModuleIndex)
        .concat([
          {
            ...currentModule,
            content: currentModule.content.map((_lecture) => {
              if (_lecture.id === lecture.id) {
                return {
                  ..._lecture,
                  url,
                  duration: Math.round(duration),
                };
              } else return _lecture;
            }),
          },
        ])
        .concat(modules.slice(currentModuleIndex + 1))
    );
  }

  return (
    <div className="flex bg-white px-2 py-4 items-center justify-between gap-x-4">
      <label
        htmlFor="file-selector"
        className="border border-[#d1d2e0] rounded-md grow p-4 px-6 h-10 flex items-center"
      >
        <input
          id="file-selector"
          name="file"
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleFileSelection}
          ref={fileInputRef}
        />
        <span className="truncate max-w-[15rem] md:max-w-3xl">
          {lecture.url
            ? lecture.url
            : selectedVideo
            ? selectedVideo.name
            : "No file selected"}
        </span>
      </label>
      {hasAlreadyUploaded ? (
        <Button
          onClick={handleDeleteVideo}
          variant="ghost"
          height="sm"
          aria-label="Delete video."
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" aria-hidden />
          ) : (
            <Trash2 aria-hidden />
          )}
        </Button>
      ) : (
        <Button
          type="button"
          variant="secondary"
          height="md"
          className="font-bold disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          disabled={isLoading}
        >
          {isLoading ? "Uploading video..." : "Select video"}
        </Button>
      )}
    </div>
  );
}
