import MaxWidthWrapper from "@/components/general/max-width-wrapper";
import { COMPANIES_LOGOS } from "@/constants";
import Image from "next/image";

export default function Companies() {
  return (
    <section className="p-16">
      <MaxWidthWrapper className="flex flex-col gap-y-4 pb-4">
        <p className="text-[#595c73] text-lg mb-6 mx-auto text-center">
          Trusted by over 16,000 companies and millions of learners around the
          world
        </p>
        <div className="grid grid-cols-4 gap-y-8 gap-x-8 lg:flex lg:items-center lg:justify-between">
          {COMPANIES_LOGOS.map((logo) => (
            <div key={logo} className="mx-auto h-[4.8rem] relative w-full">
              <Image className="object-contain" fill src={logo} alt="" />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
