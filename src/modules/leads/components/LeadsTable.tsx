"use client";

import { Avatar } from "@/components/Avatar";
import { DataTable } from "@/components/data-table/Table";
import type { Column } from "@/components/data-table/types";
import { LeadRowActions } from "@/modules/leads/components/LeadRowActions";
import { StatusBadge } from "@/modules/leads/components/StatusBadge";
import { formatLeadDate } from "@/modules/leads/lib/format";
import type { Lead } from "@/modules/leads/types";
import { Mail } from "lucide-react";

const leadColumns: Column<Lead>[] = [
  {
    key: "name",
    header: "NAME",
    render: (lead) => (
      <div>
        <div className="font-medium text-slate-900 flex items-center gap-2">
          <Avatar name={lead.name} />
          {lead.name}
        </div>
      </div>
    ),
  },
  {
    key: "email",
    header: "EMAIL",
    render: (lead) => (
      <span className="text-slate-600 flex gap-2 items-center">
        <Mail className="h-3 w-3" />
        {lead.email}
      </span>
    ),
  },
  {
    key: "status",
    header: "STATUS",
    render: (lead) => <StatusBadge status={lead.status} />,
  },
  {
    key: "source",
    header: "SOURCE",
    render: (lead) => (
      <span className="text-slate-500">{lead.source || "-"}</span>
    ),
  },
  {
    key: "updated",
    header: "LAST UPDATED",
    render: (lead) => (
      <span className="text-slate-500">{formatLeadDate(lead.updated_at)}</span>
    ),
  },
  {
    key: "actions",
    header: "ACTIONS",
    className: "w-48",
    render: (lead) => <LeadRowActions lead={lead} />,
  },
];

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  hasFilters: boolean;
}

export function LeadsTable({ leads, isLoading, hasFilters }: LeadsTableProps) {
  return (
    <DataTable
      columns={leadColumns}
      data={leads}
      keyExtractor={(lead) => lead.id}
      isLoading={isLoading}
      emptyMessage={
        hasFilters
          ? "No leads match your filters"
          : "No leads yet. Create your first lead to get started."
      }
    />
  );
}
