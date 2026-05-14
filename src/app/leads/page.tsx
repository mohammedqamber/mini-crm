import { LeadsPageClient } from "@/modules/leads/components/LeadsPageClient";
import { Suspense } from "react";

export default function LeadsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500" />}>
      <LeadsPageClient />
    </Suspense>
  );
}
