import { ReactNode } from "react";

export default function Popper({ children }: { children: ReactNode }) {
  return (
    <div className="relative group z-50 h-full flex items-center justify-center">
      {children}
    </div>
  );
}

function PopperTrigger({ children }: { children: ReactNode }) {
  return children;
}

function PopperContent({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-[28.8rem] absolute right-0 translate-y-full bottom-0 py-4 text-center rounded-[0.8rem] border border-gray-400 hidden group-hover:block bg-white text-bold">
      {children}
    </div>
  );
}

Popper.Trigger = PopperTrigger;
Popper.Content = PopperContent;
