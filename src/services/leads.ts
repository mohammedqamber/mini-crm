import type {
  Lead,
  CreateLeadInput,
  UpdateLeadInput,
  LeadStatus,
} from "@/modules/leads/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message ?? `HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchLeads(): Promise<Lead[]> {
  const response = await fetch(`${API_BASE}/leads`);
  return handleResponse<Lead[]>(response);
}

export async function fetchLead(id: string): Promise<Lead> {
  const response = await fetch(`${API_BASE}/leads/${id}`);
  return handleResponse<Lead>(response);
}

export async function createLead(data: CreateLeadInput): Promise<Lead> {
  const response = await fetch(`${API_BASE}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Lead>(response);
}

export async function updateLead(
  id: string,
  data: UpdateLeadInput,
): Promise<Lead> {
  const response = await fetch(`${API_BASE}/leads/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Lead>(response);
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<Lead> {
  const response = await fetch(`${API_BASE}/leads/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });

  return handleResponse<Lead>(response);
}

export async function deleteLead(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/leads/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to delete" }));
    throw new Error(error.message ?? `HTTP ${response.status}`);
  }
}
