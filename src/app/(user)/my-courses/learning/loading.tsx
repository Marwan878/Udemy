import { MaxWidthWrapper } from "@/components/general";
import React from "react";
import ContentLoader from "react-content-loader";

export default function Loading() {
  return (
    <MaxWidthWrapper className="pt-[1.6rem]">
      <div className="mx-[-0.8rem] grid grid-cols-1 sm:grid-cols-2 gap-[2.4rem] md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ContentLoader
            key={i}
            speed={1}
            width={"100%"}
            height={320}
            // viewBox="0 0 476 250"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            {/* image */}
            <rect
              x="0"
              y="0"
              rx="0"
              ry="0"
              width="100%"
              height="68%"
              fill="red"
            />
            {/* title */}
            <rect x="0" y="70%" rx="0" ry="0" width="75%" height="7%" />
            {/* instructor */}
            <rect x="0" y="78%" rx="0" ry="0" width="35%" height="3%" />
            {/* progress bar */}
            <rect x="0" y="83%" rx="0" ry="0" width="100%" height="2%" />
            {/* progress */}
            <rect x="0" y="87%" rx="0" ry="0" width="20%" height="3%" />
            {/* rating */}
            <rect x="70%" y="87%" rx="0" ry="0" width="30%" height="6%" />
          </ContentLoader>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
