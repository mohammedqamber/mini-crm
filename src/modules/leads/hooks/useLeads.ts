import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchLeads,
  fetchLead,
  createLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
} from "@/services/leads";
import type {
  CreateLeadInput,
  LeadStatus,
  UpdateLeadInput,
} from "@/modules/leads/types";
import { showToast } from "@/lib/toast";

const LEADS_KEY = "leads";

export function useLeads() {
  return useQuery({
    queryKey: [LEADS_KEY],
    queryFn: fetchLeads,
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: [LEADS_KEY, id],
    queryFn: () => fetchLead(id),
    enabled: !!id,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeadInput) => createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY] });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadInput }) =>
      updateLead(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY] });
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY, variables.id] });
    },
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, leadStatus }: { id: string; leadStatus: LeadStatus }) =>
      updateLeadStatus(id, leadStatus),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY] });
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY, variables.id] });
    },
    onError: (e) => {
      showToast({ variant: "error", message: e.message });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY] });
    },
  });
}
