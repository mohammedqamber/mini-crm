"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { LeadListActions } from "@/modules/leads/components/LeadListActions";
import { LeadErrorState } from "@/modules/leads/components/LeadPageStates";
import { LeadsTable } from "@/modules/leads/components/LeadsTable";
import { useLeadSearchShortcut } from "@/modules/leads/hooks/use-lead-search-shortcut";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { useFilteredLeads } from "../hooks/useFilteredLeads";

export function LeadsPageClient() {
  const router = useRouter();
  const { data: leads, isLoading, isError, error, refetch } = useLeads();
  const [searchQuery, setSearchQuery] = useSearchParamsState("search");
  const [statusFilter, setStatusFilter] = useSearchParamsState("status");
  const filteredLeads = useFilteredLeads(leads, { searchQuery, statusFilter });

  useLeadSearchShortcut();

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [setSearchQuery],
  );

  if (isError) {
    return (
      <div>
        <TopBar />
        <LeadErrorState
          title="Failed to load leads"
          error={error}
          fallback="Something went wrong"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div>
      <TopBar searchValue={searchQuery} onSearchChange={handleSearchChange}>
        <LeadListActions
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onCreateLead={() => router.push("/leads/new")}
        />
      </TopBar>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {isLoading
              ? "Loading leads..."
              : `${filteredLeads.length} lead${filteredLeads.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        <LeadsTable
          leads={filteredLeads}
          isLoading={isLoading}
          hasFilters={Boolean(searchQuery || statusFilter)}
        />
      </div>
    </div>
  );
}
