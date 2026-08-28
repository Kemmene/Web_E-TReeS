import { useQuery } from '@tanstack/react-query';
import { panelApi } from '../api';
import { PANEL_ENDPOINTS } from '../endpoints';
import type { DashboardStats } from '../types/panel';

export function useDashboard(startDate?: string, endDate?: string, agencyFilter?: string) {
  return useQuery({
    queryKey: ['dashboard', startDate, endDate, agencyFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      if (agencyFilter) params.append('agency_filter', agencyFilter);
      const response = await panelApi.get(`${PANEL_ENDPOINTS.DASHBOARD.STATS}?${params.toString()}`);
      return response.data.response as DashboardStats;
    },
    staleTime: 2 * 60 * 1000,
  });
}