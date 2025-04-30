import { Button } from "@/components/general";
import Logo from "@/components/udemy-logo";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import DesktopSearchBar from "./desktop-search-bar";
import MobileSearchBar from "./mobile-search-bar";
import MyLearning from "./my-learning";
import ShoppingCart from "./shopping-cart";
import SideNavToggle from "./side-nav-toggle";
import UserButton from "@/components/user-button";

export default function Header() {
  return (
    <header className="shadow-md h-[5.6rem] lg:h-[7.2rem] md:px-6 lg:py-0 p-1 flex items-center justify-between relative z-[60] bg-white">
      <SideNavToggle />
      <Logo color="black" />
      <DesktopSearchBar />
      <div className="flex items-center h-full">
        <MobileSearchBar />
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
          <UserButton />
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
