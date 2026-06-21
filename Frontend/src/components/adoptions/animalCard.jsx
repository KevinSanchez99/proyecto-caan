import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { deleteAnimalRequest } from '../../../api/auth';
import EditAnimal from './editAnimal';
import InfoAnimal from './infoAnimal';


export default function AnimalCard({ animal, onAnimalChanged }) {
    const { isAuthenticated } = useAuth();
    const [mostrarEditor, setMostrarEditor] = useState(false);
    const [mostrarInfo, setMostrarInfo] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Usted está por borrar un animal. ¿Desea continuar?');
        if (!confirmDelete) return;

        try {
            await deleteAnimalRequest(animal._id);
            alert('Animal borrado correctamente.');
            if (onAnimalChanged) onAnimalChanged();
        } catch (error) {
            console.error('Error al borrar el animal:', error);
            alert('No se pudo borrar el animal. Revisa la consola.');
        }
    };
    return (
        
        <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] group border border-outline-variant/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full flex flex-col">
            
            <div className="h-56 overflow-hidden relative shrink-0">
                <img 
                    alt={animal.nombre}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    src={animal.imagenes && animal.imagenes.length > 0 ? animal.imagenes[0] : ''}
                    onClick={() => setMostrarInfo(true)}
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur text-on-surface font-label-sm text-label-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {animal.raza}
                </div>
            </div>

            <div className="p-8 grow flex flex-col items-start">
                <div className="text-outline font-label-sm text-label-sm mb-2 text-xs">
                    {animal.edad}
                </div>

                <h3 className="font-h3 text-h3 text-on-surface mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {animal.nombre}
                </h3>

                <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3 break-all w-full">
                    {animal.descripcion}
                </p>

                <div className="mt-6 w-full flex flex-col gap-3">
                    <button
                        className="w-full py-3 rounded-md bg-emerald-200 border border-emerald-300 text-emerald-900 font-label-sm text-label-sm shadow-sm transition-transform duration-200 hover:scale-[1.03]"
                        onClick={() => setMostrarInfo(true)}
                    >
                        Más información
                    </button>

                    {isAuthenticated && (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                className="w-full py-3 rounded-md bg-blue-300 border border-blue-400 text-blue-900 font-label-sm text-label-sm shadow-sm transition-transform duration-200 hover:scale-[1.03]"
                                onClick={() => setMostrarEditor(true)}
                            >
                                Modificar
                            </button>
                            <button
                                className="w-full py-3 rounded-md bg-red-300 border border-red-400 text-red-900 font-label-sm text-label-sm shadow-sm transition-transform duration-200 hover:scale-[1.03]"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {mostrarEditor && (
                <EditAnimal 
                    animalId={animal._id} 
                    onClose={() => setMostrarEditor(false)} 
                    onAnimalChanged={onAnimalChanged}
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