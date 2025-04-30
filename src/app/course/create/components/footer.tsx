import {
  addCourseToAppropriateCategory,
  addCourseToPublishedCourses,
  createCourse,
} from "@/actions/courses";
import { Button } from "@/components/general";
import { COURSE_CREATION_STEPS_COUNT } from "@/constants";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function Footer({
  title,
  step,
  setStep,
  category,
}: {
  title: string;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  category: string;
}) {
  const router = useRouter();

  const handleNext = async () => {
    if (step === COURSE_CREATION_STEPS_COUNT) {
      const newCourseId = await createCourse(title, category);
      await addCourseToAppropriateCategory(newCourseId, category);
      await addCourseToPublishedCourses(newCourseId);

      router.replace(`/course/${newCourseId}/manage/basics`);
    } else {
      setStep((prev) => Math.min(COURSE_CREATION_STEPS_COUNT, prev + 1));
    }
  };
  const handlePrevious = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };
  const isDisabled = () => {
    if (step === 1) {
      return title.trim() === "";
    }
    return category === "";
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
        variant="primary"
        height="md"
        className="heading-sm disabled:cursor-not-allowed disabled:bg-udemy-purple/20"
        onClick={handleNext}
        disabled={isDisabled()}
      >
        {step === COURSE_CREATION_STEPS_COUNT ? "Create course" : "Continue"}
      </Button>
    </footer>
  );
}
