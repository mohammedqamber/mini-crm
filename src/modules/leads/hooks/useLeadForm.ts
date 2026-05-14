// src/modules/leads/hooks/useLeadForm.ts
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCreateLead, useUpdateLead } from "./useLeads";
import { Lead, LeadStatus } from "../types";

interface FormData {
  name: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
}

export function useLeadForm(lead?: Lead, isEdit = false) {
  const router = useRouter();
  const { success, error } = useToast();

  const createLead = useCreateLead();
  const updateLead = useUpdateLead();

  const isSubmitting = createLead.isPending || updateLead.isPending;

  const onSubmit = (data: FormData) => {
    const handleSuccess = (message: string) => {
      success(message);
      router.push("/leads");
    };

    const handleError = (err: unknown, fallback: string) => {
      error(err instanceof Error ? err.message : fallback);
    };

    if (isEdit && lead) {
      updateLead.mutate(
        { id: lead.id, data },
        {
          onSuccess: () => handleSuccess("Lead updated successfully"),
          onError: (err) => handleError(err, "Failed to update lead"),
        },
      );
      return;
    }

    createLead.mutate(data, {
      onSuccess: () => handleSuccess("Lead created successfully"),
      onError: (err) => handleError(err, "Failed to create lead"),
    });
  };

  return {
    onSubmit,
    isSubmitting,
  };
}
