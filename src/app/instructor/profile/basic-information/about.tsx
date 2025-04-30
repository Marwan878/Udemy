"use client";

import { RichTextEditor } from "@/components/general";
import { useState } from "react";

export default function About({
  defaultValue,
}: {
  defaultValue: string | undefined;
}) {
  const [about, setAbout] = useState(defaultValue ?? "");

  return (
    <div className="mb-6">
      <label htmlFor="biography" className="block text-sm font-medium mb-2">
        Biography
      </label>
      <RichTextEditor value={about} onChange={setAbout} />
      <input type="hidden" value={about} name="about" />
    </div>
  );
}
