import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface NavSectionProps {
  title: string;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function NavSection({
  title,
  collapsed,
  onToggle,
  children,
}: NavSectionProps) {
  return (
    <div className="space-y-1">
      <div
        onClick={onToggle}
        className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            collapsed && "-rotate-90",
          )}
        />
      </div>

      {!collapsed && <div className="space-y-0.5">{children}</div>}
    </div>
  );
}
