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
import type { Lead } from "@/modules/leads/types";
import { SimpleTooltip } from "@/components/common/Tooltip";
interface LeadRowActionsProps {
  lead: Lead;
}

export function LeadRowActions({ lead }: LeadRowActionsProps) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-1">
        <div className="flex">
          <SimpleTooltip message="View">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-slate-900"
              onClick={() => router.push(`/leads/${lead.id}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </SimpleTooltip>

          <SimpleTooltip message="Edit">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-slate-900"
              onClick={() => router.push(`/leads/${lead.id}/edit`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </SimpleTooltip>

          <SimpleTooltip message="Delete">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-red-600"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </SimpleTooltip>
        </div>

        <div className="ml-2 border-l border-slate-200 pl-2">
          <StatusTransition currentStatus={lead.status} leadId={lead.id} />
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
