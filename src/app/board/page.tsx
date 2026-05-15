import dynamic from "next/dynamic";

const BoardPageClient = dynamic(
  () => import("@/modules/leads/components/BoardPageClient"),
  {
    loading: () => (
      <div className="p-6 text-sm text-slate-500">Loading board...</div>
    ),
  },
);

export default function BoardPage() {
  return <BoardPageClient />;
}
