"use client";

import { useDeleteLead } from "@/modules/leads/hooks/useLeads";
import { ConfirmActionDialog } from "@/components/common/ConfirmActionDialog";
import { showToast } from "@/lib/toast";

interface DeleteLeadDialogProps {
  leadId: string;
  leadName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLeadDialog({
  leadId,
  leadName,
  open,
  onOpenChange,
}: DeleteLeadDialogProps) {
  const deleteLead = useDeleteLead();

  const handleDelete = () => {
    deleteLead.mutate(leadId, {
      onSuccess: () => {
        showToast({ variant: "success", message: "Lead deleted successfully" });
        onOpenChange(false);
      },
      onError: (err) => {
        showToast({
          variant: "error",
          message: err instanceof Error ? err.message : "Failed to delete lead",
        });
        onOpenChange(false);
      },
    });
  };

  return (
    <ConfirmActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Lead"
      description={`Are you sure you want to delete ${leadName}? This action cannot be undone.`}
      confirmText={deleteLead.isPending ? "Deleting..." : "Delete"}
      confirmClassName="bg-red-600 text-white hover:bg-red-700"
      isPending={deleteLead.isPending}
      onConfirm={handleDelete}
    />
  );
}
