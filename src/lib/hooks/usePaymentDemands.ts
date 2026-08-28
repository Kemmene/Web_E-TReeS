import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { PaymentDemand, PaymentDemandsResponse } from '../types/panel';

export function usePaymentDemands(page = 1, pageSize = 25) {
  return useQuery({
    queryKey: ['payment-demands', page, pageSize],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.PAYMENT_DEMANDS.LIST, {
        params: { page, page_size: pageSize },
      });
      return response.data as PaymentDemandsResponse;
    },
  });
}

export function useCreatePaymentDemand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      amount: number;
      agency_reference?: string;
      payment_method?: 'momo' | 'om' | 'card';
      payment_destination?: string;
    }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.PAYMENT_DEMANDS.CREATE, data);
      return response.data.response as PaymentDemand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-demands'] });
    },
  });
}

export function usePayPaymentDemand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ref, data }: { ref: string; data: { payment_destination?: string; mark_paid_only?: boolean; admin_note?: string } }) => {
      const response = await panelApi.post(PANEL_ENDPOINTS.PAYMENT_DEMANDS.PAY(ref), data);
      return response.data.response as PaymentDemand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-demands'] });
    },
  });
}