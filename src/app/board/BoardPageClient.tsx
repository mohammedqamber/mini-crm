"use client";

import { useEffect, useMemo } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/layout/TopBar";
import { KanbanColumn } from "@/modules/leads/components/KanbanColumn";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { ALL_STATUSES, type Lead } from "@/modules/leads/types";

export function BoardPageClient() {
  const { data: leads, isLoading, isError, error, refetch } = useLeads();
  const [searchQuery] = useSearchParamsState("search");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[placeholder="Search leads..."]',
        );
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    if (!searchQuery) return leads;

    return leads.filter(
      (lead: Lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [leads, searchQuery]);

  if (isError) {
    return (
      <div>
        <TopBar />
        <div className="flex flex-col items-center justify-center py-24">
          <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">
            Failed to load board
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBar searchValue={searchQuery} onSearchChange={() => {}} />

      <div className="p-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {ALL_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              leads={filteredLeads}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
