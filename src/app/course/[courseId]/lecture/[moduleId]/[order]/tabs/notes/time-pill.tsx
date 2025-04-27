import { formatVideoTime } from "@/lib/utils";

export default function TimePill({ timeInSeconds }: { timeInSeconds: number }) {
  return (
    <span className="inline-block min-w-20 heading-sm bg-[#16161d] h-6 leading-[2.4rem] px-2 rounded-l-full rounded-r-full text-white">
      {formatVideoTime(timeInSeconds)}
    </span>
  );
}
