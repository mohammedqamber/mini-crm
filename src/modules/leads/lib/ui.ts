import { LeadStatus } from "../types";

export const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: "bg-sky-50 text-sky-700 border-sky-100",
  CONTACTED: "bg-amber-50 text-amber-800 border-amber-100",
  QUALIFIED: "bg-indigo-50 text-indigo-700 border-indigo-100",
  CONVERTED: "bg-emerald-50 text-emerald-700 border-emerald-100",
  LOST: "bg-slate-100 text-slate-600 border-slate-200",
};

export const STATUS_DOT_COLORS: Record<LeadStatus, string> = {
  NEW: "bg-blue-500",
  CONTACTED: "bg-amber-500",
  QUALIFIED: "bg-purple-500",
  CONVERTED: "bg-emerald-500",
  LOST: "bg-gray-400",
};
