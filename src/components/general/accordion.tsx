"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  createContext,
  CSSProperties,
  useContext,
  useEffect,
  useState,
} from "react";

const AccordionContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  isDynamic: boolean;
  onFirstOpen?: () => Promise<void>;
} | null>(null);

export default function Accordion({
  className,
  children,
  style,
  isDynamic = true,
  onFirstOpen,
}: {
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
  isDynamic?: boolean;
  onFirstOpen?: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((curr) => !curr);

  return (
    <AccordionContext.Provider
      value={{
        isOpen: isDynamic ? isOpen : true,
        toggle,
        isDynamic,
        onFirstOpen,
      }}
    >
      <div className={className} style={style}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionHeader({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionHeader must be used within an Accordion");
  }

  return (
    <div
      style={style}
      className={cn("flex justify-between cursor-pointer", className, {})}
      onClick={context.toggle}
    >
      <div>{children}</div>
      {context.isDynamic && (
        <span
          style={{ animationFillMode: "forwards" }}
          className={cn("transition-transform self-start", {
            "-rotate-180": context.isOpen,
          })}
        >
          <ChevronDown />
        </span>
      )}
    </div>
  );
}

export function AccordionBody({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionBody must be used within an Accordion");
  }

  const { isOpen, onFirstOpen } = context;

  useEffect(() => {
    if (isOpen) {
      onFirstOpen?.();
    }
  }, [onFirstOpen, isOpen]);

  return isOpen ? (
    <div className={className} style={style}>
      {children}
    </div>
  ) : null;
}
