"use client";

import { useEffect, useRef, useState } from "react";

import { TFormats } from "@/types";
import FormattingControls from "./formatting-controls";

function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (newContent: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<TFormats>({
    bold: false,
    italic: false,
    orderedList: false,
    unorderedList: false,
    code: false,
  });

  // Function to handle (bold, italic) formatting commands
  const handleFormat = (command: string) => {
    // Focus the editor if it's not already focused
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.focus();
    }

    document.execCommand(command, false, undefined);

    updateActiveFormats();
  };

  const handleListFormat = (listType: "ordered" | "unordered") => {
    // Focus the editor if it's not already focused
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.focus();
    }

    // Save selection
    // const selection = window.getSelection();
    // if (!selection || selection.rangeCount === 0) return;

    // Determine the command based on list type
    const command =
      listType === "ordered" ? "insertOrderedList" : "insertUnorderedList";

    document.execCommand(command, false);

    // Force a recheck of active formats after a short delay
    // This helps ensure the UI updates correctly
    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  // Function to handle code blocks
  const handleCodeFormat = () => {
    // Focus the editor if it's not already focused
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.focus();
    }

    const selection = window.getSelection();
    if (!selection || !editorRef.current) return;

    // Get the selected text
    const selectedText = selection.toString();

    if (selectedText) {
      // Check if we're in a code block already
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;

      if (parentElement?.tagName === "CODE") {
        // We're in a code block, so unwrap it
        const textNode = document.createTextNode(selectedText);
        range.deleteContents();
        range.insertNode(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // Wrap in a code block
        const codeElement = document.createElement("code");
        codeElement.className = "bg-muted p-1 rounded font-mono text-sm";
        codeElement.textContent = selectedText;

        range.deleteContents();
        range.insertNode(codeElement);
        selection.removeAllRanges();
      }
    } else {
      // No selection, insert an empty code block at cursor
      const codeElement = document.createElement("code");
      codeElement.className = "bg-muted p-1 rounded font-mono text-sm";
      codeElement.textContent = " ";

      const range = selection.getRangeAt(0);
      range.insertNode(codeElement);

      // Position cursor inside the code block
      range.selectNodeContents(codeElement);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // Update active formats
    setActiveFormats((prev) => ({
      ...prev,
      code: !prev.code,
    }));
  };

  const handleInput = () => {
    updateActiveFormats();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      orderedList: document.queryCommandState("insertOrderedList"),
      unorderedList: document.queryCommandState("insertUnorderedList"),
      code: false, // We'll handle this separately
    });
  };

  // Ensure the editor always has valid content for list operations
  const ensureValidContent = () => {
    if (editorRef.current) {
      // If the editor is empty or only contains whitespace, insert a paragraph
      if (editorRef.current.innerHTML.trim() === "") {
        editorRef.current.innerHTML = "<p><br></p>";
      }

      // If the editor doesn't start with a block element, wrap content in a paragraph
      const firstChild = editorRef.current.firstChild;
      if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
        const p = document.createElement("p");
        p.appendChild(firstChild.cloneNode(true));
        editorRef.current.replaceChild(p, firstChild);
      }
    }
  };

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="border rounded-md">
      <FormattingControls
        activeFormats={activeFormats}
        ensureValidContent={ensureValidContent}
        handleCodeFormat={handleCodeFormat}
        handleFormat={handleFormat}
        handleListFormat={handleListFormat}
      />
      <div className="p-4">
        <div
          ref={editorRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="min-h-[200px] focus:outline-none prose max-w-none rich-text-editor"
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onInput={handleInput}
          onFocus={ensureValidContent}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
