import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

export default function Modal({
  text,
  cta,
  ctaHref,
  className,
  style,
}: {
  text: string;
  cta: string;
  ctaHref: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("p-2 group-hover:block hidden z-50", className)}>
      <div
        style={{
          ...style,
          boxShadow:
            "0 0 0 1px #d1d2e0, 0 2px 4px rgba(6, 17, 118, 0.08), 0 4px 12px rgba(6, 17, 118, 0.08)",
        }}
        className={cn(
          "p-[1.6rem] text-center rounded-[0.8rem] min-w-[28.8rem] bg-white"
        )}
      >
        <p className="mb-[1.6rem] heading-lg mx-auto text-[#303141]">{text}</p>
        <a
          href={ctaHref}
          className="btn btn-md bg-udemy-purple text-white hover:bg-btn-dark-focus heading-md"
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
