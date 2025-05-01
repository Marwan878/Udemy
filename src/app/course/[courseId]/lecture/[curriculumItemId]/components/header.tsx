import { fetchCourseName } from "@/actions/courses";
import Logo from "@/components/udemy-logo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Header({ courseId }: { courseId: string }) {
  const title = await fetchCourseName(courseId);

  return (
    <header className="pe-[1.6rem] sm:px-4 h-[5.6rem] border-b border-b-[#595c73] bg-[#1d1e27] w-full">
      <div className="flex items-center h-full">
        <Logo color={"white"} className="hidden sm:block" />
        <div className="hidden sm:block w-px h-2/5 border-s-[#595c73] border-s mx-6" />
        <Link
          className="w-[5.2rem] h-full py-[1.2rem] px-4 sm:px-0 block sm:hidden"
          href={"/my-courses/learning"}
        >
          <ArrowLeft color="white" className="sm:hidden" />
        </Link>

        <p className="flex-1 text-ellipsis whitespace-nowrap overflow-hidden text-white ms-3 sm:ms-0">
          {title}
        </p>
      </div>
    </header>
  );
}
