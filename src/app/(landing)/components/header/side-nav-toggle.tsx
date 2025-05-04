"use client";

import RoundButton from "@/components/general/round-button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideNavToggle() {
  const [sideNavIsOpen, setSideNavIsOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.remove("sidebar-open");
  }, [pathname]);

  return (
    <>
      <button
        className="lg:hidden w-16 px-4 btn-ghost btn-md btn hover:bg-btn-focus"
        onClick={() => {
          setSideNavIsOpen(true);
          document.body.classList.add("sidebar-open");
        }}
        aria-label="Open side navigation"
      >
        <Menu aria-hidden />
      </button>

      {sideNavIsOpen && <div className="fixed inset-0 bg-black/60 z-50" />}
      <aside
        className={cn(
          "absolute left-0 z-[1000] top-0 -translate-x-full h-screen transition-transform select-none max-w-[78%] w-[28rem]",
          { "translate-x-0": sideNavIsOpen }
        )}
      >
        <div className="bg-white h-screen w-full absolute left-0 top-0 z-50">
          <div className="flex flex-col h-full">
            <SignedIn>
              <div className="p-4 flex bg-[#f6f7f9]">
                <UserButton
                  appearance={{
                    elements: { userButtonAvatarBox: "w-24 h-24 me-2" },
                  }}
                />
                <div>
                  <p className="text-[#2a2b3f] heading-md">
                    Hi, {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-[#595c73] text-sm">Welcome back</p>
                </div>
              </div>
              <div className="pe-1">
                <Link
                  href="/instructor"
                  className="text-udemy-purple w-full inline-block p-2 my-2 hover:bg-btn-focus rounded-e-lg"
                >
                  Switch to instructor view
                </Link>
              </div>
              <h2 className="border-t border-t-[#d1d2e0] text-[#595c73] p-[1.6rem] pb-0 mb-[-0.4rem] heading-sm">
                Learn
              </h2>
              <div className="pe-1">
                <Link
                  href="/my-courses/learning"
                  className="w-full inline-block p-2 my-2 hover:bg-btn-focus rounded-e-lg"
                >
                  My learning
                </Link>
              </div>
            </SignedIn>
            <SignedOut>
              <ul className="py-[0.8rem]">
                <li className="px-[1.6rem] text-udemy-purple font-bold hover:bg-btn-focus py-[0.8rem] cursor-pointer">
                  <Link href="/sign-in">Log in</Link>
                </li>
                <li className="px-[1.6rem] text-udemy-purple font-bold hover:bg-btn-focus py-[0.8rem] cursor-pointer">
                  <Link href="/sign-up">Sign up</Link>
                </li>
              </ul>
            </SignedOut>
          </div>
          <div
            className={cn(
              "flex items-center justify-center w-0 h-0 absolute -right-20 top-4",
              { "w-16 h-16": sideNavIsOpen }
            )}
          >
            <RoundButton
              onClick={() => {
                setSideNavIsOpen(false);
                document.body.classList.remove("sidebar-open");
              }}
              style={{ animationFillMode: "forwards", width: "0", height: "0" }}
              className={cn(
                "bg-white rounded-full flex justify-center items-center delay-100",
                { "animate-grow": sideNavIsOpen }
              )}
            >
              <X />
            </RoundButton>
          </div>
        </div>
      </aside>
    </>
  );
}
