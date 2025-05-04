import { fetchLearnerCourses } from "@/actions/user";
import { Button, ProgressBar } from "@/components/general";
import Popper from "@/components/general/popper";
import Link from "next/link";

export default async function MyLearning() {
  const learnerCourses = await fetchLearnerCourses();

  return (
    <Popper>
      <Popper.Trigger>
        <Button
          as={Link}
          href="/my-courses/learning"
          variant="ghost"
          className="font-normal px-4"
        >
          My learning
        </Button>
      </Popper.Trigger>
      {learnerCourses.length > 0 && (
        <Popper.Content>
          <ul>
            {learnerCourses.map((course) => (
              <li key={course.id}>
                <Link
                  className="flex gap-x-2 items-center px-4"
                  href={`/course/${course.id}/lecture`}
                >
                  <img
                    src={course.imageUrl}
                    alt={`${course.title} cover image`}
                    className="w-24 aspect-square rounded-md object-cover"
                  />
                  <div className="basis-3/4 shrink-0">
                    <p className="text-start font-bold leading-6 mb-2">
                      {course.title}
                    </p>

                    {course.completedCurriculumItemsIds.length === 0 ? (
                      <p className="text-udemy-purple font-bold text-start">
                        Start Learning
                      </p>
                    ) : (
                      <ProgressBar
                        progress={
                          (course.completedCurriculumItemsIds.length /
                            course.length) *
                          100
                        }
                      />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Popper.Content>
      )}
    </Popper>
  );
}
