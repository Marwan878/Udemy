import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

interface DragDropListProps {
  items: string[];
  onReorder: (items: string[]) => void;
  className?: string;
  children: React.ReactNode;
  itemsAreDraggable?: boolean;
}

const ListContext = createContext<{
  handleDragStart: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
  handleDrop: () => void;
  draggedIndex: number | null;
  itemsAreDraggable?: boolean;
} | null>(null);

export default function DragDropList({
  items,
  onReorder,
  children,
  className,
  itemsAreDraggable = true,
}: DragDropListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [ghost, setGhost] = useState<HTMLElement | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    const draggedElementRect = e.currentTarget.getBoundingClientRect();

    const userDragX = e.clientX - draggedElementRect.left;
    const userDragY = e.clientY - draggedElementRect.top;

    const ghost = e.currentTarget.cloneNode(true) as HTMLElement;
    ghost.className = "opacity-100 flex";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, userDragX, userDragY);
    setGhost(ghost);

    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();

    const listItem = e.currentTarget as HTMLLIElement;
    const rect = listItem.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;

    let newDropIndex;
    if (index === 0 && e.clientY < midpoint) {
      newDropIndex = 0;
    } else if (index === items.length - 1 && e.clientY >= rect.top) {
      newDropIndex = items.length - 1;
    } else {
      newDropIndex = e.clientY >= rect.top ? index : index - 1;
    }

    if (draggedIndex === newDropIndex) return; // prevent unnecessary reordering

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(newDropIndex, 0, draggedItem);

    setDraggedIndex(newDropIndex);
    onReorder(newItems);
  };

  const handleDrop = () => {
    setDraggedIndex(null);
    if (ghost) {
      document.body.removeChild(ghost);
      setGhost(null);
    }
  };

  return (
    <ListContext.Provider
      value={{
        handleDragStart,
        handleDragOver,
        handleDrop,
        draggedIndex,
        itemsAreDraggable,
      }}
    >
      <ul className={className} onDragOver={(e) => e.preventDefault()}>
        {children}
      </ul>
    </ListContext.Provider>
  );
}

function DragDropItem({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error("DragDropItem must be used within a DragDropList");
  }

  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    draggedIndex,
    itemsAreDraggable,
  } = context;
  const isDragging = draggedIndex === index;

  return (
    <li
      draggable={itemsAreDraggable}
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
      className={cn(className, isDragging && "opacity-50")}
      onDragEnd={handleDrop}
    >
      {children}
    </li>
  );
}

DragDropList.Item = DragDropItem;
