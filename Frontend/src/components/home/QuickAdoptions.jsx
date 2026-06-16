import { useState, useEffect } from 'react';
import { MdArrowForward } from 'react-icons/md';
import { getAnimalsRequest } from '../../../api/auth.js'; 
import AnimalCard from '../adoptions/animalCard'; 

const QuickAdoptions = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAnimals = async () => {
        try {
            // Traemos los animales filtrando por estado 'Disponible'
            const res = await getAnimalsRequest({ estado: 'Disponible' });
            
            if (res.data) {
                const data = Array.isArray(res.data) ? res.data : (res.data.docs || []);
                // ultimos 3 animales
                setAnimals(data.slice(0, 3));
            }
        } catch (error) {
            console.error("Error al obtener los animales en adopción:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    return (
        <section className="py-16 md:py-24 bg-background">
            <div>
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-stone-900 mb-2">Esperan por ti</h2>
                        <p className="text-stone-600">Conoce a algunos de nuestros peludos listos para ir a casa.</p>
                    </div>
                    <a href="/adoptions" className="hidden sm:flex font-semibold text-emerald-900 hover:text-emerald-700 transition-colors items-center gap-1">
                        Ver todos <span className="flex items-center"><MdArrowForward/></span>
                    </a>
                </div>

                {loading ? (
                    <div className="text-center py-10 text-stone-500">Buscando animales disponibles...</div>
                ) : animals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {animals.map((animal, idx) => (
                            <div 
                                key={animal._id || idx} 
                                className={idx === 2 ? 'hidden md:block' : ''}
                            >
                                <AnimalCard 
                                    animal={animal} 
                                    onAnimalChanged={fetchAnimals} 
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-stone-500">
                        Actualmente no hay animales disponibles para adopción. ¡Vuelve pronto!
                    </div>
                )}

                <div className="mt-8 text-center sm:hidden">
                    <a href="/adoptions" className="inline-flex bg-stone-200 text-stone-900 font-semibold px-6 py-3 rounded-full">
                        Ver todos los animales
                    </a>
                </div>
            </div>
        </section>
    );
};

export default QuickAdoptions;