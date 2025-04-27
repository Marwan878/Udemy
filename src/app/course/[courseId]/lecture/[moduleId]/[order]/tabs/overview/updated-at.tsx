import { Upload } from "lucide-react";
import { unixToMonthYear } from "@/lib/utils";

export default function UpdatedAt({ updatedAt }: { updatedAt: number }) {
  return (
    <div className="flex items-center mb-[1.6rem] text-sm">
      <Upload className="me-[0.8rem] h-[1.6rem] w-[1.6rem]" color="#303141" />

      <p>Last updated {unixToMonthYear(updatedAt)}</p>
    </div>
  );
}
