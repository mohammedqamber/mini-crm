"use client";

import { useMemo } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { KanbanCard } from "@/modules/leads/components/KanbanCard";
import {
  STATUS_LABELS,
  STATUS_DOT_COLORS,
  type Lead,
  type LeadStatus,
} from "@/modules/leads/types";

interface KanbanColumnProps {
  status: LeadStatus;
  leads: Lead[];
  isLoading: boolean;
}

export function KanbanColumn({ status, leads, isLoading }: KanbanColumnProps) {
  const statusLeads = useMemo(
    () => leads.filter((lead) => lead.status === status),
    [leads, status],
  );

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50/50 min-w-[260px] w-[260px]">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100">
        <span className={`h-2 w-2 rounded-full ${STATUS_DOT_COLORS[status]}`} />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          {STATUS_LABELS[status]}
        </h3>
        <span className="ml-auto text-xs text-slate-400 font-medium">
          {statusLeads.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] transition-colors ${
              snapshot.isDraggingOver ? "bg-slate-100/80" : ""
            }`}
          >
            {isLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-md border border-slate-200 bg-white p-3 space-y-2"
                  >
                    <div className="h-3.5 w-3/4 rounded bg-slate-200" />
                    <div className="h-2.5 w-1/2 rounded bg-slate-200" />
                    <div className="h-2.5 w-12 rounded bg-slate-200" />
                  </div>
                ))}
              </>
            ) : statusLeads.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-xs text-slate-400">No leads</p>
              </div>
            ) : (
              statusLeads.map((lead, index) => (
                <Draggable key={lead.id} draggableId={lead.id} index={index}>
                  {(provided) => <KanbanCard lead={lead} provided={provided} />}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
