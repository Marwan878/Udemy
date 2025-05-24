"use client";

import { COURSE_MANAGEMENT_SIDE_NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { Check, Menu, X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/general";

export default function MobileCourseManagementNav() {
  const { courseId } = useParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        className="min-w-0 px-2 lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open course management options."
      >
        <Menu size={28} className="text-udemy-purple" aria-hidden />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[200] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-96 max-w-[85vw] bg-white z-[201] transform transition-transform duration-300 ease-in-out lg:hidden shadow-xl",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          }
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="heading-md text-gray-900">Course Management</h2>
          <Button
            variant="ghost"
            className="min-w-0 p-2"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} aria-hidden />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 overflow-y-auto h-full">
          <div className="space-y-6">
            {Object.entries(COURSE_MANAGEMENT_SIDE_NAV_LINKS).map(
              ([groupName, links]) => (
                <div key={groupName}>
                  <div className="heading-md mb-3 text-gray-900">
                    {groupName}
                  </div>
                  <ul className="space-y-1">
                    {links.map((link) => {
                      const isActive = pathname.includes(link.href.slice(1));

                      return (
                        <li key={link.displayName}>
                          <Link
                            href={`/course/${courseId}/manage${link.href}`}
                            className={cn(
                              "flex items-center py-3 px-3 rounded-lg transition-colors duration-200 hover:bg-gray-100",
                              {
                                "bg-purple-50 border-l-4 border-l-udemy-purple text-udemy-purple":
                                  isActive,
                                "text-gray-700": !isActive,
                              }
                            )}
                          >
                            <div
                              className={cn(
                                "border rounded-full h-5 w-5 mr-3 flex items-center justify-center flex-shrink-0",
                                {
                                  "border-udemy-purple bg-udemy-purple":
                                    isActive,
                                  "border-gray-400": !isActive,
                                }
                              )}
                            >
                              <Check
                                size={12}
                                className={cn({
                                  "text-white": isActive,
                                  "text-transparent": !isActive,
                                })}
                                aria-hidden
                              />
                            </div>
                            <span className="truncate font-medium">
                              {link.displayName}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
