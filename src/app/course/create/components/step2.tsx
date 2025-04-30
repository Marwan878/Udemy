import { Select } from "@/components/general";
import { CATEGORIES } from "@/constants";
import { Dispatch, SetStateAction } from "react";

export default function Step2({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <h1 className="heading-serif-2xl font-bold leading-[1.25] tracking-[-0.016rem]">
        What category best fits the knowledge you'll share?
      </h1>
      <p className="mt-6">
        If you're not sure about the right category, you can change it later.
      </p>
      <Select
        className="mt-[6.4rem] w-[62rem] max-w-full appearance-none"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        name="category"
        options={[
          { displayName: "Choose a category", value: "" },
          ...CATEGORIES,
        ]}
      />
    </>
  );
}
