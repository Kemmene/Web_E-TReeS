import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { Company, CompaniesResponse } from '../types/panel';

export function useCompanies(page = 1, pageSize = 25) {
  return useQuery({
    queryKey: ['companies', page, pageSize],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.COMPANIES.LIST, {
        params: { page, page_size: pageSize },
      });
      return response.data as CompaniesResponse;
    },
  });
}

export function useCompany(ref: string) {
  return useQuery({
    queryKey: ['company', ref],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.COMPANIES.DETAIL(ref));
      return response.data.response as Company;
    },
    enabled: !!ref,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Company>) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.COMPANIES.CREATE, data);
      return response.data.response as Company;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, data }: { ref: string; data: Partial<Company> }) => {
      const response = await panelApi.patch(PANEL_ENDPOINTS.COMPANIES.UPDATE(ref), data);
      return response.data.response as Company;
    },
    onSuccess: (_, { ref }) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company', ref] });
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ref: string) => {
      await panelApi.delete(PANEL_ENDPOINTS.COMPANIES.DELETE(ref));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
}