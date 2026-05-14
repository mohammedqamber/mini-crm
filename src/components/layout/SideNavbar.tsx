"use client";

import { useState } from "react";
import {
  Home,
  Zap,
  BarChart3,
  Search,
  FileText,
  Users,
  CheckSquare,
  Building2,
  Target,
  Contact,
  UserPlus,
  Headphones,
  Ticket,
  ClipboardList,
  ListChecks,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { NavItem } from "./sidenav/NavItem";
import { NavSection } from "./sidenav/NavSection";

const topNavItems = [
  {
    icon: <Home className="h-4 w-4" />,
    label: "Home",
    active: true,
  },
  {
    icon: <Zap className="h-4 w-4" />,
    label: "Super",
    badge: "NEW",
  },
  {
    icon: <BarChart3 className="h-4 w-4" />,
    label: "Reports & Analytics",
  },
];

const workspaceSmartboardsItems = [
  {
    icon: <FileText className="h-4 w-4" />,
    label: "Solution Requests",
  },
  {
    icon: <Users className="h-4 w-4" />,
    label: "Parent Accounts",
  },
  {
    icon: <CheckSquare className="h-4 w-4" />,
    label: "My Tasks",
  },
];

const workspaceItems = [
  {
    icon: <Building2 className="h-4 w-4" />,
    label: "Accounts",
  },
  {
    icon: <Target className="h-4 w-4" />,
    label: "Opportunities",
  },
  {
    icon: <Contact className="h-4 w-4" />,
    label: "Contacts",
  },
  {
    icon: <UserPlus className="h-4 w-4" />,
    label: "Leads",
  },
  {
    icon: <Headphones className="h-4 w-4" />,
    label: "Deal Support Requests",
  },
  {
    icon: <Ticket className="h-4 w-4" />,
    label: "FreshDesk Tickets",
  },
  {
    icon: <ClipboardList className="h-4 w-4" />,
    label: "SRF SPR",
  },
  {
    icon: <ListChecks className="h-4 w-4" />,
    label: "BANT Qualifications",
  },
  {
    icon: <CheckSquare className="h-4 w-4" />,
    label: "Tasks",
  },
];

export function SideNavbar() {
  const [isWorkspaceSmartboardsCollapsed, setIsWorkspaceSmartboardsCollapsed] =
    useState(false);
  const [isWorkspaceCollapsed, setIsWorkspaceCollapsed] = useState(false);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-65 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <span className="text-sm font-bold text-primary-foreground">A</span>
        </div>
        <span className="text-sm font-semibold text-foreground">Acme Inc.</span>
      </div>

      <div className="px-3 py-3">
        <button className="flex w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent">
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Quick Search...</span>
          <kbd>ctrl+k</kbd>
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-2">
        <div className="space-y-0.5">
          {topNavItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={item.active}
              badge={item.badge}
            />
          ))}
        </div>

        <div className="px-2">
          <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2 py-1.5 text-sm text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left">Search smartboards...</span>
          </div>
        </div>

        <NavSection
          title="Workspace Smartboards"
          collapsed={isWorkspaceSmartboardsCollapsed}
          onToggle={() => setIsWorkspaceSmartboardsCollapsed((prev) => !prev)}
        >
          {workspaceSmartboardsItems.map((item) => (
            <NavItem key={item.label} icon={item.icon} label={item.label} />
          ))}
        </NavSection>

        <NavSection
          title="Workspace"
          collapsed={isWorkspaceCollapsed}
          onToggle={() => setIsWorkspaceCollapsed((prev) => !prev)}
        >
          {workspaceItems.map((item) => (
            <NavItem key={item.label} icon={item.icon} label={item.label} />
          ))}
        </NavSection>
      </div>

      <div className="border-t border-border p-3">
        <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-amber-500 text-xs font-medium text-white">
              J
            </AvatarFallback>
          </Avatar>
          <span className="flex-1 truncate text-left font-medium text-foreground">
            Jamie Carter
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}
