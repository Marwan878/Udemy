"use client";

import { COURSE_MANAGEMENT_SIDE_NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseManagementSidebar() {
  const { courseId } = useParams();
  const pathname = usePathname();

  return (
    <aside className="basis-1/3 max-w-[28rem] hidden lg:block">
      <nav className="space-y-4">
        {Object.entries(COURSE_MANAGEMENT_SIDE_NAV_LINKS).map(
          ([groupName, links]) => (
            <div key={groupName}>
              <div className="heading-md mb-2">{groupName}</div>
              <ul>
                {links.map((link) => (
                  <li
                    key={link.displayName}
                    className={cn(
                      "my-2 h-8 hover:bg-gray-100 flex items-center border-s-4 border-s-transparent -translate-x-6",
                      {
                        "border-s-[#1d1e27]": pathname.includes(
                          link.href.slice(1)
                        ),
                      }
                    )}
                  >
                    <Link
                      href={`/course/${courseId}/manage${link.href}`}
                      className="w-full h-full flex items-center"
                    >
                      <div className="border border-[#1d1e27] rounded-full h-5 aspect-square ms-6 me-4 flex items-center justify-center">
                        <Check size={12} color="#1d1e27" />
                      </div>
                      {link.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </nav>
    </aside>
  );
}
