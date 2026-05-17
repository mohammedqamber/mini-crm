"use client";

import { ChevronDown, Loader, Lock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { type LeadStatus } from "@/modules/leads/types";
import {
  getValidTransitions,
  isTerminalStatus,
  STATUS_LABELS,
} from "../lib/status-machine";
import { useLeadStatusTransition } from "../hooks/useLeadStatusTransition";
import { SimpleTooltip } from "@/components/common/Tooltip";

interface StatusTransitionProps {
  currentStatus: LeadStatus;
  leadId: string;
}

export function StatusTransition({
  currentStatus,
  leadId,
}: StatusTransitionProps) {
  const validNext = getValidTransitions(currentStatus);

  const { isUpdating, transitionStatusTo } = useLeadStatusTransition(leadId);

  if (isTerminalStatus(currentStatus)) {
    return (
      <SimpleTooltip message="This lead has reached a final status and can no longer be updated.">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
          <Lock className="h-3 w-3" />
          <span>Status Locked</span>
        </div>
      </SimpleTooltip>
    );
  }

  if (validNext.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={isUpdating}
          className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
        >
          {isUpdating ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              Change Status
              <ChevronDown className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {validNext.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => transitionStatusTo(status)}
            className="text-xs"
          >
            Mark as {STATUS_LABELS[status]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
