import Input from "@/components/general/input";
import PageCard from "../page-card";
import { Button, Select } from "@/components/general";

export default function Page() {
  return (
    <PageCard heading="Pricing">
      <div className="space-y-6">
        <h2 className="heading-md font-medium text-gray-900">
          Set a price for your course
        </h2>

        <p className="text-gray-600">
          Please select the currency and the price tier for your course. If
          you&apos;d like to offer your course for free, it must have a total
          video length of less than 2 hours.
        </p>

        <form className="space-y-4">
          <div className="flex gap-8 items-center">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Currency
              </label>
              <Select
                className="w-36"
                name="currency"
                options={[
                  { displayName: "USD", value: "usd" },
                  { displayName: "EGP", value: "egp" },
                ]}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Price</label>
              <Input type="number" min={0} required />
            </div>
          </div>
          <Button className="font-bold min-w-0" height="md">
            Save
          </Button>
        </form>
      </div>
    </PageCard>
  );
}
