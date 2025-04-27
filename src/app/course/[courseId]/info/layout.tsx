import Footer from "@/app/(landing)/components/footer";
import Header from "@/app/(landing)/components/header/header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
