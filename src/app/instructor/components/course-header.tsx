import { Button } from "@/components/general";
import Link from "next/link";

export function CourseHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <Button
        as={Link}
        href="/course/create"
        variant="primary"
        height="md"
        className="heading-sm ms-auto"
      >
        New course
      </Button>
    </div>
  );
}
