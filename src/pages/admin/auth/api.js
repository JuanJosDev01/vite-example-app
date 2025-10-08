// Configuración de la API
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  endpoints: {
    login: '/auth/login',
    logout: '/auth/logout',
    verify: '/auth/verify'
  },
  headers: {
    'Content-Type': 'application/json',
  }
};

// Función para hacer peticiones a la API
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  
  const defaultOptions = {
    headers: API_CONFIG.headers,
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en la petición API:', error);
    throw error;
  }
};

// Funciones específicas para autenticación
export const authAPI = {
  login: async (credentials) => {
    return apiRequest(API_CONFIG.endpoints.login, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  
  logout: async () => {
    return apiRequest(API_CONFIG.endpoints.logout, {
      method: 'POST'
    });
  },
  
  verify: async (token) => {
    return apiRequest(API_CONFIG.endpoints.verify, {
      method: 'GET',
      headers: {
        ...API_CONFIG.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }
};
