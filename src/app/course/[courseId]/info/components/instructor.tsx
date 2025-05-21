import { TUser } from "@/types";
import { PlayCircle, Users } from "lucide-react";
import Image from "next/image";

export default function Instructor({
  instructor: {
    firstName,
    lastName,
    bio,
    about,
    imageUrl,
    studentsCount,
    publishedCoursesIds,
  },
}: {
  instructor: TUser;
}) {
  return (
    <div id="instructor">
      <h2 className="heading-xl font-bold mb-4">Instructor</h2>

      <h3 className="text-4xl font-bold mb-4">{firstName + " " + lastName}</h3>

      <div className="text-gray-700 mb-4">{bio}</div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-x-8">
          <div className="relative h-44 w-44 rounded-full border-gray-400 border">
            <Image
              src={
                imageUrl ||
                "https://img-c.udemycdn.com/user/200_H/anonymous_3.png"
              }
              alt={`${firstName} ${lastName} personal image.`}
              className="object-cover rounded-full"
              fill
            />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{studentsCount.toLocaleString()} Student(s)</span>
            </div>
            <div className="flex items-center">
              <PlayCircle className="h-4 w-4 mr-1" />
              <span>{publishedCoursesIds.length} Course(s)</span>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <p dangerouslySetInnerHTML={{ __html: about }} />
        </div>
      </div>
    </div>
  );
}
