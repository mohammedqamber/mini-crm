"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/leads/") && pathname.endsWith("/edit"))
    return "Edit Lead";
  if (pathname.startsWith("/leads/")) return "Lead Details";
  if (pathname === "/leads/new") return "New Lead";
  if (pathname === "/leads") return "Leads";
  if (pathname === "/board") return "Board";
  return "Dashboard";
}

interface TopBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: React.ReactNode;
}

export function TopBar({ searchValue, onSearchChange, children }: TopBarProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-13 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {onSearchChange && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-8 w-64 rounded-md border border-slate-300 bg-white pl-3 pr-8 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
              /
            </kbd>
          </div>
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
