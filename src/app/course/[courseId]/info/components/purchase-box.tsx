import { Button } from "@/components/general";
import { TCourse } from "@/types";

export default function PurchaseBox({ course }: { course: TCourse }) {
  const { price } = course;
  return (
    <div className="flex flex-col lg:hidden">
      <div className="font-bold heading-xl self-start">
        {price === 0 ? "FREE" : `$${price}`}
      </div>
      <Button className="font-bold my-4">Add to cart</Button>
      <span className="self-center text-xs text-[#2a2b3f]">
        Full Lifetime Access
      </span>
    </div>
  );
}
