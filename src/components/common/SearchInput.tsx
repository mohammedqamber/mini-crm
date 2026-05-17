"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  onClear?: () => void;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  leftIcon,
  rightSlot,
  onClear,
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      {leftIcon && (
        <div className="absolute left-3 flex items-center text-slate-400">
          {leftIcon}
        </div>
      )}

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          leftIcon && "pl-9",
          (rightSlot || (value && onClear)) && "pr-16",
        )}
      />

      <div className="absolute right-2 flex items-center gap-1.5">
        {value && onClear && (
          <div
            onClick={onClear}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </div>
        )}

        {rightSlot}
      </div>
    </div>
  );
}
