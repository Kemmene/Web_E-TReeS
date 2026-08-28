import { createContext, useContext, useState, useEffect, ReactNode, useCallback, createElement } from 'react';
import { authApi } from '../api';
import type { UserPayload } from '../types/common';
import type { User } from '../types/panel';

interface AuthContextType {
  user: User | null;
  userPayload: UserPayload | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userPayload, setUserPayload] = useState<UserPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    if (!authApi.isAuthenticated()) {
      setIsLoading(false);
      return;
    }
    try {
      const userData = await authApi.getCurrentUser();
      setUser(userData);
      const tokens = localStorage.getItem('etress_panel_token');
      if (tokens) {
        try {
          const payload = JSON.parse(atob(tokens.split('.')[1]));
          setUserPayload(payload);
        } catch {
          // ignore
        }
      }
    } catch {
      authApi.clearTokens();
      setUser(null);
      setUserPayload(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string, password: string) => {
    await authApi.login(email, password);
    await loadUser();
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setUserPayload(null);
  };

  const refreshUser = async () => {
    await loadUser();
  };

  return createElement(
    AuthContext.Provider,
    { value: { user, userPayload, isLoading, isAuthenticated: !!user, login, logout, refreshUser } },
    children,
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}