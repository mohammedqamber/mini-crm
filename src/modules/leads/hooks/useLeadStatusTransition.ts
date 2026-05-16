import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUpdateLeadStatus } from "@/modules/leads/hooks/useLeads";
import type { LeadStatus } from "@/modules/leads/types";

export function useLeadStatusTransition(leadId: string) {
  const updateLeadStatus = useUpdateLeadStatus();
  const { success, error } = useToast();

  const transitionStatus = useCallback(
    (leadStatus: LeadStatus) => {
      updateLeadStatus.mutate(
        { id: leadId, leadStatus },
        {
          onSuccess: () => success(`Status updated to ${leadStatus}`),
          onError: (err) => {
            error(
              err instanceof Error ? err.message : "Failed to update status",
            );
          },
        },
      );
    },
    [error, leadId, success, updateLeadStatus],
  );

  return {
    isUpdating: updateLeadStatus.isPending,
    transitionStatus,
  };
}
