import { fetchLearnerCourses } from "@/actions/user";
import { MaxWidthWrapper, ProgressBar } from "@/components/general";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Rating from "./rating/rating";

export default async function Page() {
  const learnerCourses = await fetchLearnerCourses();

  return (
    <MaxWidthWrapper className="pt-[1.6rem] min-h-screen">
      <div className="mx-[-0.8rem] grid grid-cols-1 sm:grid-cols-2 gap-[2.4rem] md:grid-cols-3 xl:grid-cols-4">
        {learnerCourses.length > 0 ? (
          learnerCourses.map(
            ({ id, imageUrl, instructor, title, userRating, userProgress }) => (
              <Link
                key={id}
                href={`/course/${id}/lecture`}
                className="group/outer cursor-pointer gap-[0.8rem] mx-auto flex flex-col relative w-full"
              >
                <div className="relative h-[22rem]">
                  <Image
                    fill
                    objectFit="cover"
                    className="aspect-video group-hover/outer:opacity-80"
                    src={imageUrl}
                    alt={`${title} cover image`}
                  />
                  <div className="w-[4.8rem] h-[4.8rem] hidden group-hover/outer:flex rounded-full justify-center items-center bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <PlayIcon />
                  </div>
                </div>
                <div>
                  <h3 className="line-clamp-2 text-ellipsis heading-md mb-[0.4rem]">
                    {title}
                  </h3>
                  <div className="text-xs mb-2">
                    {instructor.firstName + " " + instructor.lastName}
                  </div>
                  <ProgressBar progress={userProgress} />
                  <div className="flex justify-between text-xs mt-1">
                    <span>
                      {userProgress > 0
                        ? `${Math.floor(userProgress)}% complete`
                        : "START COURSE"}
                    </span>
                    <Rating
                      courseId={id}
                      userProgress={userProgress}
                      userRating={userRating}
                    />
                  </div>
                </div>
              </Link>
            )
          )
        ) : (
          <p className="text-xl mx-auto my-12">
            You don't have any courses yet, start your learning journey now and
            shine!
          </p>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
