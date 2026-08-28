import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { Route, RoutesResponse } from '../types/panel';

export function useRoutes(page = 1, pageSize = 25) {
  return useQuery({
    queryKey: ['routes', page, pageSize],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.ROUTES.LIST, {
        params: { page, page_size: pageSize },
      });
      return response.data as RoutesResponse;
    },
  });
}

export function useRoute(ref: string) {
  return useQuery({
    queryKey: ['route', ref],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.ROUTES.DETAIL(ref));
      return response.data.response as Route;
    },
    enabled: !!ref,
  });
}

export function useCreateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      company_reference?: string;
      departure_agency_reference: string;
      arrival_agency_reference: string;
      category_reference: string;
      name?: string;
      code?: string;
      standard_price: number;
      standard_seats: number;
      is_active?: boolean;
    }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.ROUTES.CREATE, data);
      return response.data.response as Route;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
  });
}

export function useUpdateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, data }: { ref: string; data: Partial<Route> }) => {
      const response = await panelApi.patch(PANEL_ENDPOINTS.ROUTES.UPDATE(ref), data);
      return response.data.response as Route;
    },
    onSuccess: (_, { ref }) => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
      queryClient.invalidateQueries({ queryKey: ['route', ref] });
    },
  });
}

export function useDeleteRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ref: string) => {
      await panelApi.delete(PANEL_ENDPOINTS.ROUTES.DELETE(ref));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
  });
}