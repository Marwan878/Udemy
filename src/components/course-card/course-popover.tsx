import { useCart } from "@/contexts/cart";
import { unixToMonthYear } from "@/lib/utils";
import { TCourse, TCourseState } from "@/types";
import { Check } from "lucide-react";
import { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Button } from "../general";
import Tag from "./tag";
import Link from "next/link";

const COURSE_POPOVER_WIDTH_IN_REM = 34;
//w-[34rem]
const ROOT_FONT_SIZE = 10;
const COURSE_POPOVER_WIDTH_IN_PX = COURSE_POPOVER_WIDTH_IN_REM * ROOT_FONT_SIZE;

export default function CoursePopover({
  course: { title, leadHeadline, features, tag, updatedAt, id },
  cardRect,
  state,
}: {
  course: TCourse;
  cardRect: DOMRect | undefined;
  state: TCourseState;
}) {
  const { cartCoursesIds, addToCart } = useCart();
  if (!cardRect) return null;

  let appropriatePopoverPosition: "left" | "right" | "top";
  if (window.innerWidth - cardRect.right >= COURSE_POPOVER_WIDTH_IN_PX) {
    appropriatePopoverPosition = "right";
  } else if (cardRect.left >= COURSE_POPOVER_WIDTH_IN_PX) {
    appropriatePopoverPosition = "left";
  } else {
    appropriatePopoverPosition = "top";
  }

  const computePopoverStyle = (): CSSProperties => {
    if (appropriatePopoverPosition === "right") {
      return {
        left: `${cardRect.right}px`,
        top: `${cardRect.top + window.scrollY}px`,
        transform: `translateY(calc((100% - ${cardRect.height}px) / -2))`,
      };
    } else if (appropriatePopoverPosition === "left") {
      return {
        left: `calc(${cardRect.left}px - 100%)`,
        top: `${cardRect.top + window.scrollY}px`,
        transform: `translateY(calc((100% - ${cardRect.height}px) / -2))`,
      };
    } else {
      return {
        left: `${cardRect.left}px`,
        top: `${cardRect.bottom + window.scrollY}px`,
      };
    }
  };

  const computeArrowStyle = (): CSSProperties => {
    switch (appropriatePopoverPosition) {
      case "left":
        return {
          top: "50%",
          transform: "translate(-50%) rotateZ(45deg)",
          left: "100%",
          borderLeft: "none",
          borderBottom: "none",
        };
      case "right":
        return {
          top: "50%",
          transform: "translate(-50%) rotateZ(45deg)",
          left: "0",
          borderTop: "none",
          borderRight: "none",
        };
      case "top":
        return {
          top: "0",
          left: "50%",
          transform: "translate(-50%) rotateZ(45deg)",
          borderRight: "none",
          borderBottom: "none",
        };
      default:
        return {};
    }
  };

  const arrowStyle: CSSProperties = computeArrowStyle();

  return createPortal(
    <div
      style={{
        width: `${COURSE_POPOVER_WIDTH_IN_REM}rem`,
        ...computePopoverStyle(),
      }}
      className="absolute z-[100] px-[1rem]"
    >
      <div className="p-[2.4rem] rounded-[0.8rem] relative text-[#303141] bg-white flex flex-col items-start shadow-[0_0_0_1px_#d1d2e0,0_2px_4px_rgba(6,17,118,.08),0_4px_12px_rgba(6,17,118,.08)]">
        <span
          className={
            "inline-block border-2 w-5 h-5 border-[#d1d2e0] rotate-45 bg-white absolute"
          }
          style={arrowStyle}
        />
        <Link
          href={`/course/${id}/info`}
          className="heading-lg hover:text-udemy-purple"
        >
          {title}
        </Link>
        <div className="flex items-center">
          {tag && <Tag tag={tag} />}{" "}
          {updatedAt && (
            <span>
              Updated <span>{unixToMonthYear(updatedAt)}</span>
            </span>
          )}
        </div>
        <div className="text-sm mt-[0.8rem]">{leadHeadline}</div>
        <ul>
          {features?.map((feature) => (
            <li key={feature} className="flex">
              <Check className="mt-[0.4rem]" />
              <p className="ms-[1.6rem] py-[0.4rem]">{feature}</p>
            </li>
          ))}
        </ul>
        {state === "purchased" && (
          <Button
            as={Link}
            href={`/course/${id}/lecture`}
            variant="primary"
            height="lg"
            className="w-full mt-[0.8rem] heading-md"
          >
            Go to course
          </Button>
        )}
        {state === "published" && (
          <Button
            as={Link}
            href={`/course/${id}/manage/basics`}
            variant="primary"
            height="lg"
            className="w-full mt-[0.8rem] heading-md"
          >
            Manage your course
          </Button>
        )}
        {state === "not_purchased" &&
          (cartCoursesIds.includes(id) ? (
            <Button
              as={Link}
              href="/cart"
              variant="primary"
              height="lg"
              className="w-full mt-[0.8rem] heading-md"
            >
              Go to cart
            </Button>
          ) : (
            <Button
              variant="primary"
              height="lg"
              className="w-full mt-[0.8rem] heading-md"
              onClick={() => addToCart(id)}
            >
              Add to cart
            </Button>
          ))}
      </div>
    </div>,
    document.body
  );
}
