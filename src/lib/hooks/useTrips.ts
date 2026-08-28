import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { Trip, TripsResponse, BulkTripActionIn } from '../types/panel';

export interface TripsFilters {
  page?: number;
  pageSize?: number;
  state?: 'upcoming' | 'past';
  departure_date?: string;
  category?: string;
}

export function useTrips(filters: TripsFilters = {}) {
  const { page = 1, pageSize = 25, state, departure_date, category } = filters;
  return useQuery({
    queryKey: ['trips', page, pageSize, state, departure_date, category],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('page_size', pageSize.toString());
      if (state) params.append('state', state);
      if (departure_date) params.append('departure_date', departure_date);
      if (category) params.append('category', category);
      const response = await panelApi.get(`${PANEL_ENDPOINTS.TRIPS.LIST}?${params.toString()}`);
      return response.data as TripsResponse;
    },
  });
}

export function useTrip(ref: string) {
  return useQuery({
    queryKey: ['trip', ref],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.TRIPS.DETAIL(ref));
      return response.data.response as Trip;
    },
    enabled: !!ref,
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      route_reference: string;
      departure_date?: string;
      departure_time?: string;
      starting_date?: string;
      ending_date?: string;
      time_slots?: string[] | string;
      days_of_week?: number[] | string[];
      exclude_dates?: string[];
      online_seats?: number[] | string;
      price_override?: number;
      bus_number?: string;
      driver_name?: string;
      bus_type?: string;
      seats_override?: number;
      seats_available?: number;
    }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.TRIPS.CREATE, data);
      return response.data.response as Trip[];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, data }: { ref: string; data: Partial<Trip> }) => {
      const response = await panelApi.patch(PANEL_ENDPOINTS.TRIPS.UPDATE(ref), data);
      return response.data.response as Trip;
    },
    onSuccess: (_, { ref }) => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['trip', ref] });
    },
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ref: string) => {
      await panelApi.delete(PANEL_ENDPOINTS.TRIPS.DELETE(ref));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useBlockTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, reason }: { ref: string; reason: string }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.TRIPS.BLOCK(ref), { reason });
      return response.data.response as Trip;
    },
    onSuccess: (_, { ref }) => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['trip', ref] });
    },
  });
}

export function useUnblockTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ref: string) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.TRIPS.UNBLOCK(ref));
      return response.data.response as Trip;
    },
    onSuccess: (_, ref) => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['trip', ref] });
    },
  });
}

export function useBulkTripAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BulkTripActionIn) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.TRIPS.BULK_ACTION, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}