import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext';

export const Card = ({ hongo, id_hongo }) => {
  const navigate = useNavigate();
  const { getFieldByLanguage, t } = useLanguage();
  const [primeraImagen, setPrimeraImagen] = useState(null);

  useEffect(() => {
    const cargarPrimeraImagen = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/imagenes/hongos/${id_hongo}`);
        if (response.ok) {
          const imagenes = await response.json();
          if (imagenes && imagenes.length > 0) {
            setPrimeraImagen(imagenes[0].url_imagen);
          }
        }
      } catch (error) {
        console.error('Error al cargar primera imagen:', error);
      }
    };

    cargarPrimeraImagen();
  }, [id_hongo]);

  const verFicha = () => {
    navigate(`/ficha/${id_hongo}`);
  }

  // Función para truncar texto
  const truncate = (text, length = 80) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden w-80 shadow-lg">
      {primeraImagen ? (
        <img 
          src={primeraImagen} 
          alt={getFieldByLanguage(hongo, 'nombre')} 
          className="w-full h-40 object-cover" 
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-4xl">🍄</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold text-blue-500 mb-2">{getFieldByLanguage(hongo, 'nombre')}</h2>
        <div className="flex gap-1 mb-1">
          <span className="font-bold">{t('type')}</span>
          <span>{hongo.tipo === "0" ? t('edible') : hongo.tipo}</span>
        </div>
        <div className="flex gap-1 mb-1">
          <span className="font-bold">{t('edible')}</span>
          <span>{hongo.comestible === 1 ? 'Sí' : 'No'}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">{t('description')}</span>
          <span> {truncate(getFieldByLanguage(hongo, 'descripcion'))}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">{t('conservation')}</span>
          <span> {truncate(getFieldByLanguage(hongo, 'conservacion'))}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">{t('cultivation')}</span>
          <span> {truncate(getFieldByLanguage(hongo, 'cultivo'))}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">{t('rituality')}</span>
          <span> {truncate(getFieldByLanguage(hongo, 'ritualidad'))}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">{t('localMeaning')}</span>
          <span> {truncate(getFieldByLanguage(hongo, 'significado_local'))}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">{t('harvestingTechniques')}</span>
          <span> {truncate(getFieldByLanguage(hongo, 'tecnicas_recoleccion'))}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">{t('uses')}</span>
          <span> {truncate(getFieldByLanguage(hongo, 'usos'))}</span>
        </div>
        <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 transition-all duration-200 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-1 mt-4" onClick={verFicha}>
          <LuSearch />
          {t('viewCard')}
        </button>
      </div>
    </div>
  )
}