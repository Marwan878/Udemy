"use client";

import { useState } from "react";
import { Button } from "@/components/general";

interface NotificationBannerProps {
  title: string;
  description: string;
  onLearnMore: () => void;
}

export function NotificationBanner({
  title,
  description,
  onLearnMore,
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-white border rounded-md p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
              New
            </span>
            <h3 className="text-base font-semibold">{title}</h3>
          </div>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex gap-2">
            <Button
              onClick={onLearnMore}
              className="bg-violet-600 hover:bg-violet-700"
            >
              Learn more
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsVisible(false)}
              className="text-gray-700 hover:bg-gray-100"
            >
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
