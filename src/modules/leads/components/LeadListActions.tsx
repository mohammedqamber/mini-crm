"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LeadListActionsProps {
  onCreateLead: () => void;
}

export function LeadListActions({ onCreateLead }: LeadListActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        onClick={onCreateLead}
        className="h-8"
        variant="default"
      >
        <Plus className="mr-1.5 h-3.5 w-3.5" />
        New Lead
      </Button>
    </div>
  );
}
