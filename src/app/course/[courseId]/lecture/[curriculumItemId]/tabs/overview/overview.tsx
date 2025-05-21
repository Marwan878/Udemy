"use client";

import { fetchCourses, fetchModulesWithContent } from "@/actions/courses";
import { Button, MaxWidthWrapper } from "@/components/general";
import { secondsToHours } from "@/lib/utils";
import { TCourse, TModule, TUser } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import ByTheNumbers from "./by-the-numbers";
import CourseDuration from "./course-duration";
import Description from "./description";
import Instructor from "./instructor";
import Language from "./language";
import Rating from "./rating";
import ScheduleCTA from "./schedule-cta";
import StudentsCount from "./students-count";
import UpdatedAt from "./updated-at";

export default function Overview({ courseId }: { courseId: string }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [courseData, setCourseData] = useState<
    (TCourse & { instructor: TUser }) | null
  >(null);
  const [modules, setModules] = useState<TModule[]>([]);

  const { courseDuration, lecturesCount } =
    computeLecturesCountAndCourseDuration();

  function computeLecturesCountAndCourseDuration() {
    let lecturesCount = 0,
      courseDuration = 0;

    modules.forEach((module) => {
      module.content.forEach((curriculumItem) => {
        if (curriculumItem.type === "video") {
          lecturesCount++;
        }
        courseDuration += curriculumItem.duration;
      });
    });

    return { lecturesCount, courseDuration };
  }

  useEffect(() => {
    const handleLoad = async () => {
      const [courseData] = await fetchCourses([courseId]);
      const modules = await fetchModulesWithContent(courseId);
      setModules(modules);
      setCourseData(courseData);
    };

    handleLoad();
  }, [courseId]);

  if (courseData === null) return;

  const {
    title,
    rating,
    ratingCount,
    studentsCount,
    hasCaptions,
    language,
    whatYouWillLearn,
    whoThisCourseIsFor,
    requirements,
    leadHeadline,
  } = courseData;

  return (
    <>
      <div>
        <MaxWidthWrapper className="pt-[1.6rem]">
          <p className="mb-[1.6rem] text-xl">{title}</p>
          <div className="mb-[1.6rem] flex">
            <Rating rating={rating} ratingCount={ratingCount} />
            <StudentsCount studentsCount={studentsCount} />
            <CourseDuration totalHours={secondsToHours(courseDuration)} />
          </div>
          <div>
            {courseData?.updatedAt && (
              <UpdatedAt updatedAt={courseData.updatedAt} />
            )}
            <Language language={language} />
          </div>
          <ScheduleCTA />
        </MaxWidthWrapper>
      </div>
      <dl className={isCollapsed ? "course-overview-mask" : ""}>
        <ByTheNumbers
          studentsCount={studentsCount}
          hasCaptions={hasCaptions}
          lecturesCount={lecturesCount}
        />
        {!isCollapsed && (
          <>
            <Description
              leadHeadline={leadHeadline}
              requirements={requirements}
              whatYouWillLearn={whatYouWillLearn}
              whoThisCourseIsFor={whoThisCourseIsFor}
            />
            <Instructor instructor={courseData.instructor} />
          </>
        )}
      </dl>
      <Button
        className="ms-6 mb-6 heading-sm text-udemy-purple"
        variant="ghost"
        height="md"
        onClick={() => setIsCollapsed((curr) => !curr)}
      >
        {isCollapsed ? (
          <>
            Show more{" "}
            <ChevronDown
              className="ms-[0.4rem] h-[1.6rem] w-[1.6rem]"
              color="#6d28d2"
              aria-hidden
            />
          </>
        ) : (
          <>
            Show less{" "}
            <ChevronUp
              className="ms-[0.4rem] h-[1.6rem] w-[1.6rem]"
              color="#6d28d2"
              aria-hidden
            />
          </>
        )}
      </Button>
    </>
  );
}
