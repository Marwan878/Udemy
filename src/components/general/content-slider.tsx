"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import RoundButton from "./round-button";

export default function ContentSlider({
  children,
  className,
  childrenCount,
  arrowStyle = "roundButton",
}: {
  children: React.ReactNode;
  className?: string;
  childrenCount: number;
  arrowStyle?: "chevron" | "roundButton";
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolledStart, setIsScrolledStart] = useState(true);
  const [isScrolledEnd, setIsScrolledEnd] = useState(true);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
      setIsScrolledStart(scrollLeft <= 130);
      setIsScrolledEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
      // setIsScrolledEnd(scrollLeft >= clientWidth * (childrenCount - 1));
    }
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  const goLeft = () => {
    if (containerRef.current) {
      const newScrollLeft = containerRef.current.scrollLeft - window.innerWidth;
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const goRight = () => {
    if (containerRef.current) {
      const newScrollLeft = containerRef.current.scrollLeft + window.innerWidth;
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="flex gap-x-[1.6rem] left-0 top-0 z-50 overflow-x-hidden snap-x scroll-smooth w-full"
        style={{
          scrollbarWidth: "none",
        }}
        onScroll={handleScroll}
      >
        {children}
        {!isScrolledStart && (
          <RoundButton
            aria-label="Scroll left."
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2",
              {
                "bg-transparent shadow-none hover:bg-transparent":
                  arrowStyle === "chevron",
              }
            )}
            onClick={goLeft}
          >
            <ChevronLeft
              color={arrowStyle === "chevron" ? "#6d28d2" : "black"}
            />
          </RoundButton>
        )}
        {!isScrolledEnd && (
          <RoundButton
            aria-label="Scroll right."
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
              {
                "bg-transparent shadow-none hover:bg-transparent -right-4":
                  arrowStyle === "chevron",
              }
            )}
            onClick={goRight}
          >
            <ChevronRight
              color={arrowStyle === "chevron" ? "#6d28d2" : "black"}
            />
          </RoundButton>
        )}
      </div>
    </div>
  );
}
