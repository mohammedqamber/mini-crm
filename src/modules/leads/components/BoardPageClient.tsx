"use client";

import { useEffect, useMemo, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { TopBar } from "@/components/layout/TopBar";
import { useLeads, useUpdateLeadStatus } from "@/modules/leads/hooks/useLeads";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { type Lead, type LeadStatus } from "@/modules/leads/types";
import {
  ALL_STATUSES,
  getValidTransitions,
} from "@/modules/leads/lib/status-machine";
import ErrorState from "@/components/error/ErrorState";
import { LeadKanbanColumn } from "./LeadKanbanColumn";
import { KanbanBoard } from "@/components/kanban-builder/KanbanBoard";
import { showToast } from "@/lib/toast";
import { useLeadSearchShortcut } from "../hooks/useLeadSearchShortcut";

export default function BoardPageClient() {
  const { data: leads, isLoading, isError, error, refetch } = useLeads();
  const updateLeadStatus = useUpdateLeadStatus();
  const [searchQuery] = useSearchParamsState("search");
  const [optimisticLeads, setOptimisticLeads] = useState<Lead[]>([]);

  // Sync optimistic state with server data
  useEffect(() => {
    if (leads) {
      setOptimisticLeads(leads);
    }
  }, [leads]);

  useLeadSearchShortcut();

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

    if (
      !getValidTransitions(source.droppableId as LeadStatus).includes(
        destination.droppableId as LeadStatus,
      )
    ) {
      showToast({ variant: "error", message: "Invalid status update" });
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
      <ErrorState
        title="Failed to load board"
        error={error}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div>
      <TopBar searchValue={searchQuery} onSearchChange={() => {}} />

      <div className="p-6">
        <KanbanBoard onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {ALL_STATUSES.map((status) => (
              <LeadKanbanColumn
                key={status}
                status={status}
                leads={filteredLeads}
                isLoading={isLoading}
              />
            ))}
          </div>
        </KanbanBoard>
      </div>
    </div>
  );
}
