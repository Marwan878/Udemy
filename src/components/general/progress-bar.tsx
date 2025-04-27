import { cn } from "@/lib/utils";

function ProgressBar({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-1 bg-[#d1d2e0] relative overflow-hidden rounded-full",
        className
      )}
    >
      <div
        className="absolute h-full top-0 left-0 bg-udemy-purple w-full transition"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}

export default ProgressBar;

// mt-4 mb-2
