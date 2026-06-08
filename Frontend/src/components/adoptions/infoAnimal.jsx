import React, { useState, useEffect, useRef } from 'react';
import { getAnimalByIdRequest } from '../../../api/auth';

export default function InfoAnimal({ animalId, onClose }) {
    const modalRef = useRef(null);
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const res = await getAnimalByIdRequest(animalId);
                setAnimal(res.data);
            } catch (error) {
                console.error('Error al cargar datos del animal:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimal();
    }, [animalId]);

    useEffect(() => {
        if (modalRef.current && animal) {
            modalRef.current.showModal();
        }
    }, [animal]);

    const cerrarModal = () => {
        if (modalRef.current) modalRef.current.close();
        if (onClose) onClose();
    };

    const handleWhatsapp = () => {
        const phone = '5491123456789';
        const text = `Hola, estoy interesado en adoptar a ${animal?.nombre || 'un animal'}. ¿Me pueden dar más información?`;
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    };

    const imageSrc = Array.isArray(animal?.imagenes)
        ? animal.imagenes[0]
        : animal?.imagenes;

    const adoptionTips = [
        'Revisa si tu hogar tiene espacio y tiempo para él.',
        'Considera su edad, tamaño y nivel de energía.',
        'Asegura un plan de cuidado veterinario y vacunas.',
        'Pregúntanos por su compatibilidad con otros animales.',
    ];

    return (
        <dialog
            ref={modalRef}
            onCancel={cerrarModal}
            className="m-auto p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%] max-w-6xl bg-surface-container-lowest text-on-surface"
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold">Más Información</h2>
                        <p className="text-sm text-on-surface-variant mt-1">Ficha completa del animal seleccionado</p>
                    </div>
                    <button
                        type="button"
                        onClick={cerrarModal}
                        className="rounded-full px-4 py-2 text-sm font-medium border border-outline-variant hover:bg-surface-container-high transition-colors"
                    >
                        Cerrar
                    </button>
                </div>

                {loading ? (
                    <p className="text-center py-8">Cargando información...</p>
                ) : (
                    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
                        <div className="rounded-3xl border border-outline-variant bg-surface p-6 shadow-sm">
                            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                                <div className="w-full lg:w-1/2">
                                    <div className="overflow-hidden rounded-3xl bg-surface-variant">
                                        <img
                                            src={imageSrc || 'https://via.placeholder.com/600x450?text=Sin+imagen'}
                                            alt={animal?.nombre || 'Imagen del animal'}
                                            className="h-72 w-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl bg-surface-container-highest p-4">
                                            <p className="text-xs uppercase text-on-surface-variant">Nombre</p>
                                            <p className="mt-1 font-semibold text-on-surface">{animal?.nombre || '-'}</p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-highest p-4">
                                            <p className="text-xs uppercase text-on-surface-variant">Especie</p>
                                            <p className="mt-1 font-semibold text-on-surface">{animal?.especie || 'Perro'}</p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-highest p-4">
                                            <p className="text-xs uppercase text-on-surface-variant">Raza</p>
                                            <p className="mt-1 font-semibold text-on-surface">{animal?.raza || '-'}</p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-highest p-4">
                                            <p className="text-xs uppercase text-on-surface-variant">Sexo</p>
                                            <p className="mt-1 font-semibold text-on-surface">{animal?.sexo || '-'}</p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-highest p-4">
                                            <p className="text-xs uppercase text-on-surface-variant">Edad</p>
                                            <p className="mt-1 font-semibold text-on-surface">{animal?.edad?.valor ?? '-'} {animal?.edad?.unidad || ''}</p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-highest p-4">
                                            <p className="text-xs uppercase text-on-surface-variant">Tamaño</p>
                                            <p className="mt-1 font-semibold text-on-surface">{animal?.tamaño || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-outline-variant bg-surface p-6">
                                    <h3 className="text-lg font-semibold">Tips antes de adoptar</h3>
                                    <ul className="flex flex-col gap-3">
                                        {adoptionTips.map((tip) => (
                                            <li key={tip} className="rounded-2xl bg-surface-container-highest p-4 text-sm leading-6">
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-outline-variant bg-surface p-6 shadow-sm mt-6">
                                <h3 className="text-lg font-semibold mb-4">Historia</h3>
                                <p className="text-sm leading-7 text-on-surface-variant">
                                    {animal?.descripcion || 'No hay historia registrada para este animal.'}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-outline-variant bg-surface p-6 shadow-sm">
                            <div className="grid gap-4">
                                <div className="rounded-3xl bg-surface-container-highest p-5">
                                    <p className="text-xs uppercase text-on-surface-variant">Estado</p>
                                    <p className="mt-2 text-lg font-semibold text-on-surface">{animal?.estado || 'Disponible'}</p>
                                </div>
                                <div className="rounded-3xl bg-surface-container-highest p-5">
                                    <p className="text-xs uppercase text-on-surface-variant">Salud</p>
                                    <div className="mt-3 space-y-2 text-sm leading-6">
                                        <p>Vacunado: <span className="font-semibold">{animal?.salud?.vacunado ? 'Sí' : 'No'}</span></p>
                                        <p>Castrado: <span className="font-semibold">{animal?.salud?.castrado ? 'Sí' : 'No'}</span></p>
                                        <p>Desparasitado: <span className="font-semibold">{animal?.salud?.desparacitado ? 'Sí' : 'No'}</span></p>
                                        <p>Observaciones: <span className="font-semibold">{animal?.salud?.condiciones_especiales || 'Ninguna'}</span></p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleWhatsapp}
                                    className="mt-2 w-full rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                                >
                                    Contactar por WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    );
}
