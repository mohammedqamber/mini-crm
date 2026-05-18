import { TopBar } from "@/components/layout/TopBar";
import { LeadForm } from "@/modules/leads/components/LeadForm";

export default function NewLeadPage() {
  return (
    <div>
      <TopBar title="New Lead" />
      <div className="p-6 max-w-2xl">
        <p className="text-sm text-slate-500 mb-6">
          Fill in the details below to create a new lead.
        </p>
        <LeadForm />
      </div>
    </div>
  );
}
