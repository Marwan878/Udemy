import { Globe } from "lucide-react";

export default function Language({ language }: { language: string }) {
  return (
    <div className="flex items-center mb-[1.6rem] text-sm">
      <Globe className="me-[0.8rem] h-[1.6rem] w-[1.6rem]" color="#303141" />
      <p>{language}</p>
    </div>
  );
}
