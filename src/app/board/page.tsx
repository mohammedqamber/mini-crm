import { Suspense } from "react";
import { BoardPageClient } from "@/app/board/BoardPageClient";

export default function BoardPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500" />}>
      <BoardPageClient />
    </Suspense>
  );
}
