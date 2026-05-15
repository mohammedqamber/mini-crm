"use client";

import { useMemo } from "react";
import { type Lead, type LeadStatus } from "@/modules/leads/types";
import { STATUS_DOT_COLORS } from "../lib/ui";
import { STATUS_LABELS } from "../lib/status-machine";
import { LeadKanbanCard } from "./LeadKanbanCard";
import { KanbanColumn } from "@/components/kanban-builder/KanbanColumn";

interface KanbanColumnProps {
  status: LeadStatus;
  leads: Lead[];
  isLoading: boolean;
}

export function LeadKanbanColumn({
  status,
  leads,
  isLoading,
}: KanbanColumnProps) {
  const statusLeads = useMemo(
    () => leads.filter((lead) => lead.status === status),
    [leads, status],
  );

  return (
    <KanbanColumn
      droppableId={status}
      header={
        <>
          <span
            className={`h-2 w-2 rounded-full ${STATUS_DOT_COLORS[status]}`}
          />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            {STATUS_LABELS[status]}
          </h3>
          <span className="ml-auto text-xs text-slate-400 font-medium">
            {statusLeads.length}
          </span>
        </>
      }
      isLoading={isLoading}
      loadingFallback={
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
      }
      isEmpty={statusLeads.length === 0}
      emptyFallback={
        <div className="flex items-center justify-center py-8">
          <p className="text-xs text-slate-400">No leads</p>
        </div>
      }
    >
      {statusLeads.map((lead, index) => (
        <LeadKanbanCard key={lead.id} lead={lead} index={index} />
      ))}
    </KanbanColumn>
  );
}
