export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-[#1d1e27] p-6">
        <h1 className="heading-serif-3xl text-white">My learning</h1>
      </div>
      {children}
    </>
  );
}
