import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { Slip, SlipsResponse } from '../types/panel';

export function useSlips(page = 1, pageSize = 25) {
  return useQuery({
    queryKey: ['slips', page, pageSize],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.SLIPS.LIST, {
        params: { page, page_size: pageSize },
      });
      return response.data as SlipsResponse;
    },
  });
}

export function useSlip(ref: string) {
  return useQuery({
    queryKey: ['slip', ref],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.SLIPS.DETAIL(ref));
      return response.data.response as Slip;
    },
    enabled: !!ref,
  });
}

export function useCreateSlip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      trip_reference: string;
      passenger_references: string[];
      driver?: string;
      bus_number?: string;
    }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.SLIPS.CREATE, data);
      return response.data.response as Slip;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slips'] });
    },
  });
}

export function useUpdateSlip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, data }: { ref: string; data: Partial<Slip> }) => {
      const response = await panelApi.patch(PANEL_ENDPOINTS.SLIPS.UPDATE(ref), data);
      return response.data.response as Slip;
    },
    onSuccess: (_, { ref }) => {
      queryClient.invalidateQueries({ queryKey: ['slips'] });
      queryClient.invalidateQueries({ queryKey: ['slip', ref] });
    },
  });
}

export function useSlipPrint() {
  return useMutation({
    mutationFn: async (ref: string) => {
      const response = await panelApi.get(PANEL_ENDPOINTS.SLIPS.PRINT(ref));
      return response.data.response as { slip_reference: string; print_url: string };
    },
  });
}