import Tag from "@/components/course-card/tag";
import DiscSeperatedText from "./disc-separated-text";
import { Button, StarRating } from "@/components/general";
import Image from "next/image";
import { TCourse } from "@/types";
import { removeFromCart } from "@/actions/cart";
import Link from "next/link";
import { useCart } from "@/contexts/cart";

export default function CartCourseCard({ course }: { course: TCourse }) {
  const { setCart } = useCart();
  const {
    id,
    imageUrl,
    price,
    rating,
    ratingCount,
    instructor,
    title,
    tag,
    meta,
  } = course;

  return (
    <li className="grid py-[1.6rem] border-t border-t-[#d1d2e0] cart-item-grid">
      <div style={{ gridArea: "image" }} className="me-[1.6rem]">
        <div className="w-[4.8rem] h-[4.8rem] md:w-48 md:h-[6.8rem] relative">
          <Image fill objectFit="cover" src={imageUrl} alt={""} />
        </div>
      </div>
      <div style={{ gridArea: "header" }}>
        <h3 className="heading-md line-clamp-3 text-ellipsis">
          <Link className="hover:text-udemy-purple" href={`/course/${id}/info`}>
            {title}
          </Link>
        </h3>
        <div className="text-xs">
          By {instructor.firstName + " " + instructor.lastName}
        </div>
      </div>
      <StarRating
        rating={rating}
        ratingCount={ratingCount}
        className="mt-[0.8rem]"
        style={{ gridArea: "rating" }}
      />
      {tag && (
        <Tag
          tag={tag}
          className="mt-[0.8rem] me-[0.8rem]"
          style={{ gridArea: "badges" }}
        />
      )}
      <DiscSeperatedText sentences={meta} style={{ gridArea: "meta" }} />
      <div
        style={{ gridArea: "actions" }}
        className="mt-[0.8rem] gap-x-[1.6rem] md:flex md:flex-col md:items-end md:mt-0"
      >
        <Button
          variant="ghost"
          onClick={() => {
            removeFromCart([id]);
            setCart((prev) => prev?.filter((course) => course.id !== id) ?? []);
          }}
          className="text-sm text-udemy-purple"
          height="sm"
        >
          Remove
        </Button>
      </div>
      <div style={{ gridArea: "price" }} className="ps-[4.8rem]">
        {price > 0 ? `$${price}` : "FREE"}
      </div>
    </li>
  );
}
