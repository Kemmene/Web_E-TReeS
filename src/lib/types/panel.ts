import type { PaginationMeta } from './common';

export interface City {
  pk: number;
  reference: string;
  name: string;
  slug: string;
  agency_count?: number;
}

export interface Company {
  pk: number;
  reference: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  link?: string;
  logo?: string;
  ticket_validity?: number;
  commission: number;
  payment_code?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Agency {
  reference: string;
  name: string;
  phone: string;
  momo_phone?: string;
  om_phone?: string;
  email?: string;
  discount_percentage?: number;
  slug: string;
  city: City | null;
  company: Company | null;
  balance: number;
  momo_balance: number;
  om_balance: number;
  card_balance: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  reference: string;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface AgencyRef {
  reference: string;
  name: string;
  phone?: string;
  slug?: string;
  city?: City;
  company?: Company;
}

export interface Route {
  reference: string;
  name: string;
  code: string;
  standard_price: number;
  standard_seats: number;
  is_active: boolean;
  category: Category | null;
  departure_agency: AgencyRef | null;
  arrival_agency: AgencyRef | null;
  departure_city: City | null;
  arrival_city: City | null;
  company: Company | null;
  created_at?: string;
  updated_at?: string;
}

export interface Trip {
  reference: string;
  departure_date: string;
  departure_time: string;
  seats_available: number;
  price_override?: number;
  bus_type?: string;
  online_seats?: number[];
  booked_seats: number[];
  status: 'SCHEDULED' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED';
  route: Route | null;
  company_slug?: string;
  managing_agency?: AgencyRef;
  bus_number?: string;
  driver_name?: string;
  seats_override?: number;
  effective_price: number;
  can_be_blocked: boolean;
  is_blocked: boolean;
  block_reason?: string;
  blocked_by?: User;
  blocked_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  pk: number;
  reference: string;
  date: string;
  time: string;
  status: string;
  is_payed: boolean;
  total_amount: number;
  trip: Trip | null;
  payment_mode?: PaymentMode;
  payment_info?: PaymentInfo;
  passengers: Passenger[];
  created_at?: string;
  updated_at?: string;
}

export interface Passenger {
  pk: number;
  reference: string;
  full_name?: string;
  phone?: string;
  cni?: string;
  seat_number?: string;
  has_traveled: boolean;
  boarding_time?: string;
  booking: Booking | null;
  slip?: Slip;
  created_at?: string;
  updated_at?: string;
}

export interface Slip {
  reference: string;
  trip: Trip;
  agency: Agency;
  driver?: string;
  bus_number?: string;
  total_amount: number;
  agency_slip_number: number;
  passengers: Passenger[];
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  reference: string;
  referenceId: string;
  title: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELED' | 'COMPLETED' | 'PAID';
  payment_method: 'MOMO' | 'OM' | 'CARD';
  transaction_type: 'BOOKING_PAYMENT' | 'WITHDRAWAL' | 'DEPOSIT';
  agency: Agency;
  booking?: Booking;
  created_at?: string;
  updated_at?: string;
}

export interface PaymentDemand {
  reference: string;
  agency: Agency;
  amount: number;
  payment_method: 'momo' | 'om' | 'card';
  payment_destination?: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED';
  is_payed: boolean;
  transaction: Transaction;
  admin_note?: string;
  paid_by?: User;
  paid_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  pk: number;
  reference: string;
  full_name: string;
  email: string;
  phone_number?: string;
  gender?: string;
  language: string;
  role: 'SUPER_ADMIN' | 'COMPANY_ADMIN' | 'ACCOUNTANT' | 'AGENCY_MANAGER' | 'TICKET_SELLER' | 'CONTROLLER';
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  company?: Company;
  agency?: Agency;
  created_at?: string;
  updated_at?: string;
}

export interface PaymentMode {
  reference: string;
  name: string;
  slug: string;
}

export interface PaymentInfo {
  reference: string;
  full_name?: string;
  phone?: string;
  transactionId?: string;
  paymentMode?: PaymentMode;
}

export interface DashboardStats {
  start_date: string;
  end_date: string;
  total_bookings: number;
  total_passengers: number;
  total_profit: number;
  total_travels: number;
  mobile_money: number;
  orange_money: number;
  card_payment: number;
  total_balance: number;
  momo_balance: number;
  om_balance: number;
  card_balance: number;
  agencies: Agency[];
  transactions: Transaction[];
  payment_accounts: PaymentAccount[];
  diagrams: {
    booking_period: DiagramData[];
    booking_turnover: DiagramData[];
    booking_category: DiagramData[];
    payment_methods: Record<string, number>;
  };
  selected_agency?: string;
}

export interface DiagramData {
  label: string;
  value: number;
}

export interface PaymentAccount {
  reference: string;
  company: Company;
  momo_number?: string;
  om_number?: string;
  card_number?: string;
  momo_balance: number;
  om_balance: number;
  card_balance: number;
  get_balance(): number;
}

export interface AgencyStatistics {
  agency: Agency;
  start_date: string;
  end_date: string;
  total_bookings: number;
  total_passengers: number;
  total_profit: number;
  total_travels: number;
  mobile_money: number;
  orange_money: number;
  card_payment: number;
  balance: number;
}

export interface TransactionSummary {
  total_reservations: number;
  total_withdrawals: number;
  difference: number;
}

export interface SlipSummary {
  total_slip_amount: number;
  count: number;
}

export interface TicketUrlResponse {
  passenger_reference: string;
  ticket_url: string;
}

export interface SlipPrintResponse {
  slip_reference: string;
  print_url: string;
}

export interface CompaniesResponse extends PaginationMeta {
  response: Company[];
}

export interface AgenciesResponse extends PaginationMeta {
  response: Agency[];
}

export interface RoutesResponse extends PaginationMeta {
  response: Route[];
}

export interface TripsResponse extends PaginationMeta {
  response: Trip[];
}

export interface BookingsResponse extends PaginationMeta {
  response: Booking[];
}

export interface SlipsResponse extends PaginationMeta {
  response: Slip[];
}

export interface TransactionsResponse extends PaginationMeta {
  response: Transaction[];
  summary: TransactionSummary;
}

export interface PaymentDemandsResponse extends PaginationMeta {
  response: PaymentDemand[];
}

export interface UsersResponse extends PaginationMeta {
  response: User[];
}

export interface CategoriesResponse {
  response: Category[];
}