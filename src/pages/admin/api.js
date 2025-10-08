// API para administración de hongos
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Headers por defecto
const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Funciones para hongos
export const hongosAPI = {
  // Obtener todos los hongos
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hongos`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener hongos:', error);
      throw error;
    }
  },

  // Obtener un hongo por ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hongos/${id}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener hongo:', error);
      throw error;
    }
  },

  // Crear nuevo hongo
  create: async (hongoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hongos`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(hongoData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al crear hongo:', error);
      throw error;
    }
  },

  // Actualizar hongo
  update: async (id, hongoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hongos/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(hongoData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar hongo:', error);
      throw error;
    }
  },

  // Eliminar hongo
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hongos/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar hongo:', error);
      throw error;
    }
  }
};

// Funciones para usuarios/administradores
export const usuariosAPI = {
  // Obtener todos los usuarios
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  // Crear nuevo usuario/administrador
  create: async (usuarioData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(usuarioData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },

  // Eliminar usuario
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  },

  // Cambiar contraseña
  changePassword: async (passwordData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/change-password`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(passwordData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      throw error;
    }
  }
};

// Función para subir imágenes
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al subir imagen:', error);
    throw error;
  }
};
