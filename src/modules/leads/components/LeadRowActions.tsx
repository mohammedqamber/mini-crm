"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { StatusTransition } from "@/modules/leads/components/StatusTransition";
import { DeleteLeadDialog } from "@/modules/leads/components/DeleteLeadDialog";
import { useUpdateLeadStatus } from "@/modules/leads/hooks/useLeads";
import type { Lead, LeadStatus } from "@/modules/leads/types";
import { showToast } from "@/lib/toast";

interface LeadRowActionsProps {
  lead: Lead;
}

export function LeadRowActions({ lead }: LeadRowActionsProps) {
  const router = useRouter();
  const updateLeadStatus = useUpdateLeadStatus();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleStatusTransition = (newStatus: LeadStatus) => {
    updateLeadStatus.mutate(
      { id: lead.id, leadStatus: newStatus },
      {
        onSuccess: () => {
          showToast({
            variant: "success",
            message: `Status updated to ${newStatus}`,
          });
        },
        onError: (err) => {
          showToast({
            variant: "error",
            message:
              err instanceof Error ? err.message : "Failed to update status",
          });
        },
      },
    );
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-slate-900"
                onClick={() => router.push(`/leads/${lead.id}`)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-slate-900"
                onClick={() => router.push(`/leads/${lead.id}/edit`)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-red-600"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="ml-2 border-l border-slate-200 pl-2">
          <StatusTransition
            currentStatus={lead.status}
            onTransition={handleStatusTransition}
            isUpdating={updateLeadStatus.isPending}
          />
        </div>
      </div>

      <DeleteLeadDialog
        leadId={lead.id}
        leadName={lead.name}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
