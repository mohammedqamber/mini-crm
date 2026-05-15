"use client";

//a generic board to build any specific board
import { ReactNode } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

interface KanbanBoardProps {
  onDragEnd: (result: DropResult) => void;
  children: ReactNode;
}

export function KanbanBoard({ onDragEnd, children }: KanbanBoardProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-2">{children}</div>
    </DragDropContext>
  );
}
