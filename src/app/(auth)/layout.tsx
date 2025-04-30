import { MaxWidthWrapper } from "@/components/general";
import Image from "next/image";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="flex items-center justify-center h-screen w-screen">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-24 lg:w-full h-full mx-auto">
        <div className="relative hidden lg:block h-[60rem] my-auto">
          <Image
            src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x1.webp"
            fill
            alt=""
            className="object-cover"
          />
        </div>
        <div className="relative w-[30rem] aspect-[7/3] mb-4 lg:hidden">
          <Image
            src="https://frontends.udemycdn.com/components/auth/mobile-illustration-x2.webp"
            fill
            alt=""
          />
        </div>
        {children}
      </div>
    </MaxWidthWrapper>
  );
}
