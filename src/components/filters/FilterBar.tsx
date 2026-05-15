"use client";

import * as React from "react";
import {
  ArrowUpDown,
  SlidersHorizontal,
  Settings2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterOption, MultiSelectFilter } from "./MultiSelectFilter";

// ─── Sort config ────────────────────────────────────────────────────────────

export interface SortOption {
  value: string;
  label: string;
}

export interface SortConfig {
  options: SortOption[];
  selected: string;
  onChange: (value: string) => void;
}

// ─── Filter config ───────────────────────────────────────────────────────────

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  searchPlaceholder?: string;
}

// ─── Rules / filter button ───────────────────────────────────────────────────

export interface RulesConfig {
  count: number;
  onClick?: () => void;
}

// ─── View settings button ────────────────────────────────────────────────────

export interface ViewSettingsConfig {
  onClick?: () => void;
}

// ─── FilterBar props ─────────────────────────────────────────────────────────

interface FilterBarProps {
  sort?: SortConfig;
  filters?: FilterConfig[];
  rules?: RulesConfig;
  viewSettings?: ViewSettingsConfig;
  className?: string;
}

// ─── Divider ─────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div aria-hidden="true" className="w-px h-4 bg-border mx-0.5 shrink-0" />
  );
}

// ─── Sort button ─────────────────────────────────────────────────────────────

function SortButton({ sort }: { sort: SortConfig }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const selected = sort.options.find((o) => o.value === sort.selected);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-border",
          "text-xs font-medium text-foreground bg-background hover:bg-accent transition-colors",
        )}
      >
        <ArrowUpDown className="size-3 text-muted-foreground" />
        <span className="text-muted-foreground font-normal">Sort by</span>
        <span>{selected?.label ?? "—"}</span>
        <ChevronDown
          className={cn(
            "size-3 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 w-44 rounded-lg border border-border bg-background shadow-md py-1 overflow-hidden">
          {sort.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                sort.onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                opt.value === sort.selected
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── FilterBar ────────────────────────────────────────────────────────────────

export function FilterBar({
  sort,
  filters = [],
  rules,
  viewSettings,
  className,
}: FilterBarProps) {
  const activeFilterCount = filters.filter((f) => f.selected.length > 0).length;

  const showLeftDivider = !!sort && filters.length > 0;
  const showRightDivider = filters.length > 0 && (!!rules || !!viewSettings);

  return (
    <div
      role="toolbar"
      aria-label="Table filters"
      className={cn(
        "h-10 flex items-center gap-1.5 px-4 border-b border-border bg-background shrink-0",
        className,
      )}
    >
      {/* Sort */}
      {sort && <SortButton sort={sort} />}

      {showLeftDivider && <Divider />}

      {/* Multi-select filters */}
      {filters.map((filter) => (
        <MultiSelectFilter
          key={filter.key}
          label={filter.label}
          options={filter.options}
          selected={filter.selected}
          onChange={filter.onChange}
          searchPlaceholder={filter.searchPlaceholder}
        />
      ))}

      {showRightDivider && <Divider />}

      {/* Rules / Filter summary button */}
      {rules && (
        <button
          onClick={rules.onClick}
          className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-border text-xs font-medium text-foreground bg-background hover:bg-accent transition-colors"
        >
          <SlidersHorizontal className="size-3 text-muted-foreground" />
          {activeFilterCount > 0 ? (
            <>
              <span className="text-muted-foreground font-normal">Filter</span>
              <span className="inline-flex items-center justify-center size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                {activeFilterCount}
              </span>
            </>
          ) : (
            <span>{rules.count} Rules</span>
          )}
        </button>
      )}

      {/* View settings */}
      {viewSettings && (
        <button
          onClick={viewSettings.onClick}
          className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-border text-xs font-medium text-foreground bg-background hover:bg-accent transition-colors"
        >
          <Settings2 className="size-3 text-muted-foreground" />
          <span>View Settings</span>
        </button>
      )}
    </div>
  );
}
