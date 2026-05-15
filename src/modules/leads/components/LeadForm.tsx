"use client";

import { useForm } from "react-hook-form";
import { getValidTransitions } from "../lib/status-machine";
import { Lead, LeadStatus, STATUS_LABELS } from "../types";
import { useLeadForm } from "../hooks/useLeadForm";
import { FormInput } from "@/components/form/FormInput";
import { isRequired, validateEmail, validatePhone } from "@/lib/validators";
import { FormSelect } from "@/components/form/FormSelect";
import { FormShell } from "@/components/form/Form";

interface FormData {
  name: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
}

interface LeadFormProps {
  lead?: Lead;
  isEdit?: boolean;
}

export function LeadForm({ lead, isEdit = false }: LeadFormProps) {
  const { onSubmit, isSubmitting } = useLeadForm(lead, isEdit);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: lead?.name ?? "",
      email: lead?.email ?? "",
      phone: lead?.phone ?? "",
      source: lead?.source ?? "",
      status: (lead?.status ?? "NEW") as LeadStatus,
    },
  });

  const watchedStatus = watch("status");

  return (
    <FormShell
      onCancel={() => window.history.back()}
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={isEdit ? "Update Lead" : "Create Lead"}
    >
      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg"> */}
      <FormInput
        id="name"
        label="Name"
        required
        placeholder="Full name"
        register={register}
        error={errors.name?.message}
        rules={{ validate: (v: string) => isRequired(v, "Name") }}
      />

      <FormInput
        id="email"
        label="Email"
        required
        type="email"
        placeholder="email@example.com"
        register={register}
        error={errors.email?.message}
        rules={{ validate: validateEmail }}
      />

      <FormInput
        id="phone"
        label="Phone"
        placeholder="+1 234 567 890"
        register={register}
        error={errors.phone?.message}
        rules={{ validate: validatePhone }}
      />

      <FormInput
        id="source"
        label="Source"
        placeholder="e.g. website, referral"
        register={register}
        error={errors.source?.message}
      />

      {/* <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEdit
                ? "Update Lead"
                : "Create Lead"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
        </div>
      </form> */}
    </FormShell>
  );
}
