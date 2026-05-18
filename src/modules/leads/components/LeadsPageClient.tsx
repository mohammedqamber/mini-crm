"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { LeadListActions } from "@/modules/leads/components/LeadListActions";
import { LeadsTable } from "@/modules/leads/components/LeadsTable";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import type { LeadStatus } from "@/modules/leads/types";
import { useSearchParamsArrayState } from "@/hooks/useSearchParamsArrayState";
import { StatusFilter } from "./StatusFilter";
import { FilterBar } from "@/components/filters/FilterBar";
import ErrorState from "@/components/error/ErrorState";
import { useLeadSearchShortcut } from "../hooks/useLeadSearchShortcut";
import { debounce } from "@/lib/utils";

export default function LeadsPageClient() {
  const router = useRouter();

  //sets the filter state (URL-backed)
  const [searchQuery, setSearchQuery] = useSearchParamsState("search");
  const [statusFilter, setStatusFilter] =
    useSearchParamsArrayState<LeadStatus>("status");

  const {
    data: leads,
    isLoading,
    isError,
    error,
    refetch,
  } = useLeads(searchQuery, statusFilter);

  // Decoupled local input state so typing doesn't thrash the router
  const [inputValue, setInputValue] = useState(searchQuery ?? "");

  // Sync URL -> input on popstate / initial load
  useEffect(() => {
    setInputValue(searchQuery ?? "");
  }, [searchQuery]);

  // Debounce input -> URL (300ms) to prevent Next.js navigation on every keystroke
  const debouncedSetSearchQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
      }, 300),
    [setSearchQuery],
  );

  useLeadSearchShortcut();

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSetSearchQuery(value);
  };

  const handleRetry = () => refetch();

  return (
    <div>
      <TopBar
        title="Leads"
        searchValue={inputValue}
        onSearchChange={handleSearchChange}
      >
        <LeadListActions onCreateLead={() => router.push("/leads/new")} />
      </TopBar>
      <FilterBar>
        <StatusFilter selected={statusFilter} onChange={setStatusFilter} />
      </FilterBar>

      <div className="p-3">
        {isError ? (
          <ErrorState
            title="Failed to load leads"
            error={error}
            onRetry={handleRetry}
          />
        ) : (
          <LeadsTable
            leads={leads ?? []}
            isLoading={isLoading}
            hasFilters={Boolean(searchQuery || statusFilter.length > 0)}
          />
        )}
      </div>
    </div>
  );
}
