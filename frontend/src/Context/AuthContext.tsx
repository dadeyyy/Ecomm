import { createContext, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendUrl } from '../lib/backendUrl';
type AuthContextType = {
  isAuthenticated: boolean;
  login: ({ username, password }: { username: string; password: string }) => void;
  logout: () => void;
  user: PayloadType | null;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<PayloadType | null>>;
};

type PayloadType = {
  id: number;
  username: string;
  email: string;
};

type AccessTokenType = {
  accessToken: string;
  payload: PayloadType;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<PayloadType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async ({ username, password }: { username: string; password: string }) => {
    try {
      const loginRequest = await fetch(`${backendUrl}/api/auth/login`, {
        body: JSON.stringify({ username, password }),
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!loginRequest.ok) {
        throw new Error('Unauthorized!');
      }
      const data = (await loginRequest.json()) as AccessTokenType;
      setAccessToken(data.accessToken);
      setUser(data.payload);
      setIsAuthenticated(true);
      navigate('/products');
    } catch (e) {
      toast.error('Invalid username or password!');
      console.log('ERROR', e);
    }
  };

  const logout = async () => {
    try {
      const req = await fetch(`${backendUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await req.json();
      toast.success('Successfully logged out!');
      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout, user, setAccessToken, setIsAuthenticated, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
