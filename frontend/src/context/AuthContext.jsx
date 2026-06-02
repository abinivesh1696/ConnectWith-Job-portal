import React, { createContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

const initialAuth = () => {
  const storedUser = localStorage.getItem('authUser');
  const storedToken = localStorage.getItem('token');

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
  };
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialAuth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem('token', authState.token);
    } else {
      localStorage.removeItem('token');
    }

    if (authState.user) {
      localStorage.setItem('authUser', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [authState]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      const { token, user } = response.data;
      setAuthState({ token, user });
      return response;
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'jobseeker') => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register({ name, email, password, role });
      const { token, user } = response.data;
      setAuthState({ token, user });
      return response;
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthState({ user: null, token: null });
  };

  const value = useMemo(
    () => ({
      ...authState,
      loading,
      error,
      login,
      register,
      logout,
    }),
    [authState, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
