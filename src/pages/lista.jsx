import { Fragment, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { LuFilter } from "react-icons/lu";
import axios from "axios";

export const Lista = () => {

  const [hongos, setHongos] = useState([]);

  const fetchHongos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hongos");
      setHongos(response.data);
    } catch (error) {
      console.error("Error fetching hongos:", error);
    }
  };

  useEffect(() => {
    fetchHongos();
  }, []);

  return (
    <Fragment>
      <header className="bg-green-600 w-full h-20 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">
          Catálogo Profesional de Hongos
        </h1>
      </header>

      <main className="bg-gray-100 w-full min-h-screen">
        {/* Barra de filtros */}
        <form className="flex gap-2 justify-center items-center pt-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="rounded-lg p-2 border border-gray-300 bg-white"
          />
          <select className="rounded-lg p-2 border border-gray-300 bg-white">
            <option value="">Todos los tipos</option>
            <option value="comestible">Comestible</option>
            <option value="incomestible">Incomestible</option>
          </select>
          <select className="rounded-lg p-2 border border-gray-300 bg-white">
            <option value="">Todos</option>
            <option value="vivo">Vivo</option>
            <option value="muerto">Muerto</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-green-600 text-white p-2 cursor-pointer flex items-center gap-1"
          >
            <LuFilter />
            Filtrar
          </button>
        </form>

        {/* Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 place-items-center justify-items-center max-w-5xl mx-auto">
          {hongos.map((hongo) => (
            <Card
              key={hongo.id_hongo}
              imagen={hongo.imagen}
              nombre_es={hongo.nombre_es}
              tipo={hongo.tipo}
              comestible={hongo.comestible}
              descripcion_es={hongo.descripcion_es}
              conservacion={hongo.conservacion}
              cultivo={hongo.cultivo}
              ritualidad={hongo.ritualidad}
              significado_local={hongo.significado_local}
              tecnicas_recoleccion={hongo.tecnicas_recoleccion}
              usos={hongo.usos}
            />
          ))}
        </section>
      </main>
    </Fragment>
  );
};
