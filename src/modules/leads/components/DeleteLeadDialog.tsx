"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { useDeleteLead } from "@/modules/leads/hooks/useLeads";
import { useToast } from "@/hooks/use-toast";

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
  const { success, error } = useToast();

  const handleDelete = () => {
    deleteLead.mutate(leadId, {
      onSuccess: () => {
        success("Lead deleted successfully");
        onOpenChange(false);
      },
      onError: (err) => {
        error(err instanceof Error ? err.message : "Failed to delete lead");
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Lead</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{leadName}</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteLead.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={deleteLead.isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {deleteLead.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
