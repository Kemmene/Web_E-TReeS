import { useMutation } from '@tanstack/react-query';
import { publicApi } from '../api';
import { PUBLIC_ENDPOINTS } from '../endpoints';
import type {
  PublicPassenger,
  PublicTicket,
  PassengerCreateInput,
  CreateBookingInput,
  BookingPassengersResponse,
  BookingTicketsResponse,
} from '../types/public';

export function useCreateBooking() {
  return useMutation({
    mutationFn: async ({ tripRef, data }: { tripRef: string; data: CreateBookingInput }) => {
      const response = await publicApi.post(PUBLIC_ENDPOINTS.BOOKINGS.CREATE(tripRef), data);
      return response.data.response as PublicPassenger[];
    },
  });
}

export function useBookingPassengers(bookingRef: string) {
  return useMutation({
    mutationFn: async () => {
      const response = await publicApi.get(PUBLIC_ENDPOINTS.BOOKINGS.SEND_PASSENGERS(bookingRef));
      return response.data.response as PublicPassenger[];
    },
  });
}

export function useBookingTickets(bookingRef: string) {
  return useMutation({
    mutationFn: async () => {
      const response = await publicApi.get(PUBLIC_ENDPOINTS.BOOKINGS.GET_TICKETS(bookingRef));
      return response.data.response as PublicTicket[];
    },
  });
}

export function useGenerateTickets() {
  return useMutation({
    mutationFn: async (bookingRef: string) => {
      const response = await publicApi.post(PUBLIC_ENDPOINTS.BOOKINGS.GENERATE_TICKETS(bookingRef));
      return response.data.response as PublicTicket[];
    },
  });
}

export function useDownloadTicket() {
  return useMutation({
    mutationFn: async (ticketRef: string) => {
      const response = await publicApi.post(PUBLIC_ENDPOINTS.BOOKINGS.DOWNLOAD_TICKET(ticketRef), {}, { responseType: 'blob' });
      return response.data as Blob;
    },
  });
}

export function useUpdatePassenger() {
  return useMutation({
    mutationFn: async ({ passengerPk, data }: { passengerPk: number; data: Partial<PassengerCreateInput> }) => {
      const response = await publicApi.put(PUBLIC_ENDPOINTS.BOOKINGS.UPDATE_PASSENGER(passengerPk), data);
      return response.data.response as PublicPassenger;
    },
  });
}

export function useDeletePassenger() {
  return useMutation({
    mutationFn: async (passengerPk: number) => {
      await publicApi.delete(PUBLIC_ENDPOINTS.BOOKINGS.DELETE_PASSENGER(passengerPk));
    },
  });
}