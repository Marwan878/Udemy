import { cn } from "@/lib/utils";

type ButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  variant?: "primary" | "secondary" | "ghost" | "input";
  height?: "lg" | "md" | "sm";
} & React.ComponentPropsWithRef<T>;

export default function Button<T extends React.ElementType = "button">({
  as,
  children,
  height,
  className,
  variant = "primary",
  ...props
}: ButtonProps<T>) {
  let buttonClassName = "";

  switch (variant) {
    case "primary":
      buttonClassName =
        "hover:bg-[#892de1] bg-[#6d28d2] text-white px-[1.2rem]";
      break;
    case "secondary":
      buttonClassName =
        "hover:bg-btn-focus text-udemy-purple px-[1.2rem] border border-udemy-purple";
      break;
    case "ghost":
      buttonClassName = "hover:bg-btn-focus";
      break;
  }

  // h-[4.8rem] h-[4rem] h-[2.4rem]

  let buttonHeightInRem: number;
  switch (height) {
    case "lg":
      buttonHeightInRem = 4.8;
      break;
    case "md":
      buttonHeightInRem = 4;
      break;
    case "sm":
      buttonHeightInRem = 2.4;
      break;
    default:
      buttonHeightInRem = 4.8;
      break;
  }

  const Component = as || "button";
  return (
    <Component
      {...props}
      className={cn(
        `flex cursor-pointer items-center justify-center rounded-[0.4rem] h-[${buttonHeightInRem}rem] font-bold`,
        buttonClassName,
        className
      )}
    >
      {children}
    </Component>
  );
}
