import { useQuery, useMutation } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { Transaction, TransactionsResponse, TransactionSummary, SlipSummary } from '../types/panel';

export interface TransactionsFilters {
  page?: number;
  pageSize?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
}

export function useTransactions(filters: TransactionsFilters = {}) {
  const { page = 1, pageSize = 25, status, start_date, end_date } = filters;
  return useQuery({
    queryKey: ['transactions', page, pageSize, status, start_date, end_date],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('page_size', pageSize.toString());
      if (status) params.append('status', status);
      if (start_date) params.append('start_date', start_date);
      if (end_date) params.append('end_date', end_date);
      const response = await panelApi.get(`${PANEL_ENDPOINTS.TRANSACTIONS.LIST}?${params.toString()}`);
      return response.data as TransactionsResponse;
    },
  });
}

export function useExportTransactionsPdf(startDate?: string, endDate?: string) {
  return useMutation({
    mutationFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      const response = await panelApi.get(`${PANEL_ENDPOINTS.TRANSACTIONS.EXPORT_PDF}?${params.toString()}`, {
        responseType: 'blob',
      });
      return response.data as Blob;
    },
  });
}

export function useExportSlipsPdf(startDate?: string, endDate?: string) {
  return useMutation({
    mutationFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      const response = await panelApi.get(`${PANEL_ENDPOINTS.TRANSACTIONS.EXPORT_SLIPS_PDF}?${params.toString()}`, {
        responseType: 'blob',
      });
      return response.data as Blob;
    },
  });
}

export function useTransactionSummary() {
  return useQuery({
    queryKey: ['transaction-summary'],
    queryFn: async () => {
      const response = await panelApi.get(PANEL_ENDPOINTS.TRANSACTIONS.EXPORT_SUMMARY);
      return response.data.response as TransactionSummary;
    },
  });
}

export function useSlipSummary(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['slip-summary', startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      const response = await panelApi.get(`${PANEL_ENDPOINTS.TRANSACTIONS.EXPORT_SLIPS_SUMMARY}?${params.toString()}`);
      return response.data.response as SlipSummary;
    },
  });
}