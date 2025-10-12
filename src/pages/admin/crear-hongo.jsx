import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hongosAPI, imagenesAPI } from './api';
import toast from 'react-hot-toast';

const CrearHongo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    nombre_es: '',
    nombre_nah: '',
    descripcion_es: '',
    descripcion_nah: '',
    usos: '',
    tecnicas_recoleccion: '',
    cultivo: '',
    conservacion: '',
    ritualidad: '',
    significado_local: '',
    comestible: 'No',
    imagen: null,
    tipo: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState(prev => ({
        ...prev,
        imagen: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear FormData sin la imagen
      const adminHongoFormData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        // Excluir la imagen del FormData inicial
        if (key !== 'imagen' && value !== null) {
          adminHongoFormData.append(key, value);
        }
      });

      // Crear el hongo sin imagen
      const response = await hongosAPI.create(adminHongoFormData);
      
      if (response && response.id) {
        // Si hay imagen, subirla usando el nuevo endpoint
        if (formState.imagen) {
          try {
            await imagenesAPI.upload(response.id, [formState.imagen]);
            toast.success('Hongo creado con imagen con éxito');
          } catch (imageError) {
            console.error('Error al subir imagen:', imageError);
            toast.success('Hongo creado con éxito, pero hubo un error al subir la imagen');
          }
        } else {
          toast.success('Hongo creado con éxito');
        }
        
        navigate('/admin/hongos');
      } else {
        toast.error('Error al crear el hongo');
        console.error('Error inesperado al crear el hongo:', response);
      }
    } catch (error) {
      console.error('Error al crear hongo:', error);
      toast.error('Error al crear el hongo');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/hongos');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Hongo
          </h1>
          <p className="text-gray-600">
            Completa la información del nuevo hongo
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre del hongo */}
          <div>
            <label htmlFor="nombre_es" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del hongo
            </label>
            <input
              type="text"
              id="nombre_es"
              name="nombre_es"
              value={formState.nombre_es}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Ej: Pleurotus ostreatus"
              required
            />
          </div>
          <div>
            <label htmlFor="nombre_nah" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del hongo (Náhuatl)
            </label>
            <input
              type="text"
              id="nombre_nah"
              name="nombre_nah"
              value={formState.nombre_nah}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Ej: Pleurotus ostreatus"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion_es" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="descripcion_es"
              name="descripcion_es"
              value={formState.descripcion_es}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe las características físicas del hongo..."
            />
          </div>
          <div>
            <label htmlFor="descripcion_nah" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (Náhuatl)
            </label>
            <textarea
              id="descripcion_nah"
              name="descripcion_nah"
              value={formState.descripcion_nah}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe las características físicas del hongo en náhuatl..."
            />
          </div>

          {/* Usos */}
          <div>
            <label htmlFor="usos" className="block text-sm font-medium text-gray-700 mb-2">
              Usos
            </label>
            <textarea
              id="usos"
              name="usos"
              value={formState.usos}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe los usos culinarios, medicinales o industriales..."
            />
          </div>

          {/* Técnicas de Recolección */}
          <div>
            <label htmlFor="tecnicas_recoleccion" className="block text-sm font-medium text-gray-700 mb-2">
              Técnicas de Recolección
            </label>
            <textarea
              id="tecnicas_recoleccion"
              name="tecnicas_recoleccion"
              value={formState.tecnicas_recoleccion}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe cómo y cuándo recolectar este hongo..."
            />
          </div>

          {/* Cultivo */}
          <div>
            <label htmlFor="cultivo" className="block text-sm font-medium text-gray-700 mb-2">
              Cultivo
            </label>
            <textarea
              id="cultivo"
              name="cultivo"
              value={formState.cultivo}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe las técnicas de cultivo si es posible..."
            />
          </div>

          {/* Conservación */}
          <div>
            <label htmlFor="conservacion" className="block text-sm font-medium text-gray-700 mb-2">
              Conservación
            </label>
            <textarea
              id="conservacion"
              name="conservacion"
              value={formState.conservacion}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe cómo conservar el hongo..."
            />
          </div>

          {/* Ritualidad */}
          <div>
            <label htmlFor="ritualidad" className="block text-sm font-medium text-gray-700 mb-2">
              Ritualidad
            </label>
            <textarea
              id="ritualidad"
              name="ritualidad"
              value={formState.ritualidad}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe usos rituales o ceremoniales..."
            />
          </div>

          {/* Significado Local */}
          <div>
            <label htmlFor="significado_local" className="block text-sm font-medium text-gray-700 mb-2">
              Significado Local
            </label>
            <textarea
              id="significado_local"
              name="significado_local"
              value={formState.significado_local}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe el significado cultural o local..."
            />
          </div>

          {/* Tipo y Comestible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formState.tipo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona tipo</option>
                <option value="1">Silvestre</option>
                <option value="0">Cultivo</option>
              </select>
            </div>

            {/* Comestible */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comestible
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="comestible"
                    value="true"
                    checked={formState.comestible === 'Si' || formState.comestible === 'Sí'}
                    onChange={() => setFormState(prev => ({ ...prev, comestible: 'Si' }))}
                    className="mr-2 text-green-600 focus:ring-teal-500"
                  />
                  <span className="text-green-600 font-medium">✓ Sí Comestible</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="comestible"
                    value="false"
                    checked={formState.comestible === 'No'}
                    onChange={() => setFormState(prev => ({ ...prev, comestible: 'No' }))}
                    className="mr-2 text-red-600 focus:ring-teal-500"
                  />
                  <span className="text-red-600 font-medium">✗ No Comestible</span>
                </label>
              </div>
            </div>
          </div>

          {/* Imagen Portada */}
          <div>
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
              Imagen Portada
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="imagen" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                    <span>Subir imagen</span>
                    <input
                      id="imagen"
                      name="imagen"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">o arrastra y suelta</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
              </div>
            </div>
            {formState.imagen && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Archivo seleccionado: {formState.imagen.name}</p>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creando...
                </>
              ) : (
                'Crear Hongo'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearHongo;
