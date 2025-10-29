// API para administración de hongos
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Headers por defecto
const getHeaders = (contentType) => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': contentType || 'application/json',
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

// Funciones para manejo de imágenes de hongos
export const imagenesAPI = {
  // Subir imágenes para un hongo específico
  upload: async (idHongo, files) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('imagenes', file);
      });
      
      const response = await fetch(`${API_BASE_URL}/imagenes/hongos/${idHongo}`, {
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
      console.error('Error al subir imágenes:', error);
      throw error;
    }
  },

  // Obtener imágenes de un hongo
  getByHongoId: async (idHongo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/imagenes/hongos/${idHongo}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
      throw error;
    }
  },

  // Contar imágenes de un hongo
  count: async (idHongo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/imagenes/hongos/${idHongo}/count`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al contar imágenes:', error);
      throw error;
    }
  },

  // Eliminar todas las imágenes de un hongo
  deleteByHongoId: async (idHongo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/imagenes/hongos/${idHongo}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar imágenes:', error);
      throw error;
    }
  },

  // Obtener imagen específica por ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/imagenes/${id}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error al obtener imagen:', error);
      throw error;
    }
  },

  // Eliminar imagen específica por ID
  deleteById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/imagenes/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      throw error;
    }
  }
};
