"use client";

import { cn, isInteger, specialRound } from "@/lib/utils";
import { CSSProperties, Dispatch, ReactNode, SetStateAction } from "react";
import Star from "./star";

// text-[#8b4309] text-[#f69c08]
export default function StarRating({
  rating: actualRating,
  ratingCount,
  style,
  color = "#8b4309",
  size = 15,
  className,
  readOnly = true,
  setRating,
  showRating = true,
}: {
  rating: number;
  ratingCount?: number;
  style?: CSSProperties;
  className?: string;
  color?: "#8b4309" | "#f69c08" | "#c4710d";
  readOnly?: boolean;
  setRating?: Dispatch<SetStateAction<number>>;
  size?: number;
  showRating?: boolean;
}) {
  const rating = specialRound(actualRating);
  const totalNumberOfStars = 5;
  const numberOfFullStars = Math.floor(rating);
  let emptyStars, hasHalfStar;

  if (isInteger(rating)) {
    emptyStars = totalNumberOfStars - numberOfFullStars;
    hasHalfStar = false;
  } else {
    emptyStars = totalNumberOfStars - numberOfFullStars - 1;
    hasHalfStar = true;
  }

  const handleClick = (starIndex: number) => {
    if (readOnly) return;

    setRating?.(starIndex + 1);
  };

  const getFinalStarsArray = (): ReactNode[] => {
    const result = Array.from({ length: numberOfFullStars }).map((_, i) => (
      <Star
        color={color}
        key={i}
        filledBy={1}
        size={size}
        onClick={() => handleClick(i)}
      />
    ));
    if (hasHalfStar)
      result.push(<Star color={color} filledBy={0.5} size={size} />);
    result.push(
      ...Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          color={color}
          key={i + numberOfFullStars}
          filledBy={0}
          size={size}
          onClick={() => handleClick(i + numberOfFullStars)}
        />
      ))
    );

    return result;
  };

  return (
    <div className="flex items-center" style={style}>
      <div className={cn("flex items-center", className)}>
        {showRating && (
          <span className={`me-[0.4rem] text-[${color}] heading-sm`}>
            {actualRating}
          </span>
        )}
        {getFinalStarsArray()}
      </div>
      {ratingCount && (
        <span className="text-[#595c73] ms-[0.4rem]">
          ({ratingCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
