"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/layout/TopBar";
import { LeadDetailCard } from "@/modules/leads/components/LeadDetailCard";
import {
  LeadErrorState,
  LeadPageSkeleton,
} from "@/modules/leads/components/LeadPageStates";
import { useLeadStatusTransition } from "@/modules/leads/hooks/use-lead-status-transition";
import { useLead } from "@/modules/leads/hooks/useLeads";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;
  const { data: lead, isLoading, isError, error, refetch } = useLead(leadId);
  const { isUpdating, transitionStatus } = useLeadStatusTransition(leadId);

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
          onClick={() => router.push("/leads")}
          className="mb-4 -ml-2 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Leads
        </Button>
        <LeadDetailCard
          lead={lead}
          isUpdating={isUpdating}
          onEdit={() => router.push(`/leads/${lead.id}/edit`)}
          onStatusTransition={transitionStatus}
        />
      </div>
    </div>
  );
}
