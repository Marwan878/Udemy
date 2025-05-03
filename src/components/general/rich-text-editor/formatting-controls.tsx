import { Button } from "@/components/general";
import { Bold, Italic, List, ListOrdered, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { TFormats } from "@/types";

export default function FormattingControls({
  activeFormats,
  handleFormat,
  ensureValidContent,
  handleListFormat,
  handleCodeFormat,
}: {
  activeFormats: TFormats;
  handleFormat: (command: string, value?: string) => void;
  ensureValidContent: () => void;
  handleListFormat: (listType: "ordered" | "unordered") => void;
  handleCodeFormat: () => void;
}) {
  return (
    <div className="flex items-center border-b p-2 gap-1">
      <Button
        type="button"
        variant="ghost"
        height="sm"
        className={cn("h-8 w-8 p-0", activeFormats.bold ? "bg-muted" : "")}
        onClick={() => handleFormat("bold")}
        aria-label="Add bold format"
      >
        <Bold className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        height="sm"
        className={cn("h-8 w-8 p-0", activeFormats.italic ? "bg-muted" : "")}
        onClick={() => handleFormat("italic")}
        aria-label="Add italic format"
      >
        <Italic className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        height="sm"
        className={cn(
          "h-8 w-8 p-0",
          activeFormats.unorderedList ? "bg-muted" : ""
        )}
        onClick={() => {
          ensureValidContent();
          handleListFormat("unordered");
        }}
        aria-label="Add unordered list format"
      >
        <List className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        height="sm"
        className={cn(
          "h-8 w-8 p-0",
          activeFormats.orderedList ? "bg-muted" : ""
        )}
        onClick={() => {
          ensureValidContent();
          handleListFormat("ordered");
        }}
        aria-label="Add ordered list format"
      >
        <ListOrdered className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        height="sm"
        className={cn("h-8 w-8 p-0", activeFormats.code ? "bg-muted" : "")}
        onClick={handleCodeFormat}
        aria-label="Add code format"
      >
        <Code className="h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}
