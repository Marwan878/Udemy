import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  MaxWidthWrapper,
} from "@/components/general/index";
import { Tv } from "lucide-react";

function Page() {
  return (
    <MaxWidthWrapper>
      <Accordion>
        <AccordionHeader className="p-[1.6rem] select-none bg-[#f6f7f9]">
          <div className="flex flex-col">
            <span className="line-clamp-2 overflow-hidden text-ellipsis heading-md">
              Section 1: The Bootstrap Framework
            </span>
            <span className="text-xs">12 / 44 | 2hr 46min</span>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <ol>
            <li className="flex gap-[1.6rem] text-[#303141] px-[1.6rem] py-[0.8rem] cursor-pointer">
              <input type="checkbox" className="self-start" />
              <div className="flex flex-col">
                <div className="text-sm line-clamp-2 overflow-hidden text-ellipsis">
                  Introduction to Bootstrap
                </div>
                <div className="flex items-center gap-[0.4rem] pt-[0.8rem] text-[#595c73] text-xs">
                  <Tv className="w-[1.6rem] h-[1.6rem]" color="#9194ac" /> 2min
                </div>
              </div>
            </li>
          </ol>
        </AccordionBody>
      </Accordion>
    </MaxWidthWrapper>
  );
}

export default Page;
