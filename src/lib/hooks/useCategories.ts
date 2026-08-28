import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { Category } from '../types/panel';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.CATEGORIES.LIST);
      return response.data.response as Category[];
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.CATEGORIES.CREATE, { name });
      return response.data.response as Category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, name }: { ref: string; name: string }) => {
      const response = await panelApi.patch(PANEL_ENDPOINTS.CATEGORIES.UPDATE(ref), { name });
      return response.data.response as Category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ref: string) => {
      await panelApi.delete(PANEL_ENDPOINTS.CATEGORIES.DELETE(ref));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}