"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/Checkbox";

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
}

interface MultiSelectFilterProps<T extends string = string> {
  label: string;
  options: FilterOption<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
  className?: string;
}

export function MultiSelectFilter<T extends string = string>({
  label,
  options,
  selected,
  onChange,
  className,
}: MultiSelectFilterProps<T>) {
  const [open, setOpen] = useState(false);

  const handleToggle = (value: T) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleClearAll = () => {
    onChange([]);
    setOpen(false);
  };

  const selectedLabels = selected
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean);

  const hasSelection = selected.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 gap-1.5 font-normal",
            hasSelection && "bg-slate-50 border-slate-400",
            className,
          )}
        >
          {label}
          {hasSelection && (
            <span className="ml-1 rounded-full bg-slate-900 px-1.5 py-0.5 text-[10px] font-medium text-white">
              {selected.length}
            </span>
          )}
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-0">
        <div className="p-2 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {label}
            </span>
            {hasSelection && (
              <button
                onClick={handleClearAll}
                className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="p-1 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-2 py-2 rounded-sm cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
              />
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm text-slate-700 truncate">
                  {option.label}
                </span>
              </div>
            </label>
          ))}
        </div>
        {hasSelection && (
          <div className="p-2 border-t border-slate-100 bg-slate-50">
            <div className="flex flex-wrap gap-1">
              {selectedLabels.slice(0, 3).map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-md bg-white border border-slate-200 px-2 py-0.5 text-xs text-slate-600"
                >
                  {label}
                </span>
              ))}
              {selectedLabels.length > 3 && (
                <span className="text-xs text-slate-500 py-0.5">
                  +{selectedLabels.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
