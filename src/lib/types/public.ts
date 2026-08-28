export interface PublicCity {
  pk: number;
  reference?: string;
  name: string;
  slug?: string;
}

export interface PublicCompany {
  pk: number;
  reference?: string;
  name: string;
  slug?: string;
  email: string;
  logo?: string;
  link?: string;
  address: string;
}

export interface PublicCategory {
  reference?: string;
  name: string;
  slug?: string;
}

export interface PublicAgency {
  reference?: string;
  name: string;
  phone?: string;
  discount_percentage?: number;
  slug?: string;
  city?: PublicCity;
  company?: PublicCompany;
}

export interface PublicRoute {
  reference?: string;
  standard_price: number;
  standard_seats: number;
  category?: PublicCategory;
  departure_agency?: PublicAgency;
  arrival_agency?: PublicAgency;
  departure_city?: PublicCity;
  arrival_city?: PublicCity;
}

export interface PublicTrip {
  reference?: string;
  departure_date: string;
  departure_time: string;
  seats_available?: number;
  price_override?: number;
  bus_type?: string;
  online_seats?: unknown[];
  booked_seats: number[];
  route?: PublicRoute;
  company_slug?: string;
}

export interface PublicBooking {
  pk: number;
  reference?: string;
  date: string;
  time: string;
  status: string;
  trip?: PublicTrip;
  paymentMode?: PaymentMode;
  paymentInfo?: PaymentInfo;
}

export interface PublicPassenger {
  pk: number;
  reference?: string;
  full_name?: string;
  phone?: string;
  cni?: string;
  seat_number?: string;
  booking?: PublicBooking;
}

export interface PublicTicket {
  reference?: string;
  name: string;
  file?: string;
  status: string;
  passenger?: PublicPassenger;
}

export interface PassengerCreateInput {
  full_name?: string;
  phone?: string;
  cni?: string;
  seat_number?: string | number;
}

export interface CreateBookingInput {
  passengers: PassengerCreateInput[];
  session_id?: string;
}

export interface SeatHoldInput {
  seat_number: number;
  session_id?: string;
}

export interface SeatReleaseInput {
  session_id: string;
  seat_number?: number;
}

export interface PaymentInitInput {
  mobile_number: string;
  method: 'momo' | 'om';
}

export interface PaymentRefreshInput {
  requestId: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChatInput {
  message: string;
  conversation_history: Record<string, unknown>[];
}

export interface PaymentMode {
  reference?: string;
  name: string;
}

export interface PaymentInfo {
  reference?: string;
  full_name?: string;
  phone?: string;
  transactionId?: string;
  paymentMode?: PaymentMode;
}

export interface TripsListParams {
  departure_city?: string;
  arrival_city?: string;
  company?: string;
  agency?: string;
  departure_date?: string;
}

export interface TripsListResponse {
  response: PublicTrip[];
}

export interface CitiesResponse {
  response: PublicCity[];
}

export interface CompaniesResponse {
  response: PublicCompany[];
}

export interface AgenciesResponse {
  response: PublicAgency[];
}

export interface BookingPassengersResponse {
  response: PublicPassenger[];
}

export interface BookingTicketsResponse {
  response: PublicTicket[];
}

export interface SeatHoldResponse {
  seat_number: number;
  expires_at: string;
}

export interface SeatReleaseResponse {
  released_count: number;
}

export interface PaymentInitResponse {
  message: string;
  requestId: string;
}

export interface PaymentRefreshResponse {
  message: string;
  response: {
    data: {
      status: 'SUCCESSFUL' | 'FAILED' | 'PENDING';
      transactionStatus: 'SUCCESSFUL' | 'FAILED' | 'PENDING';
      requestId: string;
    };
  };
  tickets: PublicTicket[];
}

export interface SendMessageResponse {
  message: string;
  response: unknown;
}