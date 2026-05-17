export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "CONVERTED"
  | "LOST";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  source: string;
}

export type UpdateLeadInput = Partial<CreateLeadInput>;
