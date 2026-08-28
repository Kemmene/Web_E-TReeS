import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { Agency, AgenciesResponse, AgencyStatistics } from '../types/panel';

export function useAgencies(page = 1, pageSize = 25) {
  return useQuery({
    queryKey: ['agencies', page, pageSize],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.AGENCIES.LIST, {
        params: { page, page_size: pageSize },
      });
      return response.data as AgenciesResponse;
    },
  });
}

export function useAgency(ref: string) {
  return useQuery({
    queryKey: ['agency', ref],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.AGENCIES.DETAIL(ref));
      return response.data.response as Agency;
    },
    enabled: !!ref,
  });
}

export function useAgencyStatistics(ref: string, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['agency-statistics', ref, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      const response = await panelApi.get(`${PANEL_ENDPOINTS.AGENCIES.STATISTICS(ref)}?${params.toString()}`);
      return response.data.response as AgencyStatistics;
    },
    enabled: !!ref,
  });
}

export function useCreateAgency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      city_reference?: string;
      city_name?: string;
      company_reference?: string;
      email?: string;
    }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.AGENCIES.CREATE, data);
      return response.data.response as Agency;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencies'] });
    },
  });
}

export function useUpdateAgency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, data }: { ref: string; data: Partial<Agency> }) => {
      const response = await panelApi.patch(PANEL_ENDPOINTS.AGENCIES.UPDATE(ref), data);
      return response.data.response as Agency;
    },
    onSuccess: (_, { ref }) => {
      queryClient.invalidateQueries({ queryKey: ['agencies'] });
      queryClient.invalidateQueries({ queryKey: ['agency', ref] });
    },
  });
}

export function useDeleteAgency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ref: string) => {
      await panelApi.delete(PANEL_ENDPOINTS.AGENCIES.DELETE(ref));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencies'] });
    },
  });
}