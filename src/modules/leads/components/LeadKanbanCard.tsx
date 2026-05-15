"use client";

import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { StatusBadge } from "@/modules/leads/components/StatusBadge";
import type { Lead } from "@/modules/leads/types";
import { isTerminalStatus } from "../lib/status-machine";
import { KanbanCard } from "@/components/kanban-builder/KanbanCard";

interface LeadKanbanCardProps {
  lead: Lead;
  index: number;
}

export function LeadKanbanCard({ lead, index }: LeadKanbanCardProps) {
  const router = useRouter();

  return (
    <KanbanCard
      draggableId={lead.id}
      index={index}
      isDragDisabled={isTerminalStatus(lead.status)}
      onClick={() => router.push(`/leads/${lead.id}`)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-medium text-slate-900 leading-tight">
          {lead.name}
        </h4>
        {isTerminalStatus(lead.status) && (
          <Lock className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
        )}
      </div>

      <p className="text-xs text-slate-500 mb-2 truncate">{lead.email}</p>

      <div className="flex items-center justify-between">
        <StatusBadge status={lead.status} />
        {lead.source && (
          <span className="text-[10px] text-slate-400">{lead.source}</span>
        )}
      </div>
    </KanbanCard>
  );
}
