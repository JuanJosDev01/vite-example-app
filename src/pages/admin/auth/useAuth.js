import { useState } from 'react';
import { authAPI } from './api';

// Hook personalizado para manejar la autenticación
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login(credentials);
      
      // Guardar token en localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const verifyToken = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    setIsLoading(true);
    
    try {
      await authAPI.verify(token);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    verifyToken
  };
};
