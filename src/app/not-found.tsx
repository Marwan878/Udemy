"use client";

import { MaxWidthWrapper } from "@/components/general";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col items-center">
        <div className="relative w-[48rem] h-[32rem]">
          <Image
            alt=""
            fill
            src="https://s.udemycdn.com/error_page/error-desktop-v1.jpg"
          />
        </div>
        <h1 className="max-w-[48rem] heading-serif-2xl my-4">
          We can’t find the page you’re looking for
        </h1>
        <p>
          Go back to{" "}
          <Link href="/" className="text-udemy-purple underline">
            home page
          </Link>
          ?
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
