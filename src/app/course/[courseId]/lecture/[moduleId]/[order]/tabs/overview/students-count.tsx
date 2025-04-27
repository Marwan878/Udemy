export default function StudentsCount({
  studentsCount,
}: {
  studentsCount: number;
}) {
  return (
    <div className="ms-[3.2rem] flex flex-col items-start">
      <div className="heading-md">{studentsCount.toLocaleString()}</div>
      <span className="text-[#595c73] text-xs">Student(s)</span>
    </div>
  );
}
