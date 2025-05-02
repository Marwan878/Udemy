"use client";

import { MaxWidthWrapper, RoundButton } from "@/components/general";
import { HERO_IMAGES_BASE_URL, HERO_IMAGES_RAW_URLS } from "@/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

export default function HeroCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [sliderImagesUrls, setSliderImagesUrls] = useState<string[]>([]);
  const [sliderIsTransitioning, setSliderIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clonedImagesUrls = [
      HERO_IMAGES_RAW_URLS[HERO_IMAGES_RAW_URLS.length - 1],
      ...HERO_IMAGES_RAW_URLS,
      HERO_IMAGES_RAW_URLS[0],
    ];
    setSliderImagesUrls(clonedImagesUrls);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const handleTransitionEnd = () => {
      setCurrentImageIndex((curr) => {
        if (curr <= 0) {
          setSliderIsTransitioning(false);
          slider.style.transform = `translateX(${
            -100 * (sliderImagesUrls.length - 2)
          }%)`;
          setTransitionEnabled(false);
          return sliderImagesUrls.length - 2;
        } else if (curr >= sliderImagesUrls.length - 1) {
          setSliderIsTransitioning(false);
          slider.style.transform = "translateX(-100%)";
          setTransitionEnabled(false);
          return 1;
        } else {
          return curr;
        }
      });
    };

    slider.addEventListener("transitionend", handleTransitionEnd);

    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [sliderRef, sliderImagesUrls]);

  useEffect(() => {
    if (!transitionEnabled) {
      setTimeout(() => setTransitionEnabled(true), 0);
    }
  }, [transitionEnabled]);

  const handleNext = () => {
    if (transitionEnabled) {
      setSliderIsTransitioning(true);
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (transitionEnabled) {
      setSliderIsTransitioning(true);
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="md:h-[40rem] h-[60rem]">
      <MaxWidthWrapper className="h-full px-0 sm:px-6 relative overflow-hidden">
        <RoundButton
          onClick={handlePrev}
          className="top-[20rem] left-8 -translate-y-1/2 absolute z-30"
        >
          <ChevronLeft />
        </RoundButton>
        <RoundButton
          onClick={handleNext}
          className="top-[20rem] right-8 -translate-y-1/2 absolute z-30"
        >
          <ChevronRight />
        </RoundButton>
        <div
          ref={sliderRef}
          style={{
            transform: `translateX(-${currentImageIndex * 25}%)`,
            transition: sliderIsTransitioning
              ? "transform 0.5s ease-in-out"
              : "none",
          }}
          className="h-full flex absolute left-0"
        >
          {sliderImagesUrls.map((url, i) => (
            <div key={i} className="z-50 w-screen mx-auto relative">
              <>
                <LargeScreensContent url={url} />
                <SmallScreensContent url={url} />
              </>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

function LargeScreensContent({ url }: { url: string }) {
  return (
    <>
      <img
        className="object-cover h-[40rem] w-full hidden md:block"
        src={HERO_IMAGES_BASE_URL + "/big-" + url}
      />
      <Card
        className="bg-white top-[20rem] shadow-md rounded-sm w-[34rem] left-[10rem] -translate-y-1/2 absolute hidden md:block"
        heading="Learning that gets you"
        style={{
          boxShadow:
            "0 2px 4px rgba(6, 17, 118, .08), 0 4px 12px rgba(6, 17, 118, .08)",
        }}
        body={
          <>Skills for your present (and your future). Get started with us.</>
        }
      />
    </>
  );
}

function SmallScreensContent({ url }: { url: string }) {
  return (
    <>
      <div className="h-[40rem]">
        <img
          className="object-cover h-[40rem] w-full block md:hidden"
          src={HERO_IMAGES_BASE_URL + "/small-" + url}
        />
      </div>
      <div className="md:hidden flex flex-col">
        <Card
          heading="Skills that drive you forward"
          body={
            <p className="text-md">
              Technology and the world of work change fast — with us, you’re
              faster. Get the skills to achieve goals and stay competitive.
            </p>
          }
        />
      </div>
    </>
  );
}

function Card({
  heading,
  body,
  className,
  cta,
  style,
}: {
  heading: string;
  body: ReactNode;
  cta?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("p-[2.4rem] ", className)} style={style}>
      <h1 className="mb-[0.8rem] heading-serif-2xl">{heading}</h1>
      <div className="text-[1.4rem] text-[#303141]">{body}</div>
      {cta}
    </div>
  );
}
