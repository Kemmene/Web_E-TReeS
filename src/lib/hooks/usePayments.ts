import { useMutation } from '@tanstack/react-query';
import { publicApi } from '../api';
import { PUBLIC_ENDPOINTS } from '../endpoints';
import type {
  PaymentInitInput,
  PaymentRefreshInput,
  PaymentInitResponse,
  PaymentRefreshResponse,
  SendMessageResponse,
} from '../types/public';

export function useInitPayment() {
  return useMutation({
    mutationFn: async ({ bookingRef, agencyRef, data }: { bookingRef: string; agencyRef: string; data: PaymentInitInput }) => {
      const response = await publicApi.post(PUBLIC_ENDPOINTS.PAYMENTS.INIT(bookingRef, agencyRef), data);
      return response.data as PaymentInitResponse;
    },
  });
}

export function useRefreshPaymentStatus() {
  return useMutation({
    mutationFn: async ({ bookingRef, data }: { bookingRef: string; data: PaymentRefreshInput }) => {
      const response = await publicApi.post(PUBLIC_ENDPOINTS.PAYMENTS.REFRESH_STATUS(bookingRef), data);
      return response.data as PaymentRefreshResponse;
    },
  });
}

export function useSendBookingMessage() {
  return useMutation({
    mutationFn: async (bookingRef: string) => {
      const response = await publicApi.post(PUBLIC_ENDPOINTS.PAYMENTS.SEND_MESSAGE(bookingRef));
      return response.data as SendMessageResponse;
    },
  });
}