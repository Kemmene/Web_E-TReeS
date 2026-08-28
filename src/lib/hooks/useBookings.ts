import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { Booking, BookingsResponse } from '../types/panel';

export interface BookingsFilters {
  page?: number;
  pageSize?: number;
  status?: string;
  is_payed?: boolean;
}

export function useBookings(filters: BookingsFilters = {}) {
  const { page = 1, pageSize = 25, status, is_payed } = filters;
  return useQuery({
    queryKey: ['bookings', page, pageSize, status, is_payed],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('page_size', pageSize.toString());
      if (status) params.append('status', status);
      if (is_payed !== undefined) params.append('is_payed', is_payed.toString());
      const response = await panelApi.get(`${PANEL_ENDPOINTS.BOOKINGS.LIST}?${params.toString()}`);
      return response.data as BookingsResponse;
    },
  });
}

export function useBooking(ref: string) {
  return useQuery({
    queryKey: ['booking', ref],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.BOOKINGS.DETAIL(ref));
      return response.data.response as Booking;
    },
    enabled: !!ref,
  });
}

export function useConfirmPassenger() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ref: string) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.BOOKINGS.CONFIRM_PASSENGER(ref));
      return response.data.response;
    },
    onSuccess: (_, ref) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking'] });
    },
  });
}

export function usePassengerTicket() {
  return useMutation({
    mutationFn: async (ref: string) => {
      const response = await panelApi.get(PANEL_ENDPOINTS.BOOKINGS.PASSENGER_TICKET(ref));
      return response.data.response as { passenger_reference: string; ticket_url: string };
    },
  });
}