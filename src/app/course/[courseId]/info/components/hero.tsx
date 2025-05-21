import { MaxWidthWrapper, StarRating } from "@/components/general";
import { TCourse, TUser } from "@/types";
import { Clock } from "lucide-react";
import Image from "next/image";

export default function Hero({
  course: {
    title,
    imageUrl,
    leadHeadline,
    rating,
    ratingCount,
    studentsCount,
    instructor,
    updatedAt,
  },
}: {
  course: TCourse & { instructor: TUser };
}) {
  return (
    <div className="lg:bg-[#1d1e27] lg:text-white">
      <MaxWidthWrapper className="pt-8 pb-12">
        <div>
          <div className="relative lg:hidden w-full h-[32rem] mb-4">
            <Image
              src={imageUrl}
              className="object-cover"
              alt={`${title} cover image`}
              fill
            />
          </div>
          <h1 className="heading-xl font-bold mb-2">{title}</h1>
          <p className="text-lg mb-4">{leadHeadline}</p>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[#c4710d] lg:hidden flex items-center gap-x-1">
              <StarRating className="w-3 h-3" rating={rating} color="#c4710d" />
            </span>
            <span className="hidden lg:flex text-[#f69c08] items-center gap-x-1">
              <StarRating rating={rating} color="#f69c08" size={15} />
            </span>
            <span>({ratingCount.toLocaleString()} rating(s))</span>
            <span>{studentsCount.toLocaleString()} students</span>
          </div>

          <p className="text-sm mb-4">
            Created by {instructor.firstName + " " + instructor.lastName}
          </p>

          {updatedAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date(updatedAt).toDateString()}</span>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
