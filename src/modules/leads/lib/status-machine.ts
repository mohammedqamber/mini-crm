import { LeadStatus } from "../types";

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
