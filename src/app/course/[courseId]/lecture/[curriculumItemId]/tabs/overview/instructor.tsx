import { TUser } from "@/types";
import Image from "next/image";

export default function Instructor({ instructor }: { instructor: TUser }) {
  return (
    <div className="border-t border-[#d1d2e0] p-[2.4rem] flex">
      <dt className="w-1/4">Instructor</dt>
      <dd className="max-sm:ps-[0.8rem] w-3/4">
        <div className="flex mb-[2.4rem]">
          <div className="flex-shrink-0 self-center w-[6.4rem] h-[6.4rem] border border-[#d1d2e0] rounded-full">
            <Image
              src={instructor.imageUrl}
              className=" object-cover"
              alt={`${
                instructor.firstName + " " + instructor.lastName
              } profile picture`}
              fill
            />
          </div>
          <div className="ms-[2.4rem]">
            <a href="" className="heading-lg text-[#303141]">
              {instructor.firstName + " " + instructor.lastName}
            </a>
            <p>{instructor.bio}</p>
          </div>
        </div>
        <p>{instructor.about}</p>
      </dd>
    </div>
  );
}
