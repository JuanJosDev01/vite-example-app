import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarHongo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    nombreCientifico: '',
    descripcion: '',
    usos: '',
    tecnicasRecoleccion: '',
    cultivo: '',
    conservacion: '',
    ritualidad: '',
    significadoLocal: '',
    tipo: '',
    comestible: false,
    imagen: null,
    imagenActual: ''
  });

  // Datos de ejemplo basados en la imagen
  const datosEjemplo = {
    1: {
      nombreCientifico: 'Dacryopinax spathularia',
      descripcion: 'Hongo silvestre con forma de abanico o espátula, de color amarillo brillante a naranja. Su textura es gelatinosa y crece sobre madera en descomposición.',
      usos: 'No se consume comúnmente debido a su textura gelatinosa y sabor neutro; en algunas regiones se incluye cocido en sopas. Posee compuestos bioactivos con potencial antioxidante y antiinflamatorio, de interés en estudios farmacológicos y biotecnológicos.',
      tecnicasRecoleccion: 'Se recolecta manualmente sobre madera muerta o troncos en descomposición, evitando dañar el micelio. La recolección se realiza principalmente en temporadas húmedas, cuando los basidiocarpos están en pleno desarrollo.',
      cultivo: 'Cultivo poco frecuente; requiere condiciones específicas de humedad y madera descompuesta. Puede intentarse en madera esterilizada y húmeda en ambientes controlados, pero generalmente se recolecta en su hábitat natural.',
      conservacion: 'Se conserva mediante deshidratación a baja temperatura y almacenamiento en recipientes herméticos, protegidos de luz y humedad. Para investigación, también puede conservarse en soluciones de glicerol o refrigerada para estudios micológicos.',
      ritualidad: 'No existen registros extensos de ritualidad específica; en algunas culturas los hongos gelatinosos se asocian a la fertilidad de la tierra o a la purificación de espacios naturales.',
      significadoLocal: 'Se considera un indicador ecológico de bosques saludables y madera en descomposición, aportando conocimiento tradicional sobre la naturaleza y los ciclos ecológicos de la región.',
      tipo: 'Silvestre',
      comestible: false,
      imagenActual: '/placeholder-image.jpg'
    }
  };

  useEffect(() => {
    cargarDatosHongo();
  }, [id]);

  const cargarDatosHongo = async () => {
    try {
      setLoadingData(true);
      // TODO: Implementar llamada a la API
      // const response = await fetch(`/api/hongos/${id}`);
      // const data = await response.json();
      // setFormData(data);
      
      // Datos de ejemplo por ahora
      if (datosEjemplo[id]) {
        setFormData(datosEjemplo[id]);
      }
    } catch (error) {
      console.error('Error al cargar datos del hongo:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagen: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implementar actualización de hongo
      console.log('Actualizar hongo:', formData);
      
      // Simular llamada a API
      // const response = await fetch(`/api/hongos/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (response.ok) {
      //   navigate('/admin/hongos');
      // }
      
      // Por ahora solo navegar de vuelta
      setTimeout(() => {
        navigate('/admin/hongos');
      }, 1000);
      
    } catch (error) {
      console.error('Error al actualizar hongo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/hongos');
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos del hongo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Editar Hongo
          </h1>
          <p className="text-gray-600">
            Modifica la información del hongo: <span className="font-medium">{formData.nombreCientifico}</span>
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre del hongo */}
          <div>
            <label htmlFor="nombreCientifico" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del hongo
            </label>
            <input
              type="text"
              id="nombreCientifico"
              name="nombreCientifico"
              value={formData.nombreCientifico}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Ej: Pleurotus ostreatus"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe las características físicas del hongo..."
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
              value={formData.usos}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe los usos culinarios, medicinales o industriales..."
            />
          </div>

          {/* Técnicas de Recolección */}
          <div>
            <label htmlFor="tecnicasRecoleccion" className="block text-sm font-medium text-gray-700 mb-2">
              Técnicas de Recolección
            </label>
            <textarea
              id="tecnicasRecoleccion"
              name="tecnicasRecoleccion"
              value={formData.tecnicasRecoleccion}
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
              value={formData.cultivo}
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
              value={formData.conservacion}
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
              value={formData.ritualidad}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
              placeholder="Describe usos rituales o ceremoniales..."
            />
          </div>

          {/* Significado Local */}
          <div>
            <label htmlFor="significadoLocal" className="block text-sm font-medium text-gray-700 mb-2">
              Significado Local
            </label>
            <textarea
              id="significadoLocal"
              name="significadoLocal"
              value={formData.significadoLocal}
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
                value={formData.tipo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona tipo</option>
                <option value="Silvestre">Silvestre</option>
                <option value="Cultivo">Cultivo</option>
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
                    checked={formData.comestible === true}
                    onChange={() => setFormData(prev => ({ ...prev, comestible: true }))}
                    className="mr-2 text-green-600 focus:ring-teal-500"
                  />
                  <span className="text-green-600 font-medium">✓ Sí Comestible</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="comestible"
                    value="false"
                    checked={formData.comestible === false}
                    onChange={() => setFormData(prev => ({ ...prev, comestible: false }))}
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
            
            {/* Mostrar imagen actual si existe */}
            {formData.imagenActual && !formData.imagen && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="imagen" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                    <span>Cambiar imagen</span>
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
            {formData.imagen && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Nueva imagen seleccionada: {formData.imagen.name}</p>
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
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarHongo;
