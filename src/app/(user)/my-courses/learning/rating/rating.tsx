"use client";

import { StarRating } from "@/components/general";
import { useState } from "react";
import RatingModal from "./rating-modal";

export default function Rating({
  userProgress,
  userRating,
  courseId,
}: {
  userProgress: number;
  userRating: number;
  courseId: string;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex flex-col items-end group/inner"
        onClick={(e) => {
          e.preventDefault();
          document.body.classList.add("overlay");
          setModalIsOpen(true);
        }}
      >
        {userProgress > 0 && (
          <>
            <StarRating rating={userRating} />
            {userRating > 0 ? (
              <>
                <span className="group-hover/inner:hidden">Your rating</span>
                <span className="hidden group-hover/inner:inline">
                  Edit rating
                </span>
              </>
            ) : (
              <span className="">Leave a rating</span>
            )}
          </>
        )}
      </button>
      {modalIsOpen && (
        <RatingModal
          courseId={courseId}
          userRating={userRating}
          onClose={() => {
            setModalIsOpen(false);
            document.body.classList.remove("overlay");
          }}
        />
      )}
    </>
  );
}
