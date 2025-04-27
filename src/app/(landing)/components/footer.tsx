import Image from "next/image";
import Accordion, {
  AccordionBody,
  AccordionHeader,
} from "../../../components/general/accordion";
import MaxWidthWrapper from "../../../components/general/max-width-wrapper";
import Logo from "../../../components/udemy-logo";
import { cn } from "@/lib/utils";
const UDEMY_BUISNESS_USERS_IMAGES_URLS = [
  "/images/companies/nasdaq.svg",
  "/images/companies/volkswagen.svg",
  "/images/companies/box.svg",
  "/images/companies/netapp.svg",
  "/images/companies/eventbrite.svg",
];

const FOOTER_LINKS = {
  1: [
    {
      heading: "Certifications by Issuer",
      links: [
        {
          text: "Amazon Web Services (AWS) Certifications",
          url: "/browse/certification/aws-certifications/",
        },
        {
          text: "Six Sigma Certifications",
          url: "/browse/certification/six-sigma-certifications/",
        },
        {
          text: "Microsoft Certifications",
          url: "/browse/certification/microsoft-certifications/",
        },
        {
          text: "Cisco Certifications",
          url: "/browse/certification/cisco-certifications/",
        },
        {
          text: "Tableau Certifications",
          url: "/browse/certification/tableau-certifications/",
        },
        { text: "See all Certifications", url: "/browse/certification/" },
      ],
    },
    {
      heading: "Web Development",
      links: [
        { text: "Web Development", url: "/topic/web-development/" },
        { text: "JavaScript", url: "/topic/javascript/" },
        { text: "React JS", url: "/topic/react/" },
        { text: "Angular", url: "/topic/angular/" },
        { text: "Java", url: "/topic/java/" },
      ],
    },
    {
      heading: "IT Certifications",
      links: [
        { text: "Amazon AWS", url: "/topic/amazon-aws/" },
        {
          text: "AWS Certified Cloud Practitioner",
          url: "/topic/aws-certified-cloud-practitioner/",
        },
        {
          text: "AZ-900: Microsoft Azure Fundamentals",
          url: "/topic/microsoft-az-900/",
        },
        {
          text: "AWS Certified Solutions Architect - Associate",
          url: "/topic/aws-certified-solutions-architect-associate/",
        },
        { text: "Kubernetes", url: "/topic/kubernetes/" },
      ],
    },
    {
      heading: "Leadership",
      links: [
        { text: "Leadership", url: "/topic/leadership/" },
        { text: "Management Skills", url: "/topic/management-skills/" },
        { text: "Project Management", url: "/topic/project-management/" },
        { text: "Personal Productivity", url: "/topic/personal-productivity/" },
        {
          text: "Emotional Intelligence",
          url: "/topic/emotional-intelligence/",
        },
      ],
    },
    {
      heading: "Certifications by Skill",
      links: [
        {
          text: "Cybersecurity Certification",
          url: "/browse/certification/cybersecurity-certifications/",
        },
        {
          text: "Project Management Certification",
          url: "/browse/certification/project-management-certifications/",
        },
        {
          text: "Cloud Certification",
          url: "/browse/certification/cloud-certifications/",
        },
        {
          text: "Data Analytics Certification",
          url: "/browse/certification/data-analytics-certifications/",
        },
        {
          text: "HR Management Certification",
          url: "/browse/certification/hr-management-certifications/",
        },
        { text: "See all Certifications", url: "/browse/certification/" },
      ],
    },
    {
      heading: "Data Science",
      links: [
        { text: "Data Science", url: "/topic/data-science/" },
        { text: "Python", url: "/topic/python/" },
        { text: "Machine Learning", url: "/topic/machine-learning/" },
        { text: "ChatGPT", url: "/topic/chatgpt/" },
        { text: "Deep Learning", url: "/topic/deep-learning/" },
      ],
    },
    {
      heading: "Communication",
      links: [
        { text: "Communication Skills", url: "/topic/communication-skills/" },
        { text: "Presentation Skills", url: "/topic/presentation-skills/" },
        { text: "Public Speaking", url: "/topic/public-speaking/" },
        { text: "Writing", url: "/topic/writing/" },
        { text: "PowerPoint", url: "/topic/powerpoint/" },
      ],
    },
    {
      heading: "Business Analytics & Intelligence",
      links: [
        { text: "Microsoft Excel", url: "/topic/excel/" },
        { text: "SQL", url: "/topic/sql/" },
        { text: "Microsoft Power BI", url: "/topic/microsoft-power-bi/" },
        { text: "Data Analysis", url: "/topic/data-analysis/" },
        { text: "Business Analysis", url: "/topic/business-analysis/" },
      ],
    },
  ],
  2: [
    {
      heading: "About",
      links: [
        { text: "About us", href: "https://about.udemy.com/?locale=en-us" },
        {
          text: "Careers",
          href: "https://about.udemy.com/careers?locale=en-us",
        },
        {
          text: "Contact us",
          href: "https://about.udemy.com/company?locale=en-us#offices",
        },
        { text: "Blog", href: "https://blog.udemy.com/?ref=footer" },
        { text: "Investors", href: "https://investors.udemy.com" },
      ],
    },
    {
      heading: "Discovery Udemy",
      links: [
        { text: "Get the app", href: "/mobile/" },
        { text: "Teach on Udemy", href: "/teaching/?ref=teach_footer" },
        {
          text: "Plans and Pricing",
          href: "https://www.udemy.com/pricing/?ref=footer",
        },
        { text: "Affiliate", href: "/affiliate/" },
        { text: "Help and Support", href: "/support/" },
      ],
    },
    {
      heading: "Udemy for Business",
      links: [
        {
          text: "Udemy Business",
          href: "/udemy-business/?locale=en_US&mx_pg=httpcachecontextsme-list&path=%2F&ref=footer",
        },
      ],
    },
    {
      heading: "Legal & Accessibility",
      links: [
        {
          text: "Accessibility statement",
          href: "https://about.udemy.com/accessibility-statement?locale=en-us",
        },
        { text: "Privacy policy", href: "/terms/privacy/" },
        { text: "Sitemap", href: "/sitemap/" },
        { text: "Terms", href: "/terms/" },
      ],
    },
  ],
} as const;

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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between items-start border-b border-[#b7b9cd] py-[1.2rem] px-[2.4rem]">
      <h6 className="heading-lg py-[1.2rem] pe-[2.4rem]">
        Top companies choose{" "}
        <span className="text-[#c0c4fc]">Udemy Business</span> to build
        in-demand career skills.
      </h6>
      <ul className="flex flex-shrink-0 flex-grow">
        {UDEMY_BUISNESS_USERS_IMAGES_URLS.map((imageUrl) => (
          <li key={imageUrl}>
            <img
              // width={40}
              height={44}
              src={imageUrl}
              className="mr-[2.4rem] my-[1.2rem]"
              alt={""}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinksPart1() {
  return (
    <div className="p-[2.4rem] border-t border-t-[#b7b9cd]">
      <h6 className="heading-serif-lg mb-[2.4rem] mt-[1.6rem]">
        Explore top skills and certifications
      </h6>
      {FOOTER_LINKS[1].map(({ heading, links }) => (
        <Accordion key={heading} className="border-b border-b-white md:hidden">
          <AccordionHeader className="py-[1.6rem] heading-md">
            <div className="pb-[0.8rem]">{heading}</div>
          </AccordionHeader>
          <AccordionBody>
            <ul className="pt-[0.8rem] pb-[1.6rem]">
              {links.map(({ text, url }) => (
                <li key={text}>
                  <a className="hover:underline py-[0.4rem] text-sm" href={url}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionBody>
        </Accordion>
      ))}
      <ListGrid className="hidden md:grid px-0" footerLinks={FOOTER_LINKS[1]} />
    </div>
  );
}

function LinksPart2() {
  return <ListGrid footerLinks={FOOTER_LINKS[2]} />;
}

function ListGrid({
  footerLinks,
  className,
}: {
  footerLinks: (typeof FOOTER_LINKS)[keyof typeof FOOTER_LINKS];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:grid grid-cols-4 gap-[2.4rem] sm:pt-[2.4rem] px-[2.4rem]",
        className
      )}
    >
      {footerLinks.map(({ heading, links }) => (
        <div key={heading}>
          <div className="my-[1.6rem] heading-md">{heading}</div>
          <ul className="sm:mb-[2.4rem]">
            {links.map(({ text, href }) => (
              <li key={text}>
                <a href={href} className="text-sm pb-[0.4rem]">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
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
