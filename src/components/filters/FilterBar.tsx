"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FilterIcon, ListFilterIcon } from "lucide-react";

interface FilterBarProps {
  children?: React.ReactNode;
  className?: string;
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      role="toolbar"
      aria-label="Table filters"
      className={cn(
        " flex items-center justify-between gap-1.5 px-4 py-2 border-b border-border bg-background shrink-0",
        className,
      )}
    >
      <div className="flex gap-1.5 items-center">{children}</div>
      <FilterIcon className="text-slate-400" />
    </div>
  );
}

// Divider component for separating filter groups
export function FilterBarDivider() {
  return (
    <div aria-hidden="true" className="w-px h-4 bg-border mx-0.5 shrink-0" />
  );
}
