export function SkeletonRow({ columns }: { columns: number }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
        </td>
      ))}
    </tr>
  );
}
