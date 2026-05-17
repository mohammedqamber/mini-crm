"use client";

import { ChevronDown, Lock } from "lucide-react";
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
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Lock className="h-3 w-3" />
        <span>Status Locked</span>
      </div>
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
          Change Status
          <ChevronDown className="ml-1 h-3 w-3" />
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
