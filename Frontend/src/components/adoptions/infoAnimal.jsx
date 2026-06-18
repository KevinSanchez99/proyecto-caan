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

    // Bloquear el scroll del body mientras el modal de información esté abierto
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

    // Imagen Grande dentro de informacion del animal
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
                className="m-auto p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%] max-w-5xl bg-surface-container-lowest text-on-surface"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-semibold text-primary">Más Información</h2>
                            <p className="text-base text-on-surface-variant mt-1">Ficha completa del animal seleccionado</p>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-center py-8">Cargando información...</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                            {/* Columna Izquierda */}
                            <div className="flex flex-col gap-4">
                                {/* Imagen Circular Clickeable */}
                                <div className="rounded-3xl border-2 border-outline-variant bg-surface p-6">
                                    <div className="flex flex-col gap-4">
                                        {/* Imagen Circular Clickeable */}
                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                onClick={abrirImagenGrande}
                                                className="h-64 w-64 rounded-full overflow-hidden bg-surface-variant border-4 border-outline-variant hover:border-primary transition-colors cursor-pointer"
                                            >
                                                <img
                                                    src={imageSrc || 'https://via.placeholder.com/400x400?text=Sin+imagen'}
                                                    alt={animal?.nombre || 'Imagen del animal'}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        </div>

                                        {/* Línea sutil debajo de la imagen */}
                                        <div className="w-full border-t border-outline-variant my-4" />

                                        {/* Datos del Animal - Horizontal */}
                                        <div className="flex flex-col gap-2">
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

                                        {/* Línea sutil después de los datos generales */}
                                        <div className="w-full border-t border-outline-variant my-4" />
                                    </div>

                                    <div className="rounded-3xl bg-surface-container-highest p-6">
                                        <p className="text-sm uppercase text-on-surface-variant font-semibold mb-4">
                                            Observaciones Médicas
                                        </p>
                                        <div className="space-y-3 text-base">

                                            {/* Opción: Vacunado */}
                                            <label className="flex items-center gap-3 cursor-default">
                                                <div className="relative flex items-center justify-center w-5 h-5 border-2 border-outline-variant bg-surface rounded-sm">
                                                    <input
                                                        type="checkbox"
                                                        id="vacunado"
                                                        checked={animal?.salud?.vacunado}
                                                        readOnly
                                                        className="peer absolute opacity-0 w-full h-full pointer-events-none z-10"
                                                    />
                                                    {/* Ícono para FALSE (X Roja) */}
                                                    <MdClose className="absolute text-red-500 opacity-100 peer-checked:opacity-0 transition-opacity text-lg pointer-events-none font-bold" />
                                                    {/* Ícono para TRUE (Check Primario/Verde) */}
                                                    <MdCheck className="absolute text-primary opacity-0 peer-checked:opacity-100 transition-opacity text-lg pointer-events-none font-bold" />
                                                </div>
                                                <span className="text-on-surface">Vacunado</span>
                                            </label>

                                            {/* Opción: Castrado */}
                                            <label className="flex items-center gap-3 cursor-default">
                                                <div className="relative flex items-center justify-center w-5 h-5 border-2 border-outline-variant bg-surface rounded-sm">
                                                    <input
                                                        type="checkbox"
                                                        id="castrado"
                                                        checked={animal?.salud?.castrado}
                                                        readOnly
                                                        className="peer absolute opacity-0 w-full h-full pointer-events-none z-10"
                                                    />
                                                    <MdClose className="absolute text-red-500 opacity-100 peer-checked:opacity-0 transition-opacity text-lg pointer-events-none font-bold" />
                                                    <MdCheck className="absolute text-primary opacity-0 peer-checked:opacity-100 transition-opacity text-lg pointer-events-none font-bold" />
                                                </div>
                                                <span className="text-on-surface">Castrado</span>
                                            </label>

                                            {/* Opción: Desparasitado */}
                                            <label className="flex items-center gap-3 cursor-default">
                                                <div className="relative flex items-center justify-center w-5 h-5 border-2 border-outline-variant bg-surface rounded-sm">
                                                    <input
                                                        type="checkbox"
                                                        id="desparacitado"
                                                        checked={animal?.salud?.desparacitado}
                                                        readOnly
                                                        className="peer absolute opacity-0 w-full h-full pointer-events-none z-10"
                                                    />
                                                    <MdClose className="absolute text-red-500 opacity-100 peer-checked:opacity-0 transition-opacity text-lg pointer-events-none font-bold" />
                                                    <MdCheck className="absolute text-primary opacity-0 peer-checked:opacity-100 transition-opacity text-lg pointer-events-none font-bold" />
                                                </div>
                                                <span className="text-on-surface">Desparasitado</span>
                                            </label>

                                            {/* Condiciones especiales */}
                                            {animal?.salud?.condiciones_especiales && (
                                                <p className="mt-3 pt-3 border-t border-outline-variant text-base text-on-surface">
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
                                {/* Tips antes de adoptar */}
                                <div className="rounded-3xl border border-outline-variant bg-surface p-6">
                                    <h3 className="text-xl font-semibold mb-4 text-primary">Tips antes de adoptar</h3>
                                    <ul className="flex flex-col gap-3">
                                        {adoptionTips.map((tip) => (
                                            <li key={tip} className="rounded-2xl bg-surface-container-highest p-4 text-base leading-7">
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Historia */}
                                <div className="rounded-3xl border border-outline-variant bg-surface p-6">
                                    <h3 className="text-xl font-semibold mb-4 text-primary">Historia</h3>
                                    <p className="text-base leading-7 text-on-surface-variant">
                                        {animal?.descripcion || 'No hay historia registrada para este animal.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botón Contactar */}
                    {!loading && (
                        <button
                            type="button"
                            onClick={handleWhatsapp}
                            className="w-full rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors mt-4"
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