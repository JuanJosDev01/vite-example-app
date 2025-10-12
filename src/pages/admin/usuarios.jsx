import React, { useState, useEffect } from 'react';
import { usuariosAPI } from './api';

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo basados en la imagen
  const datosEjemplo = {
    usuarios: [
      { id: 1, nombre: 'admin', rol: 'administrador' },
      { id: 6, nombre: 'editor', rol: 'editor' }
    ]
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a la API
      // const data = await usuariosAPI.getAll();
      // setUsuarios(data.usuarios);
      
      // Datos de ejemplo por ahora
      setUsuarios(datosEjemplo.usuarios);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const agregarAdministrador = () => {
    // TODO: Implementar modal para agregar administrador
    console.log('Agregar administrador');
  };

  const eliminarUsuario = async (id) => {
    // TODO: Implementar eliminación de usuario
    console.log('Eliminar usuario:', id);
    // const response = await usuariosAPI.delete(id);
    // if (response.ok) {
    //   cargarUsuarios(); // Recargar datos
    // }
  };

  const cambiarContraseña = () => {
    // TODO: Implementar modal para cambiar contraseña
    console.log('Cambiar contraseña');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra de acciones */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={agregarAdministrador}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar Administrador
          </button>

          <button
            onClick={cambiarContraseña}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Cambiar Contraseña
          </button>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {usuario.nombre}
              </h3>
              
              <p className="text-gray-600 mb-2">ID: {usuario.id}</p>
              
              <p className="text-sm text-gray-500 mb-4 capitalize">
                Rol: {usuario.rol}
              </p>
              
              <button
                onClick={() => eliminarUsuario(usuario.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay usuarios */}
      {usuarios.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay usuarios</h3>
          <p className="text-gray-500">Agrega el primer administrador para comenzar.</p>
        </div>
      )}
    </div>
  );
};

export default UsuariosAdmin;
