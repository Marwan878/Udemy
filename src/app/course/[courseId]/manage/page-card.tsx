import { cn } from "@/lib/utils";

export default function PageCard({
  heading,
  children,
  className,
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "shadow-[0_2px_4px_rgba(6,17,118,0.08),0_4px_12px_rgba(6,17,118,0.16)]",
        className
      )}
    >
      <header className="border-b border-b-[#d1d2e0] py-6 px-3 sm:px-[4.8rem]">
        <h2 className="heading-serif-xl">{heading}</h2>
      </header>
      <div className="*:py-6 px-3 sm:px-[4.8rem]">{children}</div>
    </div>
  );
}
