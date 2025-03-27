import React, { createContext, useState, useContext, useEffect } from 'react';
import { getItem, setItem } from '../utiles/constants';

const AuthContext = createContext({
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,
  login: async (token) => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored token when app loads
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    try {
      const token = getItem('accessToken');
      if (token) {
        setAccessToken(token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token) => {
    try {
      setItem('accessToken', token);
      setAccessToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error storing token:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setItem('accessToken', '');
      setAccessToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error removing token:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 