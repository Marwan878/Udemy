import {
  ContentSlider,
  Section,
  SectionHeading,
} from "@/components/general/index";
import { TESTIMONIALS } from "@/constants";
import { cn } from "@/lib/utils";
import { TTestimonial } from "@/types";

export default function Testimonials() {
  return (
    <Section className="bg-[#f6f7f9] pb-24">
      <SectionHeading primaryText="See what others are achieving through learning" />
      <ContentSlider
        className="block xl:hidden"
        childrenCount={TESTIMONIALS.length}
      >
        {TESTIMONIALS.map((testimonial, i) => (
          <TestimonialCard
            className={
              i === TESTIMONIALS.length - 1 ? "snap-end" : "snap-start"
            }
            testimonial={testimonial}
            key={i}
          />
        ))}
      </ContentSlider>
      <div className="grid-cols-4 hidden xl:grid">
        {TESTIMONIALS.map((testimonial, i) => (
          <TestimonialCard testimonial={testimonial} key={i} />
        ))}
      </div>
    </Section>
  );
}

function TestimonialCard({
  testimonial: { author, body },
  className,
}: {
  testimonial: TTestimonial;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between border border-[#d1d2e0] p-[2.4rem] h-[27rem] shrink-0 w-[31.1rem] bg-white rounded-xl",
        className
      )}
    >
      <div>
        <p>{body}</p>
      </div>
      {author}
    </article>
  );
}
