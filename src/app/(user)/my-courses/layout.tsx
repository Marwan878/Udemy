import Footer from "@/app/(landing)/components/footer";
import Header from "@/app/(landing)/components/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-[#1d1e27] p-6">
        <h1 className="heading-serif-3xl text-white">My learning</h1>
      </div>
      {children}
      <Footer />
    </>
  );
}
