import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api';
import { PUBLIC_ENDPOINTS } from '../endpoints';
import type { PublicTrip, PublicCity, PublicCompany, PublicAgency } from '../types/public';

export interface TripsListParams {
  departure_city?: string;
  arrival_city?: string;
  company?: string;
  agency?: string;
  departure_date?: string;
}

export function usePublicTrips(params: TripsListParams = {}) {
  return useQuery({
    queryKey: ['public-trips', params],
    queryFn: async () => {
      const response = await publicApi.get(PUBLIC_ENDPOINTS.CATALOG.TRIPS, { params });
      return response.data.response as PublicTrip[];
    },
  });
}

export function usePublicCities() {
  return useQuery({
    queryKey: ['public-cities'],
    queryFn: async () => {
      const response = await publicApi.get(PUBLIC_ENDPOINTS.CATALOG.CITIES);
      return response.data.response as PublicCity[];
    },
  });
}

export function usePublicCompanies() {
  return useQuery({
    queryKey: ['public-companies'],
    queryFn: async () => {
      const response = await publicApi.get(PUBLIC_ENDPOINTS.CATALOG.COMPANIES);
      return response.data.response as PublicCompany[];
    },
  });
}

export function usePublicCompaniesByCity(citySlug: string) {
  return useQuery({
    queryKey: ['public-companies-by-city', citySlug],
    queryFn: async () => {
      const response = await publicApi.get(PUBLIC_ENDPOINTS.CATALOG.COMPANIES_BY_CITY(citySlug));
      return response.data.response as PublicCompany[];
    },
    enabled: !!citySlug,
  });
}

export function usePublicAgencies() {
  return useQuery({
    queryKey: ['public-agencies'],
    queryFn: async () => {
      const response = await publicApi.get(PUBLIC_ENDPOINTS.CATALOG.AGENCIES);
      return response.data.response as PublicAgency[];
    },
  });
}

export function usePublicAgenciesByCompanyCity(companySlug: string, citySlug: string) {
  return useQuery({
    queryKey: ['public-agencies-by-company-city', companySlug, citySlug],
    queryFn: async () => {
      const response = await publicApi.get(PUBLIC_ENDPOINTS.CATALOG.AGENCIES_BY_COMPANY_CITY(companySlug, citySlug));
      return response.data.response as PublicAgency[];
    },
    enabled: !!companySlug && !!citySlug,
  });
}