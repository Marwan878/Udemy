import { MaxWidthWrapper } from "@/components/general";
import Tabs from "../components/tabs";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper>
      <h1 className="heading-serif-2xl mt-2 mb-8">Profile & settings</h1>
      <Tabs />
      {children}
    </MaxWidthWrapper>
  );
}
