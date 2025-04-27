import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("container max-w-[134rem] mx-auto px-3 sm:px-6", className)}
    >
      {children}
    </div>
  );
}
