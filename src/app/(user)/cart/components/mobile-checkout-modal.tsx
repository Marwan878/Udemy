import { Button } from "@/components/general";
import { ArrowRight } from "lucide-react";

export default function MobileCheckoutModal() {
  return (
    <div
      className="bg-white p-[1.6rem] fixed inset-x-0 bottom-0 z-50 flex flex-col md:hidden"
      style={{
        boxShadow:
          "0 -4px 8px rgba(6, 17, 118, .08), 0 -4px 12px rgba(6, 17, 118, .24)",
      }}
    >
      <Button className="w-full heading-md h-[4.8rem]">
        Proceed to Checkout <ArrowRight />
      </Button>
      <p className="text-[#595c73 text-[1.2rem] mt-[0.8rem] text-center">
        You won't be charged yet
      </p>
    </div>
  );
}
