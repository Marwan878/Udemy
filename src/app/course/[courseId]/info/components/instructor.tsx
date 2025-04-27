import { TInstructor } from "@/types";
import { Award, PlayCircle, Star, Users } from "lucide-react";

export default function Instructor({
  instructor: {
    name,
    bio,
    about,
    imageUrl,
    coursesCount,
    rating,
    reviewsCount,
    studentsCount,
  },
}: {
  instructor: TInstructor;
}) {
  return (
    <div id="instructor">
      <h2 className="heading-xl font-bold mb-4">Instructor</h2>

      <h3 className="text-4xl font-bold mb-4">{name}</h3>

      <div className="text-gray-700 mb-4">{bio}</div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-x-8">
          <img
            src={imageUrl}
            alt={name}
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
