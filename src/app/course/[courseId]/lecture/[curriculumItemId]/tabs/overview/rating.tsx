import { Star } from "@/components/general";

export default function Rating({
  rating,
  ratingCount,
}: {
  rating: number;
  ratingCount: number;
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center">
        <span className="text-[#8b4309] heading-md leading-none me-[0.4rem]">
          {rating}
        </span>
        <Star filledBy={1} />
      </div>
      <span className="text-[#595c73] text-xs">
        {ratingCount.toLocaleString()} rating(s)
      </span>
    </div>
  );
}
