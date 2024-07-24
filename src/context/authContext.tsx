import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../services/apiClient';
import { authenticateUser, ILoginData, IUser } from '../services/authenticateService';

interface AuthContextProps {
  user: IUser | null;
  isAuthenticated: boolean;
  permissions: string[];
  roles: string[];
  login: (userData: ILoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    //console.log('Token from localStorage on load:', token);
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      apiClient.get('/user/me')
        .then((response) => {
          const userData: IUser = response.data;
          setUser(userData);
          setIsAuthenticated(true);
          setPermissions(Array.isArray(userData.permissions) ? userData.permissions : []);
          setRoles(Array.isArray(userData.roles) ? userData.roles : []);
         // console.log('User data fetched:', userData);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        });
    }
  }, []);

  const login = async (userData: ILoginData) => {
    try {
      const response = await authenticateUser(userData);
      const { token, user } = response;
      localStorage.setItem('token', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      setPermissions(Array.isArray(user.permissions) ? user.permissions : []);
      setRoles(Array.isArray(user.roles) ? user.roles : []);
     // console.log('Login successful, token stored:', token);
      router.push('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      throw new Error(error.message || 'Unable to authenticate user. Please try again later.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setPermissions([]);
    setRoles([]);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, permissions, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
