"use client";

import { cn } from "@/lib/utils";
import { DataTableProps } from "./types";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No data available",
  isLoading = false,
  loadingRows = 5,
}: DataTableProps<T>) {
  if (isLoading) {
    return <LoadingState columns={columns} loadingRows={loadingRows} />;
  }

  if (data.length === 0) {
    return <EmptyState emptyMessage={emptyMessage} />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-600"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="group transition-colors hover:bg-slate-50/70"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-6 py-4 text-slate-700 first:font-medium first:text-slate-900",
                      col.className,
                    )}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
