import MaxWidthWrapper from "@/components/general/max-width-wrapper";

const COMPANIES_LOGOS = [
  "/images/companies/cisco.svg",
  "/images/companies/citi.svg",
  "/images/companies/epricsson.svg",
  "/images/companies/hewlett-packard-enterprise.svg",
  "/images/companies/p&g.svg",
  "/images/companies/samsung.svg",
  "/images/companies/vimeo.svg",
  "/images/companies/volkswagen.svg",
] as const;

export default function Companies() {
  return (
    <section className="p-16">
      <MaxWidthWrapper className="flex flex-col gap-y-4 pb-4">
        <p className="text-[#595c73] text-lg mb-6 mx-auto text-center">
          Trusted by over 16,000 companies and millions of learners around the
          world
        </p>
        <div className="grid grid-cols-4 gap-y-8 gap-x-8 lg:flex lg:items-center lg:justify-between">
          {COMPANIES_LOGOS.map((logo, i) => (
            <img height={48} src={logo} key={i} className="mx-auto" />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
