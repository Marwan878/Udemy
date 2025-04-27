"use client";

import { ArrowRight, CircleCheck, User, Users } from "lucide-react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Section,
  SectionHeading,
  Button,
} from "@/components/general";
import { useEffect, useState } from "react";

type Plan = {
  accordionBorderTopColor: string;
  name: string;
  targetUsers: string;
  pricingDetails: {
    heading: string;
    body: string;
  };
  cta: string;
  benefits: string[];
  isPersonal: boolean;
  usersCountText: string;
};

const PLANS: Plan[] = [
  {
    accordionBorderTopColor: "#a435f0",
    name: "personal",
    targetUsers: "you",
    pricingDetails: {
      heading: "Starting at E£204.00 per month",
      body: "Billed monthly or annually. Cancel anytime.",
    },
    cta: "Try it free",
    benefits: [
      "Access to 12,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
    ],
    isPersonal: true,
    usersCountText: "Individual",
  },
  {
    accordionBorderTopColor: "#5022c3",
    name: "team",
    targetUsers: "your team",
    pricingDetails: {
      heading: "E£1,490.00 a month per user",
      body: "Billed annually. Cancel anytime.",
    },
    cta: "Try it free",
    benefits: [
      "Access to 12,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Analytics and adoption reports",
    ],
    isPersonal: false,
    usersCountText: "2 to 20 people",
  },
  {
    accordionBorderTopColor: "#5022c3",
    name: "enterprise",
    targetUsers: "your organization",
    pricingDetails: {
      heading: "Contact sales for pricing",
      body: " ",
    },
    cta: "Request a demo",
    benefits: [
      "Access to 27,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Advanced analytics and insights",
      "Dedicated customer success team",
      "International course collection featuring 15 languages",
      "Customizable content",
      "Hands-on tech training with add-on",
      "Strategic implementation services with add-on",
    ],
    isPersonal: false,
    usersCountText: "More than 20 people",
  },
] as const;

const TAILWIND_LG_START_BREAKPOINT = 1024;

export default function Pricing() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Section>
      <SectionHeading
        primaryText="Accelerate growth — for you or your organization"
        secondaryText="Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[1.6rem]">
        {PLANS.map(
          (
            {
              accordionBorderTopColor,
              name,
              targetUsers,
              pricingDetails: { heading, body },
              cta,
              benefits,
              isPersonal,
              usersCountText,
            },
            i
          ) => (
            <Accordion
              key={i}
              isDynamic={(windowWidth ?? 0) < TAILWIND_LG_START_BREAKPOINT}
            >
              <AccordionHeader
                style={{ borderTopColor: accordionBorderTopColor }}
                className="py-[1.6rem] px-[2.4rem] rounded-2xl border-2 border-t-8 border-[#d1d2e0] bg-[#f6f7f9]"
              >
                <div className="flex flex-col">
                  <h4 className="capitalize font-serif text-clamp-lg font-bold">
                    {name} plan
                  </h4>
                  <span className="mb-[0.8rem] text-[1.2rem]">
                    For {targetUsers}
                  </span>
                  <span className="flex items-center text-[1.4rem]">
                    {isPersonal ? <User /> : <Users />}{" "}
                    <span className="text-[#595c73]">{usersCountText}</span>
                  </span>
                </div>
              </AccordionHeader>
              <AccordionBody className="flex flex-col p-[2.4rem] lg:h-[50rem] border-2 border-t-0 rounded-b-2xl border-[#d1d2e0]">
                <div>
                  <p className="font-bold">{heading}</p>
                  <p className="text-[1.2rem] font-normal leading-[1.4rem] h-[1.4rem]">
                    {body}
                  </p>
                  <Button className="mt-[1.6rem] mb-[2.4rem] w-full flex justify-center items-center space-x-4 h-[4.8rem] ">
                    <p className="tracking-normal font-bold text-[1.6rem]">
                      {cta}
                    </p>
                    <ArrowRight color="#fff" />
                  </Button>
                </div>
                <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center py-[0.4rem]">
                      <CircleCheck
                        className="min-h-[1.96rem] w-[1.6rem]"
                        color="#206241"
                      />
                      <p className="ms-[1.6rem] text-[#303141] text-[1.4rem]">
                        {benefit}
                      </p>
                    </li>
                  ))}
                </ul>
              </AccordionBody>
            </Accordion>
          )
        )}
      </div>
    </Section>
  );
}
