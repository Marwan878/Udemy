import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/general";

export default function Step1({
  title,
  setTitle,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <h1 className="heading-serif-2xl font-bold leading-[1.25] tracking-[-0.016rem]">
        How about a working title?
      </h1>
      <p className="mt-6">
        It's ok if you can't think of a good title now. You can change it later.
      </p>
      <Input
        className="mt-[6.4rem] w-[62rem] max-w-full"
        limit={60}
        placeholder="e.g. Learn Photoshop CS6 from Scratch"
        content={title}
        setContent={setTitle}
      />
    </>
  );
}
