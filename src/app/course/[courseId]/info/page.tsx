import { fetchCourses } from "@/actions/courses";
import Hero from "./components/hero";
import WhatYouWillLearn from "./components/what-you-will-learn";
import PurchaseBox from "./components/purchase-box";
import Requirements from "./components/requirements";
import { MaxWidthWrapper } from "@/components/general";
import Description from "./components/description";
import WhoThisCourseIsFor from "./components/who-this-course-is-for";
import Instructor from "./components/instructor";
import SideCard from "./components/side-card";
import SliderMenu from "./components/slider-menu";

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const [course] = await fetchCourses([courseId]);

  return (
    <>
      <Hero course={course} />
      <MaxWidthWrapper className="relative space-y-12 mb-32 flex gap-x-8">
        <div className="grow space-y-20">
          <WhatYouWillLearn outcomes={course.whatYouWillLearn} />
          <PurchaseBox course={course} />
          <Requirements requirements={course.requirements} />
          <Description description={course.description} />
          <WhoThisCourseIsFor whoThisCourseIsFor={course.whoThisCourseIsFor} />
          <Instructor instructor={course.instructor} />
        </div>
        <SideCard
          courseImage={course.imageUrl}
          coursePrice={course.price}
          courseId={course.id}
        />
      </MaxWidthWrapper>
      <SliderMenu course={course} />
    </>
  );
}
