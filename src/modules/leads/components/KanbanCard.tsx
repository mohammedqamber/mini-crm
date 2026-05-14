"use client";

import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { StatusBadge } from "@/modules/leads/components/StatusBadge";
import type { Lead } from "@/modules/leads/types";
import { isTerminalStatus } from "../lib/status-machine";

interface KanbanCardProps {
  lead: Lead;
}

export function KanbanCard({ lead }: KanbanCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/leads/${lead.id}`)}
      className="cursor-pointer rounded-md border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
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
    </div>
  );
}
