import { useMutation } from '@tanstack/react-query';
import { publicApi } from '../api';
import { PUBLIC_ENDPOINTS } from '../endpoints';
import type { SeatHoldInput, SeatReleaseInput, SeatHoldResponse, SeatReleaseResponse } from '../types/public';

export function useHoldSeat() {
  return useMutation({
    mutationFn: async ({ tripRef, data }: { tripRef: string; data: SeatHoldInput }) => {
      const response = await publicApi.post(PUBLIC_ENDPOINTS.SEATS.HOLD(tripRef), data);
      return response.data.response as SeatHoldResponse;
    },
  });
}

export function useReleaseSeat() {
  return useMutation({
    mutationFn: async ({ tripRef, data }: { tripRef: string; data: SeatReleaseInput }) => {
      const response = await publicApi.post(PUBLIC_ENDPOINTS.SEATS.RELEASE(tripRef), data);
      return response.data.response as SeatReleaseResponse;
    },
  });
}