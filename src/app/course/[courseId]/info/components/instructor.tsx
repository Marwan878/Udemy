import { TUser } from "@/types";
import { Award, PlayCircle, Star, Users } from "lucide-react";

export default function Instructor({
  instructor: {
    firstName,
    lastName,
    bio,
    about,
    imageUrl,
    coursesCount,
    rating,
    reviewsCount,
    studentsCount,
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
          <img
            src={
              imageUrl ||
              "https://img-c.udemycdn.com/user/200_H/anonymous_3.png"
            }
            alt={`${firstName} ${lastName} personal image.`}
            className="h-44 w-44 rounded-full object-cover"
          />

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              <span>{rating} Instructor Rating</span>
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1" />
              <span>{reviewsCount.toLocaleString()} Review(s)</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{studentsCount.toLocaleString()} Student(s)</span>
            </div>
            <div className="flex items-center">
              <PlayCircle className="h-4 w-4 mr-1" />
              <span>{coursesCount} Course(s)</span>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
}
