export default function Heading({
  primaryText,
  secondaryText,
}: {
  primaryText: string;
  secondaryText?: string;
}) {
  return (
    <>
      <h2 className="heading-serif-2xl text-[#303141] tracking-[-0.016rem]">
        {primaryText}
      </h2>
      <p className="mt-[0.8rem] mb-[3.2rem] text-lg text-[#595c73]">
        {secondaryText ?? ""}
      </p>
    </>
  );
}
