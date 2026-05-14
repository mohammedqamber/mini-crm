"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ALL_STATUSES, STATUS_LABELS } from "@/modules/leads/types";

interface LeadListActionsProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onCreateLead: () => void;
}

export function LeadListActions({
  statusFilter,
  onStatusChange,
  onCreateLead,
}: LeadListActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-8 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-400"
      >
        <option value="">All Statuses</option>
        {ALL_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
      <Button
        size="sm"
        onClick={onCreateLead}
        className="h-8"
        variant="default"
      >
        <Plus className="mr-1.5 h-3.5 w-3.5" />
        New Lead
      </Button>
    </div>
  );
}
