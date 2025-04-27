"use client";

import { Button } from "@/components/general";
import { AlarmClock } from "lucide-react";
import { useState } from "react";

export default function ScheduleCTA() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="p-[1.6rem] border rounded-[1.6rem] border-[#d1d2e0] flex">
      <AlarmClock
        color="#303141"
        className="h-[3.2rem] w-[3.2rem] self-start"
      />
      <div className="ms-[1.6rem] min-h-[3.2rem]">
        <h2 className="heading-md">Schedule learning time</h2>
        <p className="mt-[0.4rem] text-sm">
          Learning a little each day adds up. Research shows that students who
          make learning a habit are more likely to reach their goals. Set time
          aside to learn and get reminders using your learning scheduler.
        </p>
        <div className="mt-[1.6rem] flex flex-wrap gap-[1.6rem]">
          <Button
            height="md"
            variant="ghost"
            className="text-udemy-purple"
            onClick={() => setIsDismissed(true)}
          >
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}
