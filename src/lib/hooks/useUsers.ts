import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { User, UsersResponse } from '../types/panel';

export interface UsersFilters {
  page?: number;
  pageSize?: number;
  is_active?: boolean;
  role?: string;
}

export function useUsers(filters: UsersFilters = {}) {
  const { page = 1, pageSize = 25, is_active, role } = filters;
  return useQuery({
    queryKey: ['users', page, pageSize, is_active, role],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('page_size', pageSize.toString());
      if (is_active !== undefined) params.append('is_active', is_active.toString());
      if (role) params.append('role', role);
      const response = await panelApi.get(`${PANEL_ENDPOINTS.USERS.LIST}?${params.toString()}`);
      return response.data as UsersResponse;
    },
  });
}

export function useUser(ref: string) {
  return useQuery({
    queryKey: ['user', ref],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.USERS.DETAIL(ref));
      return response.data.response as User;
    },
    enabled: !!ref,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      email: string;
      password?: string;
      full_name?: string;
      phone?: string;
      gender?: string;
      language?: string;
      role?: string;
      is_staff?: boolean;
      is_superuser?: boolean;
      is_active?: boolean;
      company_reference?: string;
      agency_reference?: string;
    }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.USERS.CREATE, data);
      return response.data.response as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, data }: { ref: string; data: Partial<User> }) => {
      const response = await panelApi.patch(PANEL_ENDPOINTS.USERS.UPDATE(ref), data);
      return response.data.response as User;
    },
    onSuccess: (_, { ref }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', ref] });
    },
  });
}