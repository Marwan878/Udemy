import { UDEMY_BUISNESS_USERS_IMAGES_URLS } from "@/constants";
import Logo from "@/components/udemy-logo";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-white">
      <div className="bg-[#1d1e27]">
        <FooterTop />
      </div>
      <div className="bg-[#111116]">
        <FooterBottom />
      </div>
    </footer>
  );
}

function FooterTop() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between items-stretch border-b border-[#b7b9cd] py-[1.2rem] px-[2.4rem]">
      <div className="heading-lg py-[1.2rem] pe-[2.4rem]">
        Top companies choose{" "}
        <span className="text-[#c0c4fc]">Udemy Business</span> to build
        in-demand career skills.
      </div>
      <ul className="flex flex-shrink-0 flex-grow">
        {UDEMY_BUISNESS_USERS_IMAGES_URLS.map((imageUrl) => (
          <li
            key={imageUrl}
            className="relative h-[4.4rem] mx-2 lg:me-[2.4rem] lg:my-[1.2rem] w-full"
          >
            <Image fill src={imageUrl} alt={""} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="border-t border-t[#9194ac] flex flex-col sm:flex-row sm:justify-between p-[2.4rem] gap-[2.4rem]">
      {/* <a href="#">Cookie settings</a> */}
      <div className="flex items-center gap-[1.6rem]">
        <Logo color="white" />
        <p className="text-sm">
          &copy;
          {new Date().getFullYear()} <span>Udemy, Inc.</span>
        </p>
      </div>
    </div>
  );
}
