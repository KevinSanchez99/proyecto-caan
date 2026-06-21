import { useState, useEffect, useRef } from 'react';
import { getAnimalByIdRequest, updateAnimalRequest } from '../../../api/auth';

export default function EditAnimal({ animalId, onClose, onAnimalChanged }) {
    const modalRef = useRef(null);
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cerrarModal = () => {
        if (modalRef.current) modalRef.current.close();
        setError(null);
        if (onClose) onClose();
    };

    const handleOutsideClick = (e) => {
        const dialog = modalRef.current;
        if (!dialog) return;

        const dialogDimensions = dialog.getBoundingClientRect();

        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            cerrarModal();
        }
    };

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const res = await getAnimalByIdRequest(animalId);
                setFormData(res.data);
            } catch (error) {
                console.error("Error al traer la ficha del animal", error);
            }
        };
        fetchAnimal();
    }, [animalId]);

    useEffect(() => {
        if (modalRef.current && formData) {
            modalRef.current.showModal();
        }
    }, [formData]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        const form = new FormData(e.target);
        const rawData = Object.fromEntries(form.entries());
        const archivoFoto = form.get('foto');

        const payload = {
            nombre: rawData.nombre,
            especie: 'Perro',
            raza: rawData.raza,
            pelaje: rawData.pelaje,
            sexo: rawData.sexo === 'macho' ? 'Macho' : 'Hembra',
            tamaño: rawData.tamaño,
            fecha_nacimiento: rawData.fecha_nacimiento,
            estado: rawData.estado,
            salud: {
                vacunado: rawData.vacunado === "1",
                castrado: rawData.castrado === "1",
                desparacitado: rawData.desparacitado === "1",
                condiciones_especiales: rawData.observaciones || 'Ninguna'
            },
            descripcion: rawData.historia,
        };

        if (archivoFoto && archivoFoto.size > 0) {
            payload.imagenes = ["https://revotameesta.com/foto.jpg"];
        } else {
            payload.imagenes = formData.imagenes;
        }

        const dataToSend = new FormData();
        dataToSend.append('datos', JSON.stringify(payload));

        if (archivoFoto && archivoFoto.size > 0) {
            dataToSend.append('foto', archivoFoto);
        }

        try {
            await updateAnimalRequest(animalId, dataToSend);
            alert("¡Ficha actualizada con éxito!");
            cerrarModal();
            if (onAnimalChanged) onAnimalChanged(); 
        } catch (error) {
            console.error('Error al actualizar el animal:', error);
            if (error.response?.data?.errors) {
                setError(error.response.data.errors);
            } else {
                setError(error.response?.data?.message || "Hubo un error al guardar el animal.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <dialog
            ref={modalRef}
            onCancel={cerrarModal}
            onClick={handleOutsideClick}
            className="m-auto p-4 md:p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[95%] md:w-[90%] max-w-6xl max-h-[95vh] overflow-y-auto bg-surface-container-lowest text-on-surface"
        >
            <h2 className="font-h2 text-h2 text-emerald-800 mb-4">Editar Rescatado</h2>

            {!formData ? (
                <p className="text-center py-4 text-sm">Cargando datos de la ficha...</p>
            ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* DATOS GENERALES */}
                        <div className="flex flex-1 flex-col gap-3 p-4 rounded-2xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-lg text-emerald-800 font-semibold mb-2">Datos generales</h3>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Nombre del animal</label>
                                <input type="text" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="nombre" defaultValue={formData.nombre} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Raza</label>
                                <input type="text" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="raza" defaultValue={formData.raza} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Pelaje</label>
                                <input type="text" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="pelaje" defaultValue={formData.pelaje} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Sexo</label>
                                <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="sexo" defaultValue={formData.sexo?.toLowerCase()} required>
                                    <option value="">Selecciona el sexo</option>
                                    <option value="macho">Macho</option>
                                    <option value="hembra">Hembra</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Fecha de Nacimiento</label>
                                <input type="date" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="fecha_nacimiento" defaultValue={formatDateForInput(formData.fecha_nacimiento)} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Estado</label>
                                <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="estado" defaultValue={formData.estado} required>
                                    <option value="">Selecciona el estado</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="Adoptado">Adoptado</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Tamaño</label>
                                <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="tamaño" defaultValue={formData.tamaño} required>
                                    <option value="">Selecciona el tamaño</option>
                                    <option value="Pequeño">Pequeño</option>
                                    <option value="Mediano">Mediano</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>
                        </div>

                        {/* DATOS MÉDICOS */}
                        <div className="flex flex-1 flex-col gap-3 p-4 rounded-2xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-lg text-emerald-800 font-semibold mb-2">Datos Médicos</h3>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Vacunado</label>
                                <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="vacunado" defaultValue={formData.salud?.vacunado ? "1" : "0"} required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Castrado</label>
                                <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="castrado" defaultValue={formData.salud?.castrado ? "1" : "0"} required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Desparasitado</label>
                                <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="desparacitado" defaultValue={formData.salud?.desparacitado ? "1" : "0"} required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Observaciones</label>
                                <textarea className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none resize-none h-20" name="observaciones" defaultValue={formData.salud?.condiciones_especiales !== 'Ninguna' ? formData.salud?.condiciones_especiales : ''} />
                            </div>
                        </div>

                        {/* MÁS SOBRE MÍ */}
                        <div className="flex flex-1 flex-col gap-3 p-4 rounded-2xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-lg text-emerald-800 font-semibold mb-2">Más Sobre Mí</h3>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Historia</label>
                                <textarea className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none resize-none h-20" name="historia" defaultValue={formData.descripcion} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-emerald-800 font-semibold">Cambiar Foto (Opcional)</label>
                                <input type="file" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none" accept="image/png, image/jpeg, image/webp" name="foto" />
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 mt-2">
                                    <p className="font-semibold mb-1 text-sm">Por favor corregí lo siguiente:</p>
                                    {Array.isArray(error) ? (
                                        <ul className="list-disc list-inside text-xs">
                                            {error.map((err, index) => (
                                                <li key={index}>
                                                    <span className="capitalize font-medium">{err.path}:</span> {err.message}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-xs">{error}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button type="button" onClick={cerrarModal} className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium">Cancelar</button>
                        <button type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50">
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            )}
        </dialog>
    );
}