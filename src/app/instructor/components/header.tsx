import { Button, MaxWidthWrapper } from "@/components/general";
import UserButton from "@/components/user-button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-4">
      <MaxWidthWrapper className="flex items-center justify-end">
        <Button
          as={Link}
          href="/instructor/profile/basic-information"
          variant="ghost"
          height="md"
          className="text-sm hover:text-udemy-purple me-2"
        >
          Profile and Settings
        </Button>
        <Button
          as={Link}
          href="/"
          variant="ghost"
          height="md"
          className="text-sm hover:text-udemy-purple mx-2"
        >
          Home
        </Button>
        <UserButton />
      </MaxWidthWrapper>
    </header>
  );
}
