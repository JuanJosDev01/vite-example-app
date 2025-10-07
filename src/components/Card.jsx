import { LuSearch } from "react-icons/lu";

export const Card = ({
  imagen,
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
}) => {
  // Convertir buffer a base64 si es necesario
  let imageSrc = '/public/vite.svg';
  if (imagen) {
    if (typeof imagen === 'object' && Array.isArray(imagen.data)) {
      // Buffer seguro para arrays grandes
      const binaryString = imagen.data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      const base64String = btoa(binaryString);
      imageSrc = `data:image/jpeg;base64,${base64String}`;
    } else if (typeof imagen === 'string') {
      imageSrc = imagen;
    }
  }
  return (
    <div className="bg-white rounded-xl overflow-hidden w-80 shadow-lg">
      <img src={imageSrc} alt={nombre_es} className="w-full h-40 object-cover" />
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
        <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 transition-all duration-200 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-1 mt-4">
          <LuSearch />
          Ver ficha
        </button>
      </div>
    </div>
  )
}