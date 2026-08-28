import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { PUBLIC_API_BASE, PANEL_API_BASE } from './endpoints';

const TOKEN_KEY = 'etress_panel_token';
const REFRESH_KEY = 'etress_panel_refresh';

interface TokenData {
  access: string;
  refresh: string;
}

function getStoredTokens(): TokenData | null {
  const access = localStorage.getItem(TOKEN_KEY);
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (access && refresh) return { access, refresh };
  return null;
}

function setStoredTokens(tokens: TokenData): void {
  localStorage.setItem(TOKEN_KEY, tokens.access);
  localStorage.setItem(REFRESH_KEY, tokens.refresh);
}

function clearStoredTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

function createApiClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const tokens = getStoredTokens();
    if (tokens?.access && config.headers) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  });

  return client;
}

export const publicApi = createApiClient(PUBLIC_API_BASE);
export const panelApi = createApiClient(PANEL_API_BASE);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason: Error) => void;
}> = [];

function processQueue(error: Error | null, token: string | null = null): void {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

panelApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return panelApi(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const tokens = getStoredTokens();
      if (!tokens?.refresh) {
        clearStoredTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${PANEL_API_BASE}/auth/token/refresh/`, {
          refresh: tokens.refresh,
        });

        const newAccess = response.data.response?.access || response.data.access;
        if (newAccess) {
          setStoredTokens({ access: newAccess, refresh: tokens.refresh });
          processQueue(null, newAccess);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          }
          return panelApi(originalRequest);
        }
        throw new Error('No access token in refresh response');
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        clearStoredTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await panelApi.post('/auth/token/', { email, password });
    const { access, refresh } = response.data.response;
    setStoredTokens({ access, refresh });
    return response.data;
  },

  logout: async () => {
    try {
      await panelApi.post('/auth/logout/');
    } finally {
      clearStoredTokens();
    }
  },

  refreshToken: async () => {
    const tokens = getStoredTokens();
    if (!tokens?.refresh) throw new Error('No refresh token');
    const response = await axios.post(`${PANEL_API_BASE}/auth/token/refresh/`, {
      refresh: tokens.refresh,
    });
    const newAccess = response.data.response?.access || response.data.access;
    if (newAccess) {
      setStoredTokens({ access: newAccess, refresh: tokens.refresh });
    }
    return newAccess;
  },

  getCurrentUser: async () => {
    const response = await panelApi.get('/auth/me/');
    return response.data.response;
  },

  requestPasswordReset: async (email: string) => {
    const response = await panelApi.post('/auth/password-reset/', { email });
    return response.data;
  },

  isAuthenticated: (): boolean => {
    return !!getStoredTokens()?.access;
  },

  getAccessToken: (): string | null => {
    return getStoredTokens()?.access || null;
  },

  clearTokens: clearStoredTokens,
};

export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message || 'Une erreur est survenue';
    const status = error.response?.status;
    const errors = error.response?.data?.errors;
    throw { message, status, errors };
  }
  throw error;
}