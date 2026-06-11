import { useState, useEffect } from 'react';
import { getAnimalsRequest } from '../../../api/auth';
import AnimalCard from './animalCard'; 
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function TableCard({ filters = {} }) {
    const [animales, setAnimales] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1);
    const itemsPorPagina = 6;

    // Traer los animales al cargar el componente
    useEffect(() => {
        const traerDatos = async () => {
            try {
                setCargando(true);
                const respuesta = await getAnimalsRequest(filters);
                setAnimales(respuesta.data);
                setCargando(false);
            } catch (error) {
                console.error("Hubo un error al traer los animales del CAAN:", error);
                setCargando(false);
            }
        };

        traerDatos();
    }, [filters]);

    // para evitar que la pagina quede en un numero que no existe luego de eliminar animales o cosas asi 
    useEffect(() => {
        const totalPaginas = Math.max(1, Math.ceil(animales.length / itemsPorPagina));
        if (pagina > totalPaginas) {
            setPagina(1);
        }
    }, [animales, pagina]);


    if (cargando) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <span className="text-on-surface-variant text-base">Buscando animales...</span>
            </div>
        );
    }

    if (!cargando && animales.length === 0) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <span className="text-on-surface-variant text-base">Ningún perro coincide con el filtro buscado</span>
            </div>
        );
    }

    const totalPaginas = Math.max(1, Math.ceil(animales.length / itemsPorPagina));
    const inicio = (pagina - 1) * itemsPorPagina;
    const animalesAMostrar = animales.slice(inicio, inicio + itemsPorPagina);

    return (
        <div className="w-[90%] mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">        
                {animalesAMostrar.map((animal) => (
                    <AnimalCard key={animal._id} animal={animal} />
                ))}        
            </div>

            {totalPaginas > 1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    <button
                        type="button"
                        disabled={pagina === 1}
                        onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
                        className={`w-10 h-10 rounded-full bg-white border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors ${pagina === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                        <FiChevronLeft aria-hidden className="text-on-surface-variant text-lg" />
                    </button>

                    {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((numero) => (
                        <button
                            key={numero}
                            type="button"
                            onClick={() => setPagina(numero)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-label-sm text-label-sm transition-colors ${pagina === numero ? 'bg-primary text-on-primary' : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'}`}
                        >
                            {numero}
                        </button>
                    ))}

                    <button
                        type="button"
                        disabled={pagina === totalPaginas}
                        onClick={() => setPagina((prev) => Math.min(prev + 1, totalPaginas))}
                        className={`w-10 h-10 rounded-full bg-white border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors ${pagina === totalPaginas ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                        <FiChevronRight aria-hidden className="text-lg text-on-surface-variant" />
                    </button>
                </div>
            )}
        </div>
    );
}