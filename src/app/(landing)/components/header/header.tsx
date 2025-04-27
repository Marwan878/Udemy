import { Button, SearchBar } from "@/components/general";
import Logo from "@/components/udemy-logo";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import MyLearning from "./my-learning";
import ShoppingCart from "./shopping-cart";
import SideNavToggle from "./side-nav-toggle";

export default function Header() {
  return (
    <header className="shadow-md h-[5.6rem] lg:h-[7.2rem] md:px-6 lg:py-0 p-1 flex items-center justify-between relative z-[60] bg-white">
      <SideNavToggle />

      <Logo color="black" />

      <SearchBar className="hidden lg:block ms-4" />

      <div className="flex items-center h-full">
        <Button variant="ghost" className="block lg:hidden p-2">
          <SearchIcon width={20} height={20} />
        </Button>
        <SignedIn>
          <div className="gap-x-3 hidden lg:flex lg:items-center h-full">
            <Button
              as={Link}
              href="/instructor"
              variant="ghost"
              className="font-normal px-4"
            >
              Instructor
            </Button>
            <MyLearning />
          </div>
        </SignedIn>
        <ShoppingCart />
        <SignedIn>
          <UserButton
            appearance={{
              elements: { userButtonAvatarBox: "w-6 h-6 hidden lg:block ms-3" },
            }}
          />
        </SignedIn>
      </div>

      <SignedOut>
        <div className="hidden lg:flex items-center shrink-0 gap-x-3 ms-3">
          <Button
            as={Link}
            href="/sign-in"
            variant="secondary"
            className="px-4"
            height="md"
          >
            Log in
          </Button>
          <Button as={Link} href="/sign-up" height="md">
            Sign up
          </Button>
        </div>
      </SignedOut>
    </header>
  );
}
