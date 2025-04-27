export default function WhoThisCourseIsFor({
  whoThisCourseIsFor,
}: {
  whoThisCourseIsFor: string[];
}) {
  return (
    <div>
      <h2 className="heading-xl">Who this course is for</h2>
      <ul className="list-disc py-1">
        {whoThisCourseIsFor.map((target) => (
          <li key={target} className="min-h-4 ms-4">
            {target}
          </li>
        ))}
      </ul>
    </div>
  );
}
