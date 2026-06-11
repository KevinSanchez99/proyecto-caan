import { useState, useEffect, useRef } from 'react';
import { getAnimalByIdRequest, updateAnimalRequest } from '../../../api/auth'; 

export default function EditAnimal({ animalId, onClose }) {
    const modalRef = useRef(null);
    const [formData, setFormData] = useState(null);

    
    const cerrarModal = () => {
        if (modalRef.current) modalRef.current.close();
        if (onClose) onClose(); 
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

    const convertirABase64 = (archivo) => {
        return new Promise((resolve, reject) => {
            if(!archivo || archivo.size === 0) {
                resolve(null);
                return;
            }
            const fileReader = new FileReader();
            fileReader.readAsDataURL(archivo);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const rawData = Object.fromEntries(data.entries());

        const archivoFoto = data.get('foto');
        const imagenBase64 = await convertirABase64(archivoFoto);

        const payload = {
            nombre: rawData.nombre,
            especie: 'Perro',
            raza: rawData.raza,
            pelaje : rawData.pelaje,
            sexo: rawData.sexo === 'macho' ? 'Macho' : 'Hembra', 
            tamaño: rawData.tamaño,
            estado: 'Disponible', 
            fecha_nacimiento: rawData.fecha_nacimiento,
            salud: {
                vacunado: rawData.vacunado === "1",
                castrado: rawData.castrado === "1",
                desparacitado: rawData.desparacitado === "1",
                condiciones_especiales: rawData.observaciones || 'Ninguna'
            },
            descripcion: rawData.historia,
        };

        if(imagenBase64) {
            payload.imagenes = [imagenBase64];
        }

        try {
            await updateAnimalRequest(animalId, payload);
            alert("¡Ficha actualizada con éxito!");
            cerrarModal();
            window.location.reload(); 
        } catch (error) {
            alert.error('Error al actualizar el animal:', error);
        }
    };

    return (
        <dialog 
            ref={modalRef} 
            onCancel={cerrarModal} // Maneja si el usuario presiona "ESC"
            className="m-auto p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%] bg-surface-container-lowest text-on-surface"
        >
            <h2 className="font-h2 text-h2 text-emerald-800 mb-6">Editar Rescatado</h2>
            
            {!formData ? (
                <p className="text-center py-4">Cargando datos de la ficha...</p>
            ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-10">
                        {/* DATOS GENERALES */}
                        <div className="flex flex-1 flex-col gap-5 p-5 rounded-3xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-xl text-emerald-800 font-semibold mb-3">Datos generales</h3>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Nombre del perro</label>
                                <input type="text" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="nombre" defaultValue={formData.nombre} required />
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Raza</label>
                                <input type="text" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="raza" defaultValue={formData.raza} required />
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Pelaje</label>
                                <input type="text" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="pelaje" defaultValue={formData.pelaje} required />
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Sexo</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="sexo" defaultValue={formData.sexo?.toLowerCase()} required>
                                    <option value="">Selecciona el sexo</option>
                                    <option value="macho">Macho</option>
                                    <option value="hembra">Hembra</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Tamaño</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="tamaño" defaultValue={formData.tamaño} required>
                                    <option value="">Selecciona el tamaño</option>
                                    <option value="Pequeño">Pequeño</option>
                                    <option value="Mediano">Mediano</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Fecha de Nacimiento</label>
                                <input type="date" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="fecha_nacimiento" defaultValue={formatDateForInput(formData.fecha_nacimiento)} required />
                            </div>
                        </div>

                        {/* DATOS MÉDICOS */}
                        <div className="flex flex-1 flex-col gap-5 p-5 rounded-3xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-xl text-emerald-800 font-semibold mb-3">Datos Médicos</h3>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Vacunado</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="vacunado" defaultValue={formData.salud?.vacunado ? "1" : "0"} required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Castrado</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="castrado" defaultValue={formData.salud?.castrado ? "1" : "0"} required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Desparasitado</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="desparacitado" defaultValue={formData.salud?.desparacitado ? "1" : "0"} required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Observaciones</label>
                                <textarea className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none resize-none h-32" name="observaciones" defaultValue={formData.salud?.condiciones_especiales !== 'Ninguna' ? formData.salud?.condiciones_especiales : ''} />
                            </div>
                        </div>

                        {/* MÁS SOBRE MÍ */}
                        <div className="flex flex-1 flex-col gap-5 p-5 rounded-3xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-xl text-emerald-800 font-semibold mb-3">Más Sobre Mí</h3>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Historia</label>
                                <textarea className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none resize-none h-32" name="historia" defaultValue={formData.descripcion} required />
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Cambiar Foto (Opcional)</label>
                                <input type="file" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none" accept="image/png, image/jpeg, image/webp" name="foto" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={cerrarModal} className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">Cancelar</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-medium">Guardar Cambios</button>
                    </div>
                </form>
            )}
        </dialog>
    );
}