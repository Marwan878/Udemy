import { Button, ProgressBar } from "@/components/general";
import { COURSE_CREATION_STEPS_COUNT } from "@/constants";
import Link from "next/link";
import Logo from "@/components/udemy-logo";

export default function Header({ step }: { step: number }) {
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
