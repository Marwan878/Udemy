import { TLevel } from "@/types";

export default function ByTheNumbers({
  studentsCount,
  hasCaptions,
  lecturesCount,
  courseDuration,
  skillLevel,
  language,
}: {
  studentsCount: number;
  lecturesCount: number;
  hasCaptions: boolean;
  courseDuration: number;
  skillLevel: TLevel;
  language: string;
}) {
  return (
    <div className="border-t border-[#d1d2e0] p-[2.4rem] flex flex-col lg:flex-row">
      <dt className="lg:w-1/4">By the numbers</dt>
      <dd className="lg:w-1/3">
        <div>Skill level: {skillLevel}</div>
        <div>Students: {studentsCount.toLocaleString()}</div>
        <div>Language: {language}</div>
      </dd>
      <dd className="lg:w-1/3">
        <div>Captions: {hasCaptions ? "Yes" : "No"}</div>
        <div>Lectures: {lecturesCount}</div>
        <div>Video: {courseDuration} total hours</div>
      </dd>
    </div>
  );
}
