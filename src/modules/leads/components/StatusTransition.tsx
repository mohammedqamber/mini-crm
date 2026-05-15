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

interface StatusTransitionProps {
  currentStatus: LeadStatus;
  onTransition: (newStatus: LeadStatus) => void;
  isUpdating?: boolean;
}

export function StatusTransition({
  currentStatus,
  onTransition,
  isUpdating = false,
}: StatusTransitionProps) {
  const validNext = getValidTransitions(currentStatus);

  if (isTerminalStatus(currentStatus)) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Lock className="h-3 w-3" />
        <span>Locked</span>
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
            onClick={() => onTransition(status)}
            className="text-xs"
          >
            Mark as {STATUS_LABELS[status]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
