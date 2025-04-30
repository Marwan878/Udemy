"use client";

import { Select } from "@/components/general";
import Input from "@/components/general/input";
import { useCourseManagement } from "@/contexts/course-management";
import PageCard from "../page-card";

export default function Page() {
  const { courseData, setCourseData } = useCourseManagement();
  return (
    <PageCard heading="Pricing">
      <div className="space-y-6">
        <h2 className="heading-md font-medium text-gray-900">
          Set a price for your course
        </h2>
        <p className="text-gray-600">
          Please select the currency and the price tier for your course.
        </p>

        <div className="space-y-4">
          <div className="flex gap-8 items-center">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Currency
              </label>
              <Select
                className="w-36"
                name="currency"
                options={[{ displayName: "USD", value: "usd" }]}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Price</label>
              <Input
                type="number"
                min={0}
                value={courseData.price ?? 0}
                setContent={(newContent) =>
                  setCourseData((prev) => ({ ...prev, price: +newContent }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </PageCard>
  );
}
