"use client";

import { rateCourse } from "@/actions/user";
import { Button, StarRating } from "@/components/general";
import { RATING_DESCRIPTIONS } from "@/constants";
import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function RatingModal({
  onClose,
  userRating,
  courseId,
}: {
  onClose: () => void;
  userRating: number;
  courseId: string;
}) {
  const [rating, setRating] = useState<number>(userRating);
  return createPortal(
    <div
      className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center rounded-[1.6rem] bg-white p-[2.4rem] pt-24 z-[1000] min-w-[45rem]"
      onClick={(e) => e.preventDefault()}
    >
      <Button
        variant="ghost"
        height="md"
        className="w-12 aspect-square absolute right-4 top-4"
        onClick={onClose}
      >
        <X />
      </Button>
      <h2 className="heading-2xl text-center mb-2">
        How would you rate this course?
      </h2>
      <div className="mb-4 heading-md">Select Rating</div>
      <p className="heading-md mb-2">{RATING_DESCRIPTIONS[rating]}</p>
      <StarRating
        rating={rating}
        setRating={setRating}
        size={45}
        className="gap-x-6"
        showRating={false}
        color="#f69c08"
        readOnly={false}
      />
      {rating && (
        <Button
          className="mt-6 ms-auto"
          onClick={() => {
            rateCourse(rating, courseId);
            onClose();
          }}
        >
          Save and Exit
        </Button>
      )}
    </div>,
    document.body
  );
}
