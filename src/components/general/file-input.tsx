import React, { Dispatch, SetStateAction, useRef } from "react";
import Button from "./button";

export default function FileInput({
  selectedFile,
  setSelectedFile,
  fileType,
}: {
  selectedFile: File | undefined;
  setSelectedFile: Dispatch<SetStateAction<File | undefined>>;
  fileType: "video" | "image";
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-x-2">
      <label
        htmlFor="file-selector"
        className="border border-[#d1d2e0] rounded-md grow p-4 px-6 h-10 flex items-center grow-1"
      >
        <input
          id="file-selector"
          name="file"
          type="file"
          className="hidden"
          accept={fileType + "/*"}
          onChange={(e) => setSelectedFile(e.target.files?.[0])}
          ref={fileInputRef}
        />
        <span>{selectedFile ? selectedFile.name : "No file selected"}</span>
      </label>
      <Button
        type="button"
        variant="secondary"
        height="md"
        className="font-bold"
        onClick={() => fileInputRef.current?.click()}
      >
        Select {fileType}
      </Button>
    </div>
  );
}
