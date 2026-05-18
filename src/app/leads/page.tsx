import dynamic from "next/dynamic";
import { Suspense } from "react";

const LeadsPageClient = dynamic(
  () => import("@/modules/leads/components/LeadsPageClient"),
  {
    loading: () => <div className="p-6 text-sm text-slate-500">Loading...</div>,
  },
);

export default function LeadsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500" />}>
      <LeadsPageClient />
    </Suspense>
  );
}
