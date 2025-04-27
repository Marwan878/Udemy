import { addToCart } from "@/actions/cart";
import { Button } from "@/components/general";

export default function SideCard({
  courseImage,
  coursePrice,
  courseId,
}: {
  courseImage: string;
  coursePrice: number;
  courseId: string;
}) {
  return (
    <div className="hidden lg:block lg:w-[34rem] -translate-y-96 lg:top-0 shrink-0 mb-10 lg:right-0 bg-white h-fit border-b-[#d1d2e0] border-b shadow-[0_2px_4px_rgba(6,17,118,0.08),0_4px_12px_rgba(6,17,118,0.08)]">
      <img src={courseImage} alt="Course image." className="h-72 w-full" />
      <div className="p-4">
        <div className="heading-xl my-4">
          {coursePrice > 0 ? `$${coursePrice}` : "FREE"}
        </div>
        <form action={addToCart}>
          <Button className="font-bold w-full mb-4">Add to cart</Button>
          <input type="hidden" value={courseId} name="courseId" />
        </form>

        <span className="text-xs text-[#2a2b3f] w-full text-center inline-block">
          Full Lifetime Access
        </span>
      </div>
    </div>
  );
}
