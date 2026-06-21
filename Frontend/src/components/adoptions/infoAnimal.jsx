import { useState, useEffect, useRef } from 'react';
import { getAnimalByIdRequest } from '../../../api/auth';
import { MdClose, MdCheck } from "react-icons/md"

export default function InfoAnimal({ animalId, onClose }) {
    const modalRef = useRef(null);
    const imageModalRef = useRef(null);
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

    useEffect(() => {
        const dialog = modalRef.current;
        const restoreScroll = () => {
            try {
                document.body.style.overflow = '';
            } catch (e) {
                console.warn(e);
            }
        };

        if (dialog && animal) {
            try {
                document.body.style.overflow = 'hidden';
            } catch (e) {
                console.warn(e);
            }
        }

        const onClose = () => {
            restoreScroll();
        };

        if (dialog) dialog.addEventListener('close', onClose);

        return () => {
            if (dialog) dialog.removeEventListener('close', onClose);
            restoreScroll();
        };
        
    }, [animal]);

    const cerrarModal = () => {
        if (modalRef.current) modalRef.current.close();
        if (onClose) onClose();
    };

    const abrirImagenGrande = () => {
        if (imageModalRef.current) imageModalRef.current.showModal();
    };

    const cerrarImagenGrande = () => {
        if (imageModalRef.current) imageModalRef.current.close();
    };

    const handleImageModalClick = (e) => {
        if (e.target === imageModalRef.current) {
            cerrarImagenGrande();
        }
    };

    const handleModalClick = (e) => {
        if (e.target === modalRef.current) {
            cerrarModal();
        }
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
        <>
            <dialog
                ref={modalRef}
                onClick={handleModalClick}
                className="m-auto p-4 md:p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[95%] md:w-[90%] max-w-5xl max-h-[95vh] overflow-y-auto bg-surface-container-lowest text-on-surface"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-primary">Más Información</h2>
                            <p className="text-sm text-on-surface-variant mt-1">Ficha completa del animal seleccionado</p>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-center py-8">Cargando información...</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
                            {/* Columna Izquierda */}
                            <div className="flex flex-col gap-4">
                                <div className="rounded-2xl border-2 border-outline-variant bg-surface p-4">
                                    <div className="flex flex-col gap-3">
                                        {/* Imagen Circular Clickeable */}
                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                onClick={abrirImagenGrande}
                                                className="h-40 w-40 md:h-48 md:w-48 rounded-full overflow-hidden bg-surface-variant border-4 border-outline-variant hover:border-primary transition-colors cursor-pointer"
                                            >
                                                <img
                                                    src={imageSrc || 'https://via.placeholder.com/400x400?text=Sin+imagen'}
                                                    alt={animal?.nombre || 'Imagen del animal'}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        </div>

                                        <div className="w-full border-t border-outline-variant my-2" />

                                        {/* Datos del Animal */}
                                        <div className="flex flex-col gap-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs uppercase text-on-surface-variant font-semibold">Nombre</p>
                                                <p className="font-semibold text-on-surface">{animal?.nombre || '-'}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs uppercase text-on-surface-variant font-semibold">Raza</p>
                                                <p className="font-semibold text-on-surface">{animal?.raza || '-'}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs uppercase text-on-surface-variant font-semibold">Pelaje</p>
                                                <p className="font-semibold text-on-surface">{animal?.pelaje || '-'}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs uppercase text-on-surface-variant font-semibold">Sexo</p>
                                                <p className="font-semibold text-on-surface">{animal?.sexo || '-'}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs uppercase text-on-surface-variant font-semibold">Edad</p>
                                                <p className="font-semibold text-on-surface">{animal?.edad || '-'}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs uppercase text-on-surface-variant font-semibold">Tamaño</p>
                                                <p className="font-semibold text-on-surface">{animal?.tamaño || '-'}</p>
                                            </div>
                                        </div>

                                        <div className="w-full border-t border-outline-variant my-2" />
                                    </div>

                                    <div className="rounded-2xl bg-surface-container-highest p-4 mt-2">
                                        <p className="text-xs uppercase text-on-surface-variant font-semibold mb-3">
                                            Observaciones Médicas
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <label className="flex items-center gap-3 cursor-default">
                                                <div className="relative flex items-center justify-center w-4 h-4 border-2 border-outline-variant bg-surface rounded-sm">
                                                    <input
                                                        type="checkbox"
                                                        id="vacunado"
                                                        checked={animal?.salud?.vacunado}
                                                        readOnly
                                                        className="peer absolute opacity-0 w-full h-full pointer-events-none z-10"
                                                    />
                                                    <MdClose className="absolute text-red-500 opacity-100 peer-checked:opacity-0 transition-opacity text-sm pointer-events-none font-bold" />
                                                    <MdCheck className="absolute text-primary opacity-0 peer-checked:opacity-100 transition-opacity text-sm pointer-events-none font-bold" />
                                                </div>
                                                <span className="text-on-surface">Vacunado</span>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-default">
                                                <div className="relative flex items-center justify-center w-4 h-4 border-2 border-outline-variant bg-surface rounded-sm">
                                                    <input
                                                        type="checkbox"
                                                        id="castrado"
                                                        checked={animal?.salud?.castrado}
                                                        readOnly
                                                        className="peer absolute opacity-0 w-full h-full pointer-events-none z-10"
                                                    />
                                                    <MdClose className="absolute text-red-500 opacity-100 peer-checked:opacity-0 transition-opacity text-sm pointer-events-none font-bold" />
                                                    <MdCheck className="absolute text-primary opacity-0 peer-checked:opacity-100 transition-opacity text-sm pointer-events-none font-bold" />
                                                </div>
                                                <span className="text-on-surface">Castrado</span>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-default">
                                                <div className="relative flex items-center justify-center w-4 h-4 border-2 border-outline-variant bg-surface rounded-sm">
                                                    <input
                                                        type="checkbox"
                                                        id="desparacitado"
                                                        checked={animal?.salud?.desparacitado}
                                                        readOnly
                                                        className="peer absolute opacity-0 w-full h-full pointer-events-none z-10"
                                                    />
                                                    <MdClose className="absolute text-red-500 opacity-100 peer-checked:opacity-0 transition-opacity text-sm pointer-events-none font-bold" />
                                                    <MdCheck className="absolute text-primary opacity-0 peer-checked:opacity-100 transition-opacity text-sm pointer-events-none font-bold" />
                                                </div>
                                                <span className="text-on-surface">Desparasitado</span>
                                            </label>

                                            {animal?.salud?.condiciones_especiales && (
                                                <p className="mt-2 pt-2 border-t border-outline-variant text-sm text-on-surface">
                                                    <span className="font-semibold">Condiciones especiales: </span>
                                                    <span className="ml-1">{animal.salud.condiciones_especiales}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha */}
                            <div className="flex flex-col gap-4">
                                <div className="rounded-2xl border border-outline-variant bg-surface p-4">
                                    <h3 className="text-lg font-semibold mb-3 text-primary">Tips antes de adoptar</h3>
                                    <ul className="flex flex-col gap-2">
                                        {adoptionTips.map((tip) => (
                                            <li key={tip} className="rounded-xl bg-surface-container-highest p-3 text-sm leading-snug">
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-outline-variant bg-surface p-4">
                                    <h3 className="text-lg font-semibold mb-3 text-primary">Historia</h3>
                                    <p className="text-sm leading-snug text-on-surface-variant">
                                        {animal?.descripcion || 'No hay historia registrada para este animal.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && (
                        <button
                            type="button"
                            onClick={handleWhatsapp}
                            className="w-full rounded-full bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors mt-2"
                        >
                            Contactar por WhatsApp
                        </button>
                    )}
                </div>
            </dialog>

            {/* Modal para imagen ampliada */}
            <dialog
                ref={imageModalRef}
                onClick={handleImageModalClick}
                className="m-auto p-0 rounded-2xl border-none shadow-xl backdrop:bg-black/75"
                style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            >
                <div className="flex items-center justify-center w-full h-full p-4">
                    <div className="w-175 h-175 rounded-2xl overflow-hidden bg-surface-variant">
                        <img
                            src={imageSrc || 'https://via.placeholder.com/800x800?text=Sin+imagen'}
                            alt={animal?.nombre || 'Imagen del animal'}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </dialog>
        </>
    );
}