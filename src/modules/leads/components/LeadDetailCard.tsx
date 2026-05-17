"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/modules/leads/components/StatusBadge";
import { StatusTransition } from "@/modules/leads/components/StatusTransition";
import { formatLeadDate } from "@/modules/leads/lib/format";
import type { Lead, LeadStatus } from "@/modules/leads/types";

interface LeadDetailCardProps {
  lead: Lead;
  onEdit: () => void;
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <p className="mt-0.5 text-sm text-slate-900">{value || "-"}</p>
    </div>
  );
}

export function LeadDetailCard({ lead, onEdit }: LeadDetailCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-1">
            {lead.name}
          </h2>
          <StatusBadge status={lead.status} />
        </div>
        <div className="flex items-center gap-2">
          <StatusTransition currentStatus={lead.status} leadId={lead.id} />
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DetailField label="Email" value={lead.email} />
        <DetailField label="Phone" value={lead.phone} />
        <DetailField label="Source" value={lead.source} />
        <DetailField label="Created" value={formatLeadDate(lead.created_at)} />
      </div>
    </div>
  );
}
