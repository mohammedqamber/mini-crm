"use client";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";
import { SearchInput } from "../common/SearchInput";
import { Search } from "lucide-react";

interface TopBarProps {
  title?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: React.ReactNode;
}

export function TopBar({
  title,
  searchValue,
  onSearchChange,
  children,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-13 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {onSearchChange && (
          <SearchInput
            value={searchValue ?? ""}
            onChange={onSearchChange}
            placeholder="Search"
            leftIcon={<Search className="h-4 w-4" />}
            rightSlot={
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                /
              </kbd>
            }
            onClear={() => onSearchChange("")}
            className="w-64"
          />
        )}

        {children}

        <Separator orientation="vertical" className="h-5" />

        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-slate-900 text-white text-xs">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
