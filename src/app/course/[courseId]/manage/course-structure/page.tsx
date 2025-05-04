import {
  COURSE_CREATION_REQUIREMENTS,
  COURSE_CREATION_TIPS,
} from "@/constants";
import PageCard from "../page-card";
import Image from "next/image";

export default function Page() {
  return (
    <PageCard heading="Course structure" className="pb-4">
      <div className="bg-[#f6f7f9] -mx-[4.8rem]">
        <div className="lg:flex justify-between items-center">
          <div className="grow-[8] py-6 px-[4.8rem]">
            <h3 className="heading-xl">
              There's a course in you. Plan it out.
            </h3>
            <p className="mt-[3.2rem] text-lg">
              Planning your course carefully will create a clear learning path
              for students and help you once you film. Think down to the details
              of each lecture including the skill you’ll teach, estimated video
              length, practical activities to include, and how you’ll create
              introductions and summaries.
            </p>
          </div>
          <div className="bg-white mt-[3.2rem] py-[3.2rem] px-6 flex flex-col items-center grow-[4] lg:me-[4.8rem] w-fit mx-auto">
            <div className="relative w-32 h-32 mb-6">
              <Image
                src={"/images/planning.jpg"}
                className="object-cover"
                alt=""
                fill
              />
            </div>
            <p className="text-center">
              Remember that planning is the key to success
            </p>
          </div>
        </div>
      </div>
      <div className="py-[4.8rem]">
        <h2 className="heading-xl">Tips</h2>
        <ul>
          {COURSE_CREATION_TIPS.map((tip) => (
            <li className="" key={tip.title}>
              <h3 className="heading-md mt-8 mb-2">{tip.title}</h3>
              <p>{tip.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col -mt-8">
        <h2 className="mt-[6.4rem] heading-xl">Requirements</h2>
        <ul className="list-disc list-inside mt-[3.2rem]">
          {COURSE_CREATION_REQUIREMENTS.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </div>
    </PageCard>
  );
}
