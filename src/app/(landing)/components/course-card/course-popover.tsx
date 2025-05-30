import { useCart } from "@/contexts/cart";
import { unixToMonthYear } from "@/lib/utils";
import {
  TAppropriatePopoverPosition,
  TCourse,
  TCourseState,
  TUser,
} from "@/types";
import { Check } from "lucide-react";
import { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Button } from "../../../../components/general";
import Tag from "./tag";
import Link from "next/link";
import {
  COURSE_POPOVER_WIDTH_IN_PX,
  COURSE_POPOVER_WIDTH_IN_REM,
} from "@/constants";

export default function CoursePopover({
  course,
  cardRect,
  state,
}: {
  course: TCourse & { instructor: TUser };
  cardRect: DOMRect | undefined;
  state: TCourseState;
}) {
  const { cartCoursesIds, addToCart } = useCart();
  const { title, leadHeadline, tag, updatedAt, id, whatYouWillLearn } = course;

  if (!cardRect) return null;

  let appropriatePopoverPosition: TAppropriatePopoverPosition;
  if (window.innerWidth - cardRect.right >= COURSE_POPOVER_WIDTH_IN_PX) {
    appropriatePopoverPosition = "right";
  } else if (cardRect.left >= COURSE_POPOVER_WIDTH_IN_PX) {
    appropriatePopoverPosition = "left";
  } else {
    appropriatePopoverPosition = "top";
  }

  const arrowStyle: CSSProperties = computeArrowStyle(
    appropriatePopoverPosition
  );

  return createPortal(
    <div
      style={{
        width: `${COURSE_POPOVER_WIDTH_IN_REM}rem`,
        ...computePopoverStyle(appropriatePopoverPosition, cardRect),
      }}
      className="absolute z-[100] px-[1rem] hidden lg:block"
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
          {whatYouWillLearn?.map((outcome) => (
            <li key={outcome} className="flex">
              <Check className="mt-[0.4rem]" />
              <p className="ms-[1.6rem] py-[0.4rem]">{outcome}</p>
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
              onClick={() => addToCart(course)}
            >
              Add to cart
            </Button>
          ))}
      </div>
    </div>,
    document.body
  );
}

const computeArrowStyle = (
  appropriatePopoverPosition: "left" | "right" | "top"
): CSSProperties => {
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

const computePopoverStyle = (
  appropriatePopoverPosition: TAppropriatePopoverPosition,
  cardRect: DOMRect
): CSSProperties => {
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
