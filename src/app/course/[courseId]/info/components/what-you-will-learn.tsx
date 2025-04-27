import { Check } from "lucide-react";
import React from "react";

export default function whatYouWillLearn({ outcomes }: { outcomes: string[] }) {
  return (
    <div className="border border-gray-200 rounded-md p-6 lg:mt-20">
      <h2 className="text-4xl font-bold mb-8">What you'll learn</h2>

      <div className="grid grid-cols-1 md:grid-rows-[repeat(6, auto)] md:grid-cols-[auto_auto] h-fit  gap-2">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex items-start">
            <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
