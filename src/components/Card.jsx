import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export const Card = ({
  nombre_es,
  tipo,
  comestible,
  descripcion_es,
  conservacion,
  cultivo,
  ritualidad,
  significado_local,
  tecnicas_recoleccion,
  usos,
  id_hongo 
}) => {
  const navigate = useNavigate();
  const [primeraImagen, setPrimeraImagen] = useState(null);

  useEffect(() => {
    const cargarPrimeraImagen = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/imagenes/hongos/${id_hongo}`);
        if (response.ok) {
          const imagenes = await response.json();
          if (imagenes && imagenes.length > 0) {
            setPrimeraImagen(imagenes[0].id);
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
  return (
    <div className="bg-white rounded-xl overflow-hidden w-80 shadow-lg">
      {primeraImagen ? (
        <img 
          src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/imagenes/${primeraImagen}`} 
          alt={nombre_es} 
          className="w-full h-40 object-cover" 
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-4xl">🍄</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold text-blue-500 mb-2">{nombre_es}</h2>
        <div className="flex gap-1 mb-1">
          <span className="font-bold">Tipo:</span>
          <span>{tipo === "0" ? "Comestible" : tipo}</span>
        </div>
        <div className="flex gap-1 mb-1">
          <span className="font-bold">Comestible:</span>
          <span>{comestible}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">Descripción:</span>
          <span> {descripcion_es}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">Conservación:</span>
          <span> {conservacion}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">Cultivo:</span>
          <span> {cultivo}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">Ritualidad:</span>
          <span> {ritualidad}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">Significado local:</span>
          <span> {significado_local}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">Técnicas de recolección:</span>
          <span> {tecnicas_recoleccion}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">Usos:</span>
          <span> {usos}</span>
        </div>
        <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 transition-all duration-200 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-1 mt-4" onClick={verFicha}>
          <LuSearch />
          Ver ficha
        </button>
      </div>
    </div>
  )
}