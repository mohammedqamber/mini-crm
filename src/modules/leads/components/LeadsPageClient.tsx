"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { LeadListActions } from "@/modules/leads/components/LeadListActions";
import { LeadsTable } from "@/modules/leads/components/LeadsTable";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { useFilteredLeads } from "@/modules/leads/hooks/useFilteredLeads";
import type { LeadStatus } from "@/modules/leads/types";
import { useSearchParamsArrayState } from "@/hooks/useSearchParamsArrayState";
import { StatusFilter } from "./StatusFilter";
import { FilterBar } from "@/components/filters/FilterBar";
import ErrorState from "@/components/error/ErrorState";
import { useLeadSearchShortcut } from "../hooks/useLeadSearchShortcut";

export default function LeadsPageClient() {
  const router = useRouter();
  const { data: leads, isLoading, isError, error, refetch } = useLeads();
  const [searchQuery, setSearchQuery] = useSearchParamsState("search");
  const [statusFilter, setStatusFilter] =
    useSearchParamsArrayState<LeadStatus>("status");
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
        <ErrorState
          title="Failed to load leads"
          error={error}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div>
      <TopBar searchValue={searchQuery} onSearchChange={handleSearchChange}>
        <LeadListActions onCreateLead={() => router.push("/leads/new")} />
      </TopBar>
      <FilterBar>
        <StatusFilter selected={statusFilter} onChange={setStatusFilter} />
      </FilterBar>

      <div className="p-3">
        {/* <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {isLoading
              ? "Loading leads..."
              : `${filteredLeads.length} lead${filteredLeads.length !== 1 ? "s" : ""} found`}
          </p>
        </div> */}
        <LeadsTable
          leads={filteredLeads}
          isLoading={isLoading}
          hasFilters={Boolean(searchQuery || statusFilter.length > 0)}
        />
      </div>
    </div>
  );
}
