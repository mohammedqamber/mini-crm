"use client";

import { DataTable } from "@/components/data-table/Table";
import type { Column } from "@/components/data-table/types";
import { LeadRowActions } from "@/modules/leads/components/LeadRowActions";
import { StatusBadge } from "@/modules/leads/components/StatusBadge";
import { formatLeadDate } from "@/modules/leads/lib/format";
import type { Lead } from "@/modules/leads/types";

const leadColumns: Column<Lead>[] = [
  {
    key: "name",
    header: "Name",
    render: (lead) => (
      <div>
        <div className="font-medium text-slate-900">{lead.name}</div>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (lead) => <span className="text-slate-600">{lead.email}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (lead) => <StatusBadge status={lead.status} />,
  },
  {
    key: "source",
    header: "Source",
    render: (lead) => (
      <span className="text-slate-500">{lead.source || "-"}</span>
    ),
  },
  {
    key: "updated",
    header: "Last Updated",
    render: (lead) => (
      <span className="text-slate-500">{formatLeadDate(lead.updated_at)}</span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
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
