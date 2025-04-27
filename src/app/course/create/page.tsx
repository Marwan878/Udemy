"use client";

import { Button, MaxWidthWrapper, ProgressBar } from "@/components/general";
import Input from "@/components/general/input";
import Select from "@/components/general/select";
import Logo from "@/components/udemy-logo";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

const COURSE_CREATION_STEPS_COUNT = 2;

export default function Page() {
  const [step, setStep] = useState(2);
  const [title, setTitle] = useState("dwdw");
  const [category, setCategory] = useState("");

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Header step={step} />

      <main className="overflow-auto">
        <MaxWidthWrapper className="py-[6.4rem] px-6 flex flex-col items-center">
          {step === 1 && <Step1 title={title} setTitle={setTitle} />}
          {step === 2 && (
            <Step2 setCategory={setCategory} category={category} />
          )}
        </MaxWidthWrapper>
      </main>

      <Footer title={title} step={step} setStep={setStep} category={category} />
    </div>
  );
}

function Header({ step }: { step: number }) {
  return (
    <header className="flex flex-col">
      <div className="flex h-[5.6rem] px-6 items-center">
        <Logo color="black" />
        <div className="h-full w-px bg-gray-400 mx-6" />
        <div className="flex items-center justify-between flex-1">
          <p className="text-lg">
            Step {step} of {COURSE_CREATION_STEPS_COUNT}
          </p>
          <Button
            height="md"
            as={Link}
            href={"/instructor"}
            variant="ghost"
            className="min-w-0 text-udemy-purple font-bold px-2"
          >
            Exit
          </Button>
        </div>
      </div>
      <ProgressBar progress={(step * 100) / COURSE_CREATION_STEPS_COUNT} />
    </header>
  );
}

function Step1({
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

function Step2({
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
        options={[
          {
            label: "Choose a category",
            value: "",
          },
          {
            label: "Category 1",
            value: "category-1",
          },
          {
            label: "Category 2",
            value: "category-2",
          },
          {
            label: "Category 3",
            value: "category-3",
          },
        ]}
      />
    </>
  );
}

function Footer({
  title,
  step,
  setStep,
  category,
}: {
  title: string;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const handleNext = () => {
    setStep((prev) => Math.min(COURSE_CREATION_STEPS_COUNT, prev + 1));
  };
  const handlePrevious = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <footer className="py-4 px-6 flex justify-between shadow-[0_-2px_4px_rgba(6,17,118,0.08),0_-4px_12px_rgba(6,17,118,0.08)]">
      {step > 1 && (
        <Button
          variant="secondary"
          height="md"
          className="heading-sm disabled:cursor-not-allowed disabled:bg-udemy-purple/20"
          onClick={handlePrevious}
        >
          Previous
        </Button>
      )}
      <Button
        as={step === COURSE_CREATION_STEPS_COUNT ? Link : "button"}
        href={step === COURSE_CREATION_STEPS_COUNT ? "/instructor" : undefined}
        variant="primary"
        height="md"
        className="heading-sm disabled:cursor-not-allowed disabled:bg-udemy-purple/20"
        onClick={handleNext}
        disabled={title.trim() === "" || category === ""}
      >
        {step === COURSE_CREATION_STEPS_COUNT ? "Create course" : "Continue"}
      </Button>
    </footer>
  );
}
