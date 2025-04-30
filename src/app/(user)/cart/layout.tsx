import Footer from "@/app/(landing)/components/footer";
import Header from "@/app/(landing)/components/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
