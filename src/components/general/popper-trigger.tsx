import { cn } from "@/lib/utils";

export default function PopperTrigger({
  children,
  title,
  href,
  className,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <div className={cn("relative group z-50", className)}>
      <div className="cursor-pointer rounded-[0.4rem] px-[1.2rem] my-[1.2rem] text-sm h-[4.8rem] hover:text-udemy-purple hover:bg-btn-focus flex justify-between items-center">
        <a href={href}>{title}</a>
        {children}
      </div>
    </div>
  );
}
