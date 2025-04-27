import Link from "next/link";
import Image from "next/image";

export default function Logo({
  className,
  color,
}: {
  className?: string;
  color: "black" | "white";
}) {
  return (
    <Link href="/" className={className || ""}>
      <Image
        width={91}
        height={34}
        src={
          color === "black"
            ? "/images/udemy-black.svg"
            : "/images/udemy-white.svg"
        }
        alt="Udemy logo."
      />
    </Link>
  );
}
