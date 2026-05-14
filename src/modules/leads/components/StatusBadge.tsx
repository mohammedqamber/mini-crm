"use client";

import { Badge } from "@/components/ui/Badge";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  type LeadStatus,
} from "@/modules/leads/types";

interface StatusBadgeProps {
  status: LeadStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`${STATUS_COLORS[status]} inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium`}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}
