import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { City } from '../types/panel';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.CITIES.LIST);
      return response.data.response as City[];
    },
  });
}

export function useCreateCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { city_reference?: string; city_name?: string; company_reference?: string }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.CITIES.CREATE, data);
      return response.data.response as City;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
}

export function useDeleteCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ref: string) => {
      await panelApi.delete(PANEL_ENDPOINTS.CITIES.DELETE(ref));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
}