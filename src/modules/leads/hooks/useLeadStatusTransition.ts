import { useCallback } from "react";
import { useUpdateLeadStatus } from "@/modules/leads/hooks/useLeads";
import type { LeadStatus } from "@/modules/leads/types";
import { showToast } from "@/lib/toast";

export function useLeadStatusTransition(leadId: string) {
  const updateLeadStatus = useUpdateLeadStatus();

  const transitionStatusTo = useCallback(
    (leadStatus: LeadStatus) => {
      updateLeadStatus.mutate(
        { id: leadId, leadStatus },
        {
          onSuccess: () =>
            showToast({
              variant: "success",
              message: `Status updated to ${leadStatus}`,
            }),
          onError: (err) => {
            showToast({
              variant: "success",
              message:
                err instanceof Error ? err.message : "Failed to update status",
            });
          },
        },
      );
    },
    [leadId, updateLeadStatus],
  );

  return {
    isUpdating: updateLeadStatus.isPending,
    transitionStatusTo,
  };
}
