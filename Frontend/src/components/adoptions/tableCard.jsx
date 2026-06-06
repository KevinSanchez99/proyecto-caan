import React, { useState, useEffect } from 'react';
import { getAnimalsRequest } from '../../../api/auth';
import AnimalCard from './animalCard'; 

export default function TableCard() {
    const [animales, setAnimales] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const traerDatos = async () => {
            try {
                const respuesta = await getAnimalsRequest();
                setAnimales(respuesta.data);
                setCargando(false);
            } catch (error) {
                console.error("Hubo un error al traer los animales del CAAN:", error);
                setCargando(false);
            }
        };

        traerDatos();
    }, []);

    // Mostramos un mensaje simple mientras carga
    if (cargando) {
        return <div className="p-md text-on-surface-variant">Buscando animales...</div>;
    }

    return (
    <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">        
        {animales.slice(0, 6).map((animal) => (
            <AnimalCard key={animal._id} animal={animal} />
        ))}        
    </div>
    );
}