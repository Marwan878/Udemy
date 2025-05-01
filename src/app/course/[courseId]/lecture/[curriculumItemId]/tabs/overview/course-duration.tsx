export default function CourseDuration({ totalHours }: { totalHours: number }) {
  return (
    <div className="ms-[3.2rem] flex flex-col items-start">
      <div className="heading-md">{totalHours} hour(s)</div>
      <span className="text-[#595c73] text-xs">Total</span>
    </div>
  );
}
