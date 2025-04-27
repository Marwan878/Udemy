import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./max-width-wrapper";

export default function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-12", className)}>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </section>
  );
}
