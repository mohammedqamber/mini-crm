"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/layout/TopBar";
import {
  LeadErrorState,
  LeadPageSkeleton,
} from "@/modules/leads/components/LeadPageStates";
import { LeadForm } from "@/modules/leads/components/LeadForm";
import { useLead } from "@/modules/leads/hooks/useLeads";

export default function LeadEditPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;
  const { data: lead, isLoading, isError, error, refetch } = useLead(leadId);

  if (isLoading) {
    return (
      <div>
        <TopBar />
        <LeadPageSkeleton />
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div>
        <TopBar />
        <LeadErrorState
          title="Lead not found"
          error={error}
          fallback="Failed to load lead"
          onRetry={() => refetch()}
          secondaryAction={{
            label: "Back to Leads",
            onClick: () => router.push("/leads"),
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <div className="p-6 max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/leads/${leadId}`)}
          className="mb-4 -ml-2 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Lead
        </Button>
        <p className="text-sm text-slate-500 mb-6">
          Update the lead details below.
        </p>
        <LeadForm lead={lead} isEdit />
      </div>
    </div>
  );
}
