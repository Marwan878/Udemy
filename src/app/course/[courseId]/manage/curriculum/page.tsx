"use client";

import { Button } from "@/components/general";
import Input from "@/components/general/input";
import { CldImage } from "next-cloudinary";
import { AlertCircle, CircleCheck, File, Plus, X } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import PageCard from "../page-card";
import { uploadVideo } from "@/actions/instructor";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";

export default function Page() {
  const [currentForm, setCurrentForm] = useState<
    "new-section" | "curriculum-item-types" | "video-form" | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <PageCard heading="Curriculum">
      <div>
        <div className="rounded-[1.6rem] border border-[#d1d2e0] p-4 gap-x-4 flex">
          <AlertCircle color="#6d28d2" />
          <div>
            <h2 className="heading-md">
              Here’s where you add course content—like lectures, course
              sections, assignments, and more. Click a + icon on the left to get
              started.
            </h2>
          </div>
        </div>
        <p className="mt-[3.2rem]">
          Start putting together your course by creating sections, lectures and
          practice activities (quizzes, coding exercises and assignments). Use
          your course outline to structure your content and label your sections
          and lectures clearly. If you’re intending to offer your course for
          free, the total length of video content must be less than 2 hours.
        </p>

        <div className="py-[1.9rem] px-2 bg-[#f6f7f9] border border-[#9194ac]">
          <div>
            <div className="flex items-center gap-x-2">
              <span className="font-bold">%status% Section: </span>
              <span className="flex gap-x-1 items-center">
                <File size={20} /> %Section name%
              </span>
            </div>
            <div className="border border-[#9194ac] gap-x-2 py-[1.1rem] px-2 bg-white flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex items-center gap-x-1">
                  <CircleCheck size={20} /> Lecture 1:
                </div>
                <div className="flex items-center gap-x-1 ms-1">
                  <File size={20} /> %lecture name%
                </div>
              </div>
              {/* add content button and form */}
              <Button
                height="md"
                variant="secondary"
                onClick={() =>
                  setCurrentForm((curr) =>
                    curr === "video-form" ? null : "video-form"
                  )
                }
              >
                <Plus /> Content
              </Button>
            </div>
            <AddVideoForm fileInputRef={fileInputRef} />
            {/* select curriculum item button and form */}
            <Button
              variant={
                currentForm === "curriculum-item-types" ? "ghost" : "secondary"
              }
              height="md"
              className="font-bold min-w-0 mt-6 mb-3"
              onClick={() =>
                setCurrentForm((curr) =>
                  curr === "curriculum-item-types"
                    ? null
                    : "curriculum-item-types"
                )
              }
            >
              {currentForm === "curriculum-item-types" ? (
                <X />
              ) : (
                <>
                  <Plus color="#303141" /> Curriculum item
                </>
              )}
            </Button>
            {currentForm === "curriculum-item-types" && (
              <AddCurriculumItemForm />
            )}
          </div>
        </div>

        {/* new section button and form */}
        <Button
          variant={currentForm === "new-section" ? "ghost" : "secondary"}
          height="md"
          className="font-bold min-w-0 mt-6 mb-3"
          onClick={() =>
            setCurrentForm((curr) =>
              curr === "new-section" ? null : "new-section"
            )
          }
        >
          {currentForm === "new-section" ? (
            <X />
          ) : (
            <>
              <Plus color="#303141" /> Section
            </>
          )}
        </Button>
        {currentForm === "new-section" && (
          <NewSectionForm setCurrentForm={setCurrentForm} />
        )}
      </div>
      {/* <CldImage
        src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
        width="500" // Transform the image: auto-crop to square aspect_ratio
        height="500"
        crop={{
          type: "auto",
          source: true,
        }}
      /> */}
    </PageCard>
  );
}

function NewSectionForm({
  setCurrentForm,
}: {
  setCurrentForm: Dispatch<
    SetStateAction<"new-section" | "curriculum-item-types" | null>
  >;
}) {
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionLearningObjective, setNewSectionLearningObjective] =
    useState("");

  function handleCancel() {
    setCurrentForm(null);
    setNewSectionTitle("");
    setNewSectionLearningObjective("");
  }
  return (
    <form action="" className="border border-[#9194ac] p-4 gap-2 flex gap-x-6">
      <div className="font-bold">New Section:</div>
      <div className="flex flex-col grow">
        <label className="flex flex-col mb-3">
          <span className="text-nowrap">What is the title of the course?</span>
          <Input
            content={newSectionTitle}
            setContent={setNewSectionTitle}
            limit={80}
            className="w-full mt-2"
            placeholder="Enter a Title"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-nowrap">
            What will students be able to do at the end of this section?
          </span>
          <Input
            content={newSectionLearningObjective}
            setContent={setNewSectionLearningObjective}
            limit={200}
            className="mt-2"
            placeholder="Enter a Learning Objective"
          />
        </label>
        <div className="flex self-end mt-4 gap-x-3">
          <Button
            variant="ghost"
            height="md"
            className="hover:bg-gray-200 px-2 w-fit min-w-0"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="primary" height="md" type="submit">
            Add Section
          </Button>
        </div>
      </div>
    </form>
  );
}

function AddCurriculumItemForm() {
  const [currentForm, setCurrentForm] = useState<"lecture" | "quiz" | null>(
    null
  );
  const [lectureTitle, setLectureTitle] = useState("");

  return (
    <>
      {currentForm === null && (
        <div className="border border-dashed border-[#9194ac] bg-white py-2 px-4 flex flex-wrap">
          <Button
            variant="ghost"
            height="sm"
            className="text-udemy-purple flex items-center font-bold min-w-0 p-1"
            onClick={() => setCurrentForm("lecture")}
          >
            <Plus size={20} />{" "}
            <span className="inline-block h-fit">Lecture</span>
          </Button>
        </div>
      )}
      {currentForm === "lecture" && (
        <form className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <span>New Lecture: </span>
            <Input
              placeholder="Enter a Title"
              limit={80}
              className="grow"
              content={lectureTitle}
              setContent={setLectureTitle}
            />
          </div>
          <div className="flex self-end mt-4 gap-x-3">
            <Button
              variant="ghost"
              height="md"
              className="hover:bg-gray-200 px-2 w-fit min-w-0"
              onClick={() => setCurrentForm(null)}
            >
              Cancel
            </Button>
            <Button variant="primary" height="md" type="submit">
              Add Lecture
            </Button>
          </div>
        </form>
      )}
      {currentForm === "quiz" && <form></form>}
    </>
  );
}

function AddVideoForm({ fileInputRef }) {
  const [selectedVideo, setSelectedVideo] = useState<File | undefined>(
    undefined
  );
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  return (
    <form
      // action={uploadVideo}
      className="flex bg-white px-2 py-4 items-center justify-between gap-x-4"
    >
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
          onChange={(e) => setSelectedVideo(e.target.files?.[0])}
          ref={fileInputRef}
        />
        <span>{selectedVideo ? selectedVideo.name : "No file selected"}</span>
      </label>
      <Button
        type="button"
        variant="secondary"
        height="md"
        className="font-bold"
        onClick={() => fileInputRef.current.click()}
      >
        Select video
      </Button>
      {/* <button type="button" onClick={handleUpload}>
        upload
      </button> */}

      <div>{uploadProgress}</div>
    </form>
  );
}
