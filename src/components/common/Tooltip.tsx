"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

interface SimpleTooltipProps {
  children: React.ReactNode;
  message: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

export function SimpleTooltip({
  children,
  message,
  side = "top",
  delayDuration = 300,
  className,
  disabled = false,
  asChild = true,
}: SimpleTooltipProps) {
  if (disabled || !message) return <>{children}</>;

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} className={cn(className)}>
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
