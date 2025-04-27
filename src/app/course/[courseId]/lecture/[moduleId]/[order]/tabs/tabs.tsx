import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

function Page() {
  return (
    <div className="p-[2.4rem] pb-0">
      <SearchForm />
      <div className="mx-auto text-center pt-[6.4rem] px-[2.4rem]">
        <h2 className="heading-xl">Start a new search</h2>
        <p className="mx-auto">To find captions, lectures or resources</p>
      </div>
    </div>
  );
}

export default Page;

function SearchForm({ className }: { className?: string }) {
  return (
    <form action="" className="flex">
      <input
        type="text"
        className={cn(
          "text-sm input-text input-text-md me-[0.8rem] flex-grow text-[#000] hover:bg-[#f6f7f9]",
          className
        )}
        placeholder="Search course content"
      />
      <button className="flex items-center justify-center px-4 w-16 btn-md btn heading-sm bg-udemy-purple hover:bg-btn-dark-focus">
        <Search color="white" />
      </button>
    </form>
  );
}
