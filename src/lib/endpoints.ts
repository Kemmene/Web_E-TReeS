export const PUBLIC_API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
export const PANEL_API_BASE = import.meta.env.VITE_PANEL_API_BASE_URL || '/panel/api';

export const PUBLIC_ENDPOINTS = {
  CATALOG: {
    TRIPS: '/trips/',
    CITIES: '/get_cities',
    COMPANIES: '/get_companies',
    COMPANIES_BY_CITY: (citySlug: string) => `/get_companies/city/${citySlug}`,
    AGENCIES: '/get_agencies',
    AGENCIES_BY_COMPANY_CITY: (companySlug: string, citySlug: string) =>
      `/get_agencies/company/${companySlug}/city/${citySlug}`,
  },
  BOOKINGS: {
    SEND_PASSENGERS: (bookingRef: string) => `/send_passengers/${bookingRef}`,
    GET_TICKETS: (bookingRef: string) => `/get_booking_tickets/${bookingRef}`,
    CREATE: (tripRef: string) => `/create_booking/${tripRef}`,
    GENERATE_TICKETS: (bookingRef: string) => `/generate_tickets/${bookingRef}`,
    DOWNLOAD_TICKET: (ticketRef: string) => `/download_ticket/${ticketRef}`,
    UPDATE_PASSENGER: (passengerPk: number) => `/update_passenger/${passengerPk}`,
    DELETE_PASSENGER: (passengerPk: number) => `/delete_passenger/${passengerPk}`,
  },
  SEATS: {
    HOLD: (tripRef: string) => `/hold_seat/${tripRef}`,
    RELEASE: (tripRef: string) => `/release_seat/${tripRef}`,
  },
  PAYMENTS: {
    INIT: (bookingRef: string, agencyRef: string) =>
      `/init_payment/booking/${bookingRef}/agency/${agencyRef}`,
    REFRESH_STATUS: (bookingRef: string) => `/refresh_payment_status/${bookingRef}`,
    MOMO_CALLBACK: '/payments/momo/callback',
    OM_CALLBACK: '/payments/om/callback',
    DEPOSIT_MOMO_CALLBACK: '/deposit/momo/callback',
    SEND_MESSAGE: (bookingRef: string) => `/send_message/${bookingRef}`,
  },
  MISC: {
    HEALTH: '/',
    CONTACT: '/contact/',
    CHAT: '/chat/',
  },
} as const;

export const PANEL_ENDPOINTS = {
  AUTH: {
    TOKEN: '/auth/token/',
    REFRESH: '/auth/token/refresh/',
    ME: '/auth/me/',
    LOGOUT: '/auth/logout/',
    PASSWORD_RESET: '/auth/password-reset/',
  },
  DASHBOARD: {
    STATS: '/dashboard/',
  },
  COMPANIES: {
    LIST: '/companies/',
    CREATE: '/companies/',
    DETAIL: (ref: string) => `/companies/${ref}/`,
    UPDATE: (ref: string) => `/companies/${ref}/`,
    DELETE: (ref: string) => `/companies/${ref}/`,
  },
  CITIES: {
    LIST: '/cities/',
    CREATE: '/cities/',
    DELETE: (ref: string) => `/cities/${ref}/`,
  },
  AGENCIES: {
    LIST: '/agencies/',
    CREATE: '/agencies/',
    DETAIL: (ref: string) => `/agencies/${ref}/`,
    UPDATE: (ref: string) => `/agencies/${ref}/`,
    DELETE: (ref: string) => `/agencies/${ref}/`,
    STATISTICS: (ref: string) => `/agencies/${ref}/statistics/`,
  },
  CATEGORIES: {
    LIST: '/categories/',
    CREATE: '/categories/',
    UPDATE: (ref: string) => `/categories/${ref}/`,
    DELETE: (ref: string) => `/categories/${ref}/`,
  },
  ROUTES: {
    LIST: '/routes/',
    CREATE: '/routes/',
    DETAIL: (ref: string) => `/routes/${ref}/`,
    UPDATE: (ref: string) => `/routes/${ref}/`,
    DELETE: (ref: string) => `/routes/${ref}/`,
  },
  TRIPS: {
    LIST: '/trips/',
    CREATE: '/trips/',
    BULK_ACTION: '/trips/bulk-action/',
    DETAIL: (ref: string) => `/trips/${ref}/`,
    UPDATE: (ref: string) => `/trips/${ref}/`,
    DELETE: (ref: string) => `/trips/${ref}/`,
    BLOCK: (ref: string) => `/trips/${ref}/block/`,
    UNBLOCK: (ref: string) => `/trips/${ref}/unblock/`,
  },
  BOOKINGS: {
    LIST: '/bookings/',
    DETAIL: (ref: string) => `/bookings/${ref}/`,
    CONFIRM_PASSENGER: (ref: string) => `/passengers/${ref}/confirm/`,
    PASSENGER_TICKET: (ref: string) => `/passengers/${ref}/ticket/`,
  },
  SLIPS: {
    LIST: '/slips/',
    CREATE: '/slips/',
    DETAIL: (ref: string) => `/slips/${ref}/`,
    UPDATE: (ref: string) => `/slips/${ref}/`,
    PRINT: (ref: string) => `/slips/${ref}/print/`,
  },
  TRANSACTIONS: {
    LIST: '/transactions/',
    EXPORT_PDF: '/transactions/export/pdf/',
    EXPORT_SLIPS_PDF: '/transactions/slips/export/pdf/',
    EXPORT_SUMMARY: '/transactions/export-summary/',
    EXPORT_SLIPS_SUMMARY: '/transactions/slips/export-summary/',
  },
  PAYMENT_DEMANDS: {
    LIST: '/payment-demands/',
    CREATE: '/payment-demands/',
    PAY: (ref: string) => `/payment-demands/${ref}/pay/`,
  },
  USERS: {
    LIST: '/users/',
    CREATE: '/users/',
    DETAIL: (ref: string) => `/users/${ref}/`,
    UPDATE: (ref: string) => `/users/${ref}/`,
  },
  EVENTS: {
    STREAM: '/events/stream',
  },
} as const;