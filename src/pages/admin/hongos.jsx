import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HongosAdmin = () => {
  const navigate = useNavigate();
  const [hongos, setHongos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo basados en la imagen
  const datosEjemplo = {
    hongos: [
      {
        id: 1,
        nombreCientifico: 'Dacryopinax spathularia',
        nombreComun: '',
        tipo: 'Silvestre',
        comestible: false,
        imagen: '/placeholder-image.jpg'
      },
      {
        id: 2,
        nombreCientifico: 'Russula virescens',
        nombreComun: 'Gorro Verde',
        tipo: 'Silvestre',
        comestible: false,
        imagen: '/placeholder-image.jpg'
      },
      {
        id: 3,
        nombreCientifico: 'Pleurotus ostreatus',
        nombreComun: '',
        tipo: 'Silvestre',
        comestible: true,
        imagen: '/placeholder-image.jpg'
      },
      {
        id: 4,
        nombreCientifico: 'Volvariella bombycina',
        nombreComun: 'Volvaria sedosa',
        tipo: 'Cultivo',
        comestible: true,
        imagen: '/placeholder-image.jpg'
      }
    ]
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a la API
      // const response = await fetch('/api/hongos');
      // const data = await response.json();
      // setHongos(data.hongos);
      
      // Datos de ejemplo por ahora
      setHongos(datosEjemplo.hongos);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Métodos para hongos
  const agregarHongo = () => {
    navigate('/admin/hongos/crear');
  };

  const editarHongo = (id) => {
    navigate(`/admin/hongos/editar/${id}`);
  };

  const eliminarHongo = async (id) => {
    // TODO: Implementar eliminación de hongo
    console.log('Eliminar hongo:', id);
    // const response = await fetch(`/api/hongos/${id}`, { method: 'DELETE' });
    // if (response.ok) {
    //   cargarDatos(); // Recargar datos
    // }
  };

  // Métodos de navegación
  const verSitio = () => {
    // TODO: Implementar navegación al sitio público
    console.log('Ver sitio público');
    // window.open('/', '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando hongos...</p>
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
            onClick={agregarHongo}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar Hongo
          </button>

          <button
            onClick={verSitio}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
            </svg>
            Ver Sitio
          </button>
        </div>
      </div>

      {/* Tarjetas de hongos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hongos.map((hongo) => (
          <div key={hongo.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm">
                  {hongo.nombreCientifico}
                </h3>
                {hongo.nombreComun && (
                  <p className="text-gray-600 text-xs">
                    ({hongo.nombreComun})
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Tipo:</span>
                <div className="flex items-center gap-1">
                  {hongo.tipo === 'Silvestre' ? (
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="text-sm font-medium">{hongo.tipo}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Comestible:</span>
                <span className={`text-sm font-medium ${hongo.comestible ? 'text-green-600' : 'text-red-600'}`}>
                  {hongo.comestible ? 'Sí' : 'No'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editarHongo(hongo.id)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-sm transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </button>

              <button
                onClick={() => eliminarHongo(hongo.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-sm transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay hongos */}
      {hongos.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay hongos</h3>
          <p className="text-gray-500">Agrega el primer hongo para comenzar.</p>
        </div>
      )}
    </div>
  );
};

export default HongosAdmin;