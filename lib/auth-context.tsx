'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { User } from './types';
import { mockUsers } from './mock-data/users';
import { getCurrentUser } from './mock-data/users';

interface AuthContextType {
  user: User | null;
  users: User[];
  isLoading: boolean;
  login: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUser(getCurrentUser());
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const newUser = { ...getCurrentUser(), email, name };
    setUser(newUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchUser = useCallback((userId: string) => {
    const selectedUser = mockUsers.find(u => u.id === userId);
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      users: mockUsers, 
      isLoading, 
      login, 
      signup, 
      logout,
      switchUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
