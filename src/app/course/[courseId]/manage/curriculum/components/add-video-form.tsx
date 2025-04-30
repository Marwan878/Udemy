import { Button } from "@/components/general";
import { useCourseManagement } from "@/contexts/course-management";
import supabase, { SUPABASE_URL } from "@/lib/supabase";
import { TContent } from "@/types";
import { Trash2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

export default function AddVideoForm({ lecture }: { lecture: TContent }) {
  const [selectedVideo, setSelectedVideo] = useState<File | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAlreadyUploaded, setHasAlreadyUploaded] = useState(!!lecture.url);
  const { modules, setModules } = useCourseManagement();

  const handleFileSelection = async (e: ChangeEvent<HTMLInputElement>) => {
    const video = e.target.files?.[0];
    setSelectedVideo(video);

    if (video) {
      setIsLoading(true);
      const { error } = await supabase.storage
        .from("videos")
        .upload(`${video.name}`, video, {
          cacheControl: "3600",
          upsert: false,
        });
      setIsLoading(false);
      if (error) {
        console.error(error);
        return;
      }

      setHasAlreadyUploaded(true);

      // Add the video to the state
      const currentModule = modules.find(
        (module) =>
          module.content.find((_lecture) => _lecture.id === lecture.id) !==
          undefined
      );

      if (!currentModule) return;

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
                    url: `${SUPABASE_URL}/storage/v1/object/public/videos//${video.name}`,
                  };
                } else return _lecture;
              }),
            },
          ])
          .concat(modules.slice(currentModuleIndex + 1))
      );
    }
  };

  const handleDeleteVideo = async () => {
    if (!selectedVideo) return;

    setIsLoading(true);

    await supabase.storage.from("videos").remove([`${selectedVideo.name}`]);

    setIsLoading(false);
    setHasAlreadyUploaded(false);
    setSelectedVideo(undefined);
  };

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
        <span>
          {lecture.url
            ? lecture.url
            : selectedVideo
            ? selectedVideo.name
            : "No file selected"}
        </span>
      </label>
      {hasAlreadyUploaded ? (
        <Button onClick={handleDeleteVideo} variant="ghost" height="sm">
          <Trash2 />
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
