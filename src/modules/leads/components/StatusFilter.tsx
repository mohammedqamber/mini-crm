"use client";

import {
  MultiSelectFilter,
  type FilterOption,
} from "@/components/filters/MultiSelectFilter";
import { LeadStatus } from "../types";
import { STATUS_DOT_COLORS } from "../lib/ui";
import { ALL_STATUSES, STATUS_LABELS } from "../lib/status-machine";

const STATUS_OPTIONS: FilterOption<LeadStatus>[] = ALL_STATUSES.map(
  (status) => ({
    value: status,
    label: STATUS_LABELS[status],
    dotColor: STATUS_DOT_COLORS[status],
  }),
);

interface StatusFilterProps {
  selected: LeadStatus[];
  onChange: (selected: LeadStatus[]) => void;
  className?: string;
}

export function StatusFilter({
  selected,
  onChange,
  className,
}: StatusFilterProps) {
  return (
    <MultiSelectFilter<LeadStatus>
      label="Status"
      options={STATUS_OPTIONS}
      selected={selected}
      onChange={onChange}
      className={className}
    />
  );
}
