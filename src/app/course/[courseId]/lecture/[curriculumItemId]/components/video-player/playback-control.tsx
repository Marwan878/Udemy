import { Button } from "@/components/general";
import { useState } from "react";

export default function PlaybackControl({
  playbackRate,
  setPlaybackRate,
}: {
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative hidden md:block">
      <Button
        variant="ghost"
        height="sm"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="w-12 min-w-12 max-w-12 md:w-24 md:min-w-24 md:max-w-24"
      >
        <div className="bg-white md:px-2 w-full text-black">
          {playbackRate + "x"}
        </div>
      </Button>
      {isMenuOpen && (
        <ul className="absolute bg-[#1d1e27] border border-[#d1d2e0] rounded-md text-white md:p-2 md:text-md text-xs z-10 bottom-full -translate-y-4">
          {Array.from({ length: 7 }).map((_, i) => {
            const rate = i * 0.25 + 0.5;
            return (
              <li
                key={rate}
                className={`px-2 py-1 cursor-pointer hover:bg-[#333] ${
                  playbackRate === rate ? "bg-[#333]" : ""
                }`}
                onClick={() => {
                  setPlaybackRate(rate);
                  setIsMenuOpen(false);
                }}
              >
                {rate + "x"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
