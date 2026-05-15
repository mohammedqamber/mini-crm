"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/layout/TopBar";
import { KanbanColumn } from "@/modules/leads/components/KanbanColumn";
import { useLeads, useUpdateLeadStatus } from "@/modules/leads/hooks/useLeads";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { type Lead, type LeadStatus } from "@/modules/leads/types";
import { ALL_STATUSES } from "@/modules/leads/lib/status-machine";
import { useToast } from "@/hooks/use-toast";

export default function BoardPageClient() {
  const { data: leads, isLoading, isError, error, refetch } = useLeads();
  const updateLeadStatus = useUpdateLeadStatus();
  const [searchQuery] = useSearchParamsState("search");
  const [optimisticLeads, setOptimisticLeads] = useState<Lead[]>([]);

  const { error: ErrorToast } = useToast();

  // Sync optimistic state with server data
  useEffect(() => {
    if (leads) {
      setOptimisticLeads(leads);
    }
  }, [leads]);

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
    if (!optimisticLeads.length) return [];
    if (!searchQuery) return optimisticLeads;

    return optimisticLeads.filter(
      (lead: Lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [optimisticLeads, searchQuery]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as LeadStatus;
    const leadId = draggableId;

    // Optimistic update
    setOptimisticLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead,
      ),
    );

    // this  will Update backend
    try {
      await updateLeadStatus.mutateAsync({
        id: leadId,
        leadStatus: newStatus,
      });
    } catch (error) {
      // reverting optimistic update
      if (leads) {
        setOptimisticLeads(leads);
      }
    }
  };

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
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      </div>
    </div>
  );
}
