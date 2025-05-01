export default function ByTheNumbers({
  studentsCount,
  hasCaptions,
  lecturesCount,
}: {
  studentsCount: number;
  lecturesCount: number;
  hasCaptions: boolean;
}) {
  return (
    <div className="border-t border-[#d1d2e0] p-[2.4rem] flex flex-col lg:flex-row">
      <dt className="lg:w-1/4">By the numbers</dt>
      <dd className="lg:w-1/3">
        <div>Skill level: Beginner Level</div>
        <div>Students: {studentsCount.toLocaleString()}</div>
        <div>Language: English</div>
      </dd>
      <dd className="lg:w-1/3">
        <div>Captions: {hasCaptions ? "Yes" : "No"}</div>
        <div>Lectures: {lecturesCount}</div>
        <div>Video: 13 total hours</div>
      </dd>
    </div>
  );
}
