import { useMemo } from "react";
import type { Lead } from "@/modules/leads/types";

interface LeadFilters {
  searchQuery: string;
  statusFilter: string;
}

export function useFilteredLeads(
  leads: Lead[] | undefined,
  { searchQuery, statusFilter }: LeadFilters,
) {
  return useMemo(() => {
    if (!leads) return [];

    const normalizedSearch = searchQuery.toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        !normalizedSearch ||
        lead.name.toLowerCase().includes(normalizedSearch) ||
        lead.email.toLowerCase().includes(normalizedSearch);

      const matchesStatus = !statusFilter || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);
}
