import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { deleteAnimalRequest } from '../../../api/auth';
import EditAnimal from './editAnimal';
import InfoAnimal from './infoAnimal';


export default function AnimalCard({ animal}) {
        const { isAuthenticated } = useAuth();
        const [mostrarEditor, setMostrarEditor] = useState(false);
        const [mostrarInfo, setMostrarInfo] = useState(false);

        const handleDelete = async () => {
            const confirmDelete = window.confirm('Usted está por borrar una adopción. ¿Desea continuar?');
            if (!confirmDelete) return;

            try {
                await deleteAnimalRequest(animal._id);
                alert('Adopción borrada correctamente.');
                window.location.reload();
            } catch (error) {
                console.error('Error al borrar la adopción:', error);
                alert('No se pudo borrar la adopción. Revisa la consola.');
            }
        };
    return (
        
        <article className=" w-full bg-stone-50 flex flex-col p-md box-border rounded-2xl overflow-hidden">
            
            <div className="relative aspect-[4/3] shrink-0 overflow-hidden w-full rounded-lg">
                <img 
                    alt={animal.nombre}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    src={animal.imagenes} 
                />
            </div>

            <div className="p-md flex flex-col flex-grow">
                
                <div className="flex flex-row justify-between items-start mb-sm shrink-0">
                    <span className="font-h3 text-h3 text-on-surface">{animal.nombre}</span>

                    <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-sm text-[12px]">
                    {animal.raza}
                    </span>

                </div>
                
                <p className="font-body-md text-body-md text-on-surface-variant mb-2 shrink-0">
                    {animal.edad.valor} {animal.edad.unidad}
                </p>
                
                <p className="font-body-sm text-sm text-on-surface-variant line-clamp-3 break-all w-full mb-4 ">
                    {animal.descripcion}
                </p>
                
                
                {/* Contenedor padre que organiza los botones */}
                <div className="flex flex-col gap-2 mt-auto w-full px-4">
                    <button
                        className="w-full py-3 border border-primary text-primary font-label-sm text-label-sm rounded-full hover:bg-primary hover:text-on-primary transition-colors shrink-0"
                        onClick={() => setMostrarInfo(true)}
                    >
                        Más Información
                    </button>

                    {isAuthenticated && (
                        <button className="w-full py-3 border border-blue-900 text-blue-900 font-label-sm text-label-sm rounded-full hover:bg-blue-900 hover:text-white transition-colors shrink-0"
                           onClick={() => setMostrarEditor(true)} 
                        >
                            Modificar 
                        </button>
                    )}

                    {isAuthenticated && (
                        <button
                            className="w-full py-3 border border-red-600 text-red-600 font-label-sm text-label-sm rounded-full hover:bg-red-600 hover:text-white transition-colors shrink-0"
                            onClick={handleDelete}
                        >
                            Borrar
                        </button>
                    )}
                </div>
            </div>
            {mostrarEditor && (
                <EditAnimal 
                    animalId={animal._id} 
                    onClose={() => setMostrarEditor(false)} 
                />
            )}
            {mostrarInfo && (
                <InfoAnimal
                    animalId={animal._id}
                    onClose={() => setMostrarInfo(false)}
                />
            )}

        </article>
    );
}