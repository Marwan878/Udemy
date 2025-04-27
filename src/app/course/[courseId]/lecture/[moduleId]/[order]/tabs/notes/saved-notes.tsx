"use client";

import { deleteNote } from "@/actions/user";
import { Dispatch, SetStateAction, startTransition } from "react";
import SavedNote from "./saved-note";
import { TNote } from "@/types";

export default function SavedNotes({
  courseId,
  notes,
  setNotes,
}: {
  courseId: string;
  notes: TNote[] | undefined;
  setNotes: Dispatch<SetStateAction<TNote[] | undefined>>;
}) {
  const handleNoteDelete = async (noteId: string) => {
    const initialState = notes;

    try {
      startTransition(() => {
        setNotes((prev) => prev?.filter((note) => note.id !== noteId));
      });
      await deleteNote(courseId, noteId);
    } catch (error) {
      console.error(error);
      setNotes(initialState);
    }
  };

  if (!notes) {
    return "Loading notes...";
  }

  if (notes.length === 0) {
    return (
      <p className="mx-auto pt-[6.4rem] text-center">
        Click the "Create a new note" box or the "+" button to make your first
        note.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-y-8">
      {notes.map((note, i) => (
        <SavedNote
          key={i}
          note={note}
          onDelete={() => handleNoteDelete(note.id)}
        />
      ))}
    </div>
  );
}
