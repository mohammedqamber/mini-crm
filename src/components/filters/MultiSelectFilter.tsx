"use client";

import * as React from "react";
import { ChevronDown, Search, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface FilterOption {
  value: string;
  label: string;
  color?: string; // tailwind bg color class e.g. "bg-emerald-500"
  dotColor?: string; // hex or named color for inline dot
}

interface MultiSelectFilterProps {
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

export function MultiSelectFilter({
  label,
  options,
  selected,
  onChange,
  placeholder = "Any",
  searchPlaceholder = "Search...",
  className,
}: MultiSelectFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  React.useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [open]);

  const hasSelection = selected.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border text-xs font-medium transition-colors",
            "bg-background text-foreground border-border",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            hasSelection && "border-primary/40 bg-primary/5",
            className,
          )}
        >
          <span className="text-muted-foreground font-normal">{label}</span>

          {hasSelection ? (
            <>
              <span className="text-foreground font-medium">
                {selected.length === 1
                  ? options.find((o) => o.value === selected[0])?.label
                  : `${selected.length} selected`}
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={clearAll}
                onKeyDown={(e) => e.key === "Enter" && clearAll(e as any)}
                className="ml-0.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-border p-0.5 transition-colors"
                aria-label="Clear filter"
              >
                <X className="size-3" />
              </span>
            </>
          ) : (
            <>
              <span className="text-muted-foreground font-normal">
                {placeholder}
              </span>
              <ChevronDown
                className={cn(
                  "size-3 text-muted-foreground transition-transform",
                  open && "rotate-180",
                )}
              />
            </>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={4}
        className="w-56 p-0 shadow-md rounded-lg border border-border overflow-hidden"
      >
        {/* Header */}
        <div className="px-3 pt-3 pb-2 border-b border-border">
          <p className="text-xs font-semibold text-foreground mb-2">
            Filter by {label}
          </p>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground pointer-events-none" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                "w-full h-7 pl-6 pr-2 text-xs rounded-md border border-input bg-background",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring",
                "transition-colors",
              )}
            />
          </div>
        </div>

        {/* Options */}
        <div className="max-h-52 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="px-3 py-4 text-xs text-center text-muted-foreground">
              No options found
            </p>
          ) : (
            filtered.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggle(option.value)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-left",
                    "hover:bg-accent hover:text-accent-foreground transition-colors",
                    isSelected && "bg-accent/50",
                  )}
                >
                  {/* Custom checkbox */}
                  <span
                    className={cn(
                      "size-3.5 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors",
                      isSelected
                        ? "bg-primary border-primary"
                        : "border-input bg-background",
                    )}
                  >
                    {isSelected && (
                      <Check className="size-2.5 text-primary-foreground stroke-[3]" />
                    )}
                  </span>

                  {/* Color dot */}
                  {option.dotColor && (
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: option.dotColor }}
                    />
                  )}

                  <span className="flex-1 text-foreground">{option.label}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        {hasSelection && (
          <div className="border-t border-border px-3 py-2">
            <button
              onClick={() => onChange([])}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all ({selected.length})
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
