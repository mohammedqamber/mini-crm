import { LeadStatus } from "../types";

export const ALL_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  CONVERTED: "Converted",
  LOST: "Lost",
};

const TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  NEW: ["CONTACTED", "LOST"],
  CONTACTED: ["QUALIFIED", "LOST"],
  QUALIFIED: ["CONVERTED", "LOST"],
  CONVERTED: [],
  LOST: [],
};

export const getValidTransitions = (status: LeadStatus): LeadStatus[] =>
  TRANSITIONS[status];

export const isTerminalStatus = (status: LeadStatus): boolean =>
  TRANSITIONS[status].length === 0;
