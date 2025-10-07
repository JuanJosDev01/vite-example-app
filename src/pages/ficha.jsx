export const Ficha = () => {
        // Ejemplo: datos estáticos, reemplazar por props o contexto si se navega desde Card
        const hongo = {
            nombre_es: "Pleurotus ostreatus",
            tipo: "0",
            comestible: "Sí",
            descripcion_es: "Sombrero en forma de ostra o abanico, color blanco, gris o marrón claro. Láminas decurrentes (bajan por el tallo), blancas. Suele crecer en grupos sobre madera muerta o en descomposición. El tallo es corto o casi inexistente. El sombrero puede medir entre 5 y 25 cm de diámetro.",
            conservacion: "Puede conservarse fresco en refrigeración durante varios días. También se puede deshidratar o congelar para almacenarlo por más tiempo.",
            cultivo: "Es un hongo fácil de cultivar. Se desarrolla bien en sustratos como paja, aserrín o residuos agrícolas. Requiere condiciones controladas de humedad, buena ventilación y temperatura moderada. Produce varias cosechas (oleadas).",
            ritualidad: "No se asocia comúnmente con usos rituales o ceremoniales.",
            significado_local: "En muchas comunidades es considerado un alimento tradicional y accesible. Su cultivo representa una fuente de ingreso sustentable.",
            tecnicas_recoleccion: "Recolectar con cuchillo limpio cortando en la base. Es preferible recolectar ejemplares jóvenes, ya que los maduros pueden volverse fibrosos o amargos.",
            usos: "Hongo comestible muy valorado por su sabor y textura. Se utiliza ampliamente en la gastronomía. Rico en proteínas, vitaminas B, minerales y fibra. Además, se estudian sus propiedades medicinales como antioxidante, inmunoestimulante y reductor del colesterol.",
            imagen: null
        };

        return (
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">{hongo.nombre_es}</h1>
                <img src={hongo.imagen || '/public/vite.svg'} alt={hongo.nombre_es} className="w-full h-60 object-cover mb-4" />
                <div className="mb-2"><span className="font-bold">Tipo:</span> {hongo.tipo === "0" ? "Comestible" : hongo.tipo}</div>
                <div className="mb-2"><span className="font-bold">Comestible:</span> {hongo.comestible}</div>
                <div className="mb-2"><span className="font-bold">Descripción:</span> {hongo.descripcion_es}</div>
                <div className="mb-2"><span className="font-bold">Conservación:</span> {hongo.conservacion}</div>
                <div className="mb-2"><span className="font-bold">Cultivo:</span> {hongo.cultivo}</div>
                <div className="mb-2"><span className="font-bold">Ritualidad:</span> {hongo.ritualidad}</div>
                <div className="mb-2"><span className="font-bold">Significado local:</span> {hongo.significado_local}</div>
                <div className="mb-2"><span className="font-bold">Técnicas de recolección:</span> {hongo.tecnicas_recoleccion}</div>
                <div className="mb-2"><span className="font-bold">Usos:</span> {hongo.usos}</div>
            </div>
        );
}