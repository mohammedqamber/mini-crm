"use client";

//a geenric column to build specific kanban column
import { ReactNode } from "react";
import { Droppable } from "@hello-pangea/dnd";

interface KanbanColumnProps {
  droppableId: string;
  header: ReactNode;
  isDropDisabled?: boolean;
  isLoading?: boolean;
  loadingFallback?: ReactNode;
  isEmpty?: boolean;
  emptyFallback?: ReactNode;
  children: ReactNode;
}

export function KanbanColumn({
  droppableId,
  header,
  isDropDisabled = false,
  isLoading,
  loadingFallback,
  isEmpty,
  emptyFallback,
  children,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50/50 min-w-65 w-65">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100">
        {header}
      </div>

      <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] transition-colors ${
              snapshot.isDraggingOver ? "bg-slate-100/80" : ""
            }`}
          >
            {isLoading && loadingFallback}
            {!isLoading && isEmpty && emptyFallback}
            {!isLoading && !isEmpty && children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
