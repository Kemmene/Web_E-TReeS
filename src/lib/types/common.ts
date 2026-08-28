export interface ApiResponse<T> {
  message: string;
  response: T;
  status_code?: number;
  pagination?: PaginationMeta;
  summary?: Record<string, unknown>;
  invitation_sent?: boolean;
}

export interface PaginationMeta {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  message: string;
  response: T[];
  pagination: PaginationMeta;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status_code?: number;
}

export interface TokenPair {
  access: string;
  refresh: string;
}

export interface UserPayload {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_staff: boolean;
  is_superuser: boolean;
  company_id?: number;
  agency_id?: number;
}