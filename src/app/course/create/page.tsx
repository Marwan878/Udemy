"use client";

import { MaxWidthWrapper } from "@/components/general";
import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Step1 from "./components/step1";
import Step2 from "./components/step2";

export default function Page() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
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
