"use client";

// a generic kanban card to build any specific kanban card
import { ReactNode } from "react";
import { Draggable } from "@hello-pangea/dnd";

interface KanbanCardProps {
  draggableId: string;
  index: number;
  isDragDisabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function KanbanCard({
  draggableId,
  index,
  isDragDisabled = false,
  onClick,
  children,
}: KanbanCardProps) {
  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className="cursor-pointer rounded-md border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}
